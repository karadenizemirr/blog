import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify"; 

export default async function addPostApi(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'POST') return res.status(404).send({ok: false})

        const data = req.body
        
        const post = await prisma.post.create({
            data: {
                title: data.title,
                keywords: {
                    create:{
                        title: data.keywords
                    }
                },
                content: data.content,
                slug: slugify(data.title, {replacement:'-', lower: true}),
                user: {
                    connect:{
                        id: data.userId
                    }
                },
                image:{
                    create:{
                        url: data.image
                    }
                },
                category: {
                    connect:{
                        id: data.category
                    }
                }
            }
        })

        return res.status(200).send({ok: true})
    }catch(err){
        console.log(err)
        return res.status(400).send({ok:false})
    }
}