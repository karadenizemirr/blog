import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GetUserPostApi(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'GET') return res.status(404).send({ok:false})
        const {id} = req.query
        
        const posts = await prisma.post.findMany(
            {
                where: {
                    user: {
                        id: id as string
                    }
                },
                select:{
                    category: true,
                    image: true,
                    title: true,
                    content: true,
                    slug: true,
                    keywords: true,
                    description: true,
                    id: true,
                    isActive:true
                }
            }
        )


        return res.status(200).send({ok:true, data:posts})
    }catch(err){
        return res.status(400).send({ok:false})
    }
}