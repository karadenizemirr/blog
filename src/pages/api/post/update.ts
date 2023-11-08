import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { now } from "next-auth/client/_utils";

export default async function UpdatePostApi(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'POST') return res.status(404).send({ok:false})

        const {id} = req.query
        const data = req.body

        const post = await prisma.post.findUnique({
            where: {
                id: id as string
            },
            include : {
                keywords: true,
                image: true
            }
        })

        const update = await prisma.post.update({
            where:{
                id: id as string
            },
            data: {
                title: data.title,
                content: data.content,
                description:data.description,
                updatedAt: new Date(now()),
                keywords: {
                    upsert: {
                        where: {
                            id: post?.keywords?.id
                        },
                        update: {
                            title: data.keywords 
                        },
                        create: {
                            title: data.keywords
                        }
                    }
                },
                category:{
                    update:{
                        id: data.category?.id
                    }
                },
                image:{
                    upsert:{
                        where: {
                            id:post?.image?.id
                        },
                        update: {
                            url:data?.image
                        },
                        create: {
                            url: data?.image
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