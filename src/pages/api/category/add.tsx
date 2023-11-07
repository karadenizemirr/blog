import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addCategory(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'POST') return res.status(404).send({ok:false})

        const {title} = req.body

        await prisma.category.create({
            data: {
                title: title
            }
        })

        return res.status(200).send({ok: true})
    }catch(err){
        return res.status(400).send({ok:false})
    }
}