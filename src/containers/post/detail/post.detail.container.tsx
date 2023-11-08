"use client"
import CommentComponent from "@/components/comment/comment.component";
import ShareComponent from "@/components/share/share.component";
import { calculateReadingTime } from "@/lib/calculateReadingTime";
import { keywordsParser } from "@/lib/parser";
import { faFacebookF, faInstagram, faLinkedinIn, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEarth, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import Swal from "sweetalert2";


export default function PostDetailContainer({ post }: { post: any }) {
    return (
        <div className="container mx-auto w-full mt-10 min-h-[60vh] flex flex-1 justify-center" >
            <div className="content px-4 lg:px-0 lg:w-1/2">
                <div className="category text-center mb-2 text-sm">
                    <span className="text-primary" >
                        {post?.category?.title}
                    </span>
                </div>
                <div className="title text-center">
                    <h1 className="text-3xl font-medium mb-2" >
                        {post?.title}
                    </h1>
                    <span className="text-sm text-gray-400" >
                        Toplam Görüntülenme: {post?.view?.count||0}
                    </span>
                </div>
                <div className="author border-t border-b py-5 mt-5 flex flex-1 items-center gap-5">
                    <div className="img">
                        <img src={post?.user?.avatar?.url} alt="" className="rounded-full border-2" style={{ maxWidth: '80px', maxHeight: '80px' }} />
                    </div>
                    <div className="desc">
                        <ul>
                            <li className="font-medium text-lg">
                                Emirhan Karadeniz <Link href={`/user/${post?.user?.id}`} className="text-primary hover:text-gray-400 duration-200 text-sm ml-3" >Takip Et</Link>
                            </li>
                            <li className="text-sm mt-2 line-clamp-3" >
                                {
                                    post?.user?.profile?.about
                                }
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="share border-b p-2 flex justify-end">
                    <div className="readTime text-sm text-gray-500">
                        <span>
                            {
                                calculateReadingTime(post?.content)
                            }
                        </span>
                    </div>
                    <ul className="flex flex-1 gap-4 justify-end" >
                        <li className="border-r border-black px-3">
                            <span className="text-sm mr-2" >
                                {post?.like?.count||0} Beğeni
                            </span>
                            <button className="focus:text-primary" onClick={async () => {
                                const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/post/like?postId=' + post?.id, {method:'GET'})

                                const {ok} = await res.json()
                                if (ok){
                                    Swal.fire({
                                        title:'Beğeni',
                                        text:'Yazı beğenildi.',
                                        icon: 'success'
                                    })
                                }else{
                                    Swal.fire({
                                        title:'Beğeni',
                                        text: 'Yazı beğenilirken bir sorun oluştu.',
                                        icon: 'error'
                                    })
                                }
                            }}>
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                        </li>
                        <li>
                            <Link href={post?.user?.social?.facebook || ""} >
                                <FontAwesomeIcon icon={faFacebookF} />
                            </Link>
                        </li>
                        <li>
                            <Link href={post?.user?.social?.twitter || ""}>
                                <FontAwesomeIcon icon={faXTwitter} />
                            </Link>
                        </li>
                        <li>
                            <Link href={post?.user?.social?.instagram || ""}>
                                <FontAwesomeIcon icon={faInstagram} />
                            </Link>
                        </li>
                        <li>
                            <Link href={post?.user?.social?.linkedin || ""}>
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </Link>
                        </li>
                        <li>
                            <Link href={post?.user?.social?.website || ""}>
                                <FontAwesomeIcon icon={faEarth} />
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="content mt-5 leading-loose" dangerouslySetInnerHTML={{ __html: post?.content }}></div>
                <div className="keywords mb-10 flex flex-1 gap-5 mt-5">
                    {
                        keywordsParser(post?.keywords?.title)?.map((item:any, index:number) => (
                            <Link href={`/search/${item}`} className="bg-gray-200 p-2 rounded-full text-sm" key={index} >  
                                {item}
                            </Link>
                        ))
                    }
                </div>
                <div className="shareSocial">
                    <ShareComponent url="#" />
                </div>
                <div className="comment">
                    <CommentComponent postId={post?.id} comments={post?.comment} />
                </div>
            </div>
        </div>
    )
}