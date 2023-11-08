import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function LikeApi(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'GET') return res.status(404).send({ok:false})
        const {postId} = req.query

        const post = await prisma.post.findUnique({where:{id:postId as string}, include:{like: true}})

        await prisma.post.update({
            where: {
                id: postId as string
            },
            data: {
                like:{
                    upsert:{
                        where:{
                            id: post?.like?.id as string
                        },
                        update:{
                            count: Number(post?.like?.count) + 1 as number ||1
                        },
                        create:{
                            count: 1 as number
                        }
                    }
                }
            }
        })

        return res.status(200).send({ok:true})
    }catch(err){
        console.log(err)
        return res.status(400).send({ok:false})
    }
}