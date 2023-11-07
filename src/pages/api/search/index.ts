import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function SearchApi(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'GET') return res.status(404).send({ok:false})

        const {query} = req.query

        const search = await prisma.post.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: query as string,
                            mode:'insensitive'
                        }
                    },
                    {
                        keywords: {
                            title:{
                                contains: query as string,
                                mode: 'insensitive'
                            }
                        }
                    }
                ]
            },
            select:{
                id:true,
                title: true,
                content: true,
                image:true,
                createdAt: true,
                category:{
                    select:{
                        title: true,
                        slug: true
                    }
                },
                slug: true,
                user: {
                    select:{
                        name:true,
                        surname: true,
                        id: true,
                        avatar: true
                    }
                }
            }
        })

        return res.status(200).send({ok:true, data:search})
    }catch(err){
        return []
    }
}