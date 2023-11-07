import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GetUser(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'GET') return res.status(404).send({ok:false})

        const {id,action} = req.query

        if (action === 'userData'){
            const user = await prisma.user.findUnique({
                where :{
                    id: id as string
                },
                include:{
                    profile: true,
                    social: true,
                    avatar: true
                }
            })
    
            return res.status(200).send({ok: true, data:user})
        }else if (action === 'userProfile'){
            const user = await prisma.user.findUnique({
                where: {
                    id: id as string
                },
                select:{
                    name: true,
                    surname: true,
                    avatar: true,
                    profile: true,
                    social: true,
                    posts: {
                        select: {
                            id: true,
                            title: true,
                            category: true,
                            image: true,
                            content: true,
                            slug: true,
                            createdAt:true
                        },
                        orderBy:{
                            createdAt:'desc'
                        }
                    }
                },
            })

            return res.status(200).send({ok: true, data:user})
        }
    }catch(err){
        return res.status(400).send({ok: false})
    }
}