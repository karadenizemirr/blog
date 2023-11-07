import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getCategoryApi(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'GET') return res.status(404).send({ok:false})

        const {action, id, slug} = req.query

        if (action === 'delete'){
            await prisma.category.delete({
                where :{
                    id: id as string
                }
            })

            return res.status(200).send({ok:true})
        }else if (action === 'post'){
            const post = await prisma.category.findMany({
                where: {
                    slug: slug as string
                },
                select:{
                    post:{
                        select:{
                            id: true,
                            title: true,
                            content: true,
                            slug: true,
                            user: {
                                select:{
                                    avatar: true,
                                    id: true,
                                    name: true,
                                    surname: true
                                }
                            },
                            category: true,
                            image: true,
                            createdAt: true
                        }
                    },
                    title: true
                }
            })

            return res.status(200).send({ok:true, data:post})
        }

        return res.status(400).send({ok:false})
    }catch(err){
        return res.status(400).send({ok: false})
    }
}