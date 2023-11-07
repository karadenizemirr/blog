import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";

export default async function UpdateUser(req:NextApiRequest, res:NextApiResponse){
    try{
        if (req.method !== 'POST') return res.status(404).send({ok:false})

        const {id} = req.query
        const data = req.body

        const user:any = await prisma.user.findUnique({
            where: {
                id: id as string
            },
            include:{
                profile: true,
                avatar:true,
                social: true
            }
        })

        const passwordControl = await bcrypt.compare(data.password, user?.password)

        if(!passwordControl){
            data.password = await bcrypt.hash(data.password, 5)
        }

        await prisma.user.update({
            where: {
                id: id as string
            },
            data: {
                name: data.name,
                surname: data.surname,
                phone_number: data.phone_number,
                email:data.mail_address,
                // password: data.password,
                social:{
                    upsert:{
                        where: {
                            id: user?.social?.id
                        },
                        create: {
                            facebook: data.facebook,
                            instagram:data.instagram,
                            twitter:data.twitter,
                            linkedin: data.linkedin,
                            website:data.website
                        },
                        update:{
                            facebook: data.facebook,
                            instagram:data.instagram,
                            twitter:data.twitter,
                            linkedin: data.linkedin,
                            website:data.website
                        }
                    }
                },
                profile:{
                    upsert:{
                        where: {
                            id: user?.profile?.id
                        },
                        update: {
                            username: data.username,
                            born_date: data.born_date,
                            country: data.country,
                            city: data.city,
                            about: data.about
                        },
                        create: {
                            username: data.username,
                            born_date: data.born_date,
                            country: data.country,
                            city: data.city,
                            about: data.about
                        }
                    }
                },
                avatar :{
                    upsert:{
                        where:{
                            id: user?.avatar?.id
                        },
                        update:{
                            url: data.avatar
                        },
                        create:{
                            url: data.avatar
                        }
                    }
                }
            }
        })

        return res.status(200).send({ok:true})
    }catch(err){
        console.log(err)
        return res.status(400).send({ok: false})
    }
}