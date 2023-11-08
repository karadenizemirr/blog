import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GetPostApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') return res.status(404).send({ ok: false })

        const { id, action, slug } = req.query

        if (action === 'all') {
            const posts = await prisma.post.findMany({
                include: {
                    user: true,
                    image: true,
                    category: true,
                    view: true,
                    like: true
                }
            })
            return res.status(200).send({ ok: true, data: posts })
            
        } else if (action === 'userPost') {
            const post = await prisma.post.findUnique({
                where: {
                    id: id as string
                },
                select: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            surname: true,
                            email: true,
                            profile: {
                                select: {
                                    about: true
                                }
                            },
                            social: true,
                            avatar: true
                        }
                    },
                    image: true,
                    category: true,
                    id: true,
                    title: true,
                    description: true,
                    content: true,
                    keywords: true,
                    like:{
                        select:{
                            count: true
                        }
                    },
                    view:{
                        select: {
                            count: true
                        }
                    }
                }
            })
            return res.status(200).send({ ok: true, data: post })
        }else if (action === 'verify'){
            await prisma.post.update({
                where: {
                    id: id as string
                },
                data:{
                    isActive: true
                }
            })

            return res.status(200).send({ok:true})
        }else if (action === 'unverify'){
            await prisma.post.update({
                where: {
                    id: id as string
                },
                data:{
                    isActive: false
                }
            })

            return res.status(200).send({ok:true})
        }else if (action === 'delete'){
            await prisma.post.delete({
                where: {
                    id: id as string
                }
            })
            
            return res.status(200).send({ok:true})
        }else if (action === 'homePosts'){
            const posts = await prisma.post.findMany({
                select:{
                    id: true,
                    title: true,
                    content: true,
                    keywords: true,
                    image: true,
                    category: true,
                    slug:true,
                    createdAt: true,
                    user: {
                        select:{
                            id: true,
                            name:true,
                            surname: true,
                            avatar: true,
                        }
                    },
                    like:{
                        select:{
                            count: true
                        }
                    },
                    view:{
                        select: {
                            count: true
                        }
                    }
                },
                orderBy: {
                    createdAt: ('desc')
                }
            })

            return res.status(200).json({ok:true, data:posts})
        }else if (action === 'get' && slug){
            const post = await prisma.post.findMany({
                where: {
                    slug: slug as string,
                    isActive: true
                },
                select: {
                    title: true,
                    content: true,
                    keywords:true,
                    image: true,
                    category: true,
                    slug: true,
                    id: true,
                    user: {
                        select:{
                            name: true,
                            surname: true,
                            profile: true,
                            social: true,
                            avatar: true,
                            id: true
                        }
                    },
                    comment:{
                        select:{
                            id:true,
                            message:true,
                            user: {
                                select:{
                                    name: true,
                                    id: true,
                                    surname: true,
                                    avatar:{
                                        select:{
                                            url:true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    view:{
                        select:{
                            count: true
                        }
                    },
                    like:{
                        select:{
                            count: true
                        }
                    }
                }
            })

            return res.status(200).send({ok: true, data:post})
        }
        else{
            return res.status(400).send({ok:false})
        }
    } catch (err) {
        return res.status(400).send({ ok: false })
    }
}