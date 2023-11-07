import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function DeletePostApi(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'DELETE') return res.status(404).send({ok:false})
        const {id} = req.query

        await prisma.post.delete({
            where :{
                id: id as string
            }
        })

        return res.status(200).send({ok:false})
    }catch(err){
        return []
    }
}