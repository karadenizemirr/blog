import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function CommentGetApi(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'GET') return res.status(404).send({ok:false})
        
        const {action, id} = req.query

        if (action === 'all'){
            const comments = await prisma.comment.findMany({
                select:{
                    user: {
                        select:{
                            name: true,
                            surname:true
                        }
                    },
                    message: true,
                    createdAt: true,
                    id:true
                }
            })

            return res.status(200).send({ok:true, data:comments})
        }else if (action === 'delete'){
            await prisma.comment.delete({
                where:{
                    id: id as string
                }
            })

            return res.status(200).send({ok: true})
        }
        return res.status(404).send({ok:false})

    }catch(err){
        console.log(err)
        return res.status(400).send({ok: false})
    }
}