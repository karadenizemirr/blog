import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export default async function RegisterApi(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'POST') return res.status(404).send({ok: false})
        const {name, surname, phone_number, mail_address, password} = req.body
        const new_password = await bcrypt.hash(password, 5)

        const user = await prisma.user.create({
            data: {
                name: name,
                surname: surname,
                phone_number: phone_number,
                email: mail_address,
                password: new_password
            }
        })

        if (user){
            res.status(200).send({ok: true})
        }

        res.status(400).send({ok: false})


    }catch(err){
        return res.status(400).send({ok: false})
    }
}