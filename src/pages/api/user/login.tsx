import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import prisma from "@/lib/prisma";


export default async function LoginApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') return res.status(404).send({ ok: false })

        const { password, mail_address } = req.body

        const user = await prisma.user.findUnique({
            where: {
                email: mail_address as string
            },
            include:{
                avatar: true
            }
        })

        if (user) {
            const password_control = await bcrypt.compare(password, user.password)

            if (password_control) return res.status(200).send({ ok: true, user: user })
            else return res.status(404).send({ ok: false })
        }

    } catch (err) {
        return res.status(400).send({ ok: false })
    }
}