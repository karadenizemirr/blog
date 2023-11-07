import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function CreaetComment(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'POST') return res.status(404).send({ok:false});

        const {id} = req.query
        const {postId,comment} = req.body

        await prisma.comment.create({
            data: {
                message: comment,
                user: {
                    connect: {
                        id: id as string
                    }
                },
                post:{
                    connect:{
                        id: postId as string
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