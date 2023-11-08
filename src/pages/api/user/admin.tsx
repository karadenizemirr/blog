import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function AdminUserOperationsApi(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'GET') return res.status(404).send({ok:false})
        const {action,id, role} = req.query
        
        if (action === 'role'){
            await prisma.user.update({
                where: {
                    id: id as string
                },
                data :{
                    role: role as string
                }
            })

            return res.status(200).send({ok:true})
        }else if (action === 'delete'){
            await prisma.user.delete({
                where:{
                    id: id as string
                }
            })

            return res.status(200).send({ok:true})
        }

        return res.status(400).send({ok:false})

    }catch(err){
        return res.status(400).send({ok:false})
    }
}