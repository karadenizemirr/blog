import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function ViewApi(req:NextApiRequest, res:NextApiResponse){
    try{

        if (req.method !== 'GET') return res.status(400).send({ok: false})

        const {postId} = req.query

        const post:any = await prisma.post.findUnique({
            where: {
                id:postId as string
            },
            include :{
                view: true
            }
        })

        await prisma.post.update({
            where:{
                id : postId as string
            },
            data: {
                view:{
                    upsert:{
                        where:{
                            id: post?.view?.id as string
                        },
                        update:{
                            count: Number(post?.view?.count) + 1 as number ||1
                        },
                        create:{
                            count: 1
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
