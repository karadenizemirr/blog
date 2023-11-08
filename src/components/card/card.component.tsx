import { dateParser } from "@/lib/parser";
import { faArrowRight, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export default function CardComponent({ item }: { item: any }) {
    return (
        <div className="col-span-12 lg:col-span-3">
            <div className="card p-5 shadow-sm rounded-xl">
                <div className="topbar flex flex-1 justify-between items-center p-3">
                    <div className="avatar">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item?.user?.avatar?.url ||'https://res.cloudinary.com/dssep9ze1/image/upload/f_auto,q_auto/v1/brkshn/zobijxchgxvxpafuijoj'} alt="" className="rounded-full border border-black object-cover" style={{width:'30px', height:'30px'}} />
                    </div>
                    <div className="author">
                        <Link href={`/user/${item?.user?.id}`} className="text-sm italic text-gray-500 hover:text-primary duration-200">
                            {item?.user?.name} {item?.user?.surname}
                        </Link>
                    </div>
                </div>
                <div className="img p-2 rounded-xl">
                    <Link href={`/posts/${item?.slug}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item?.image?.url || 'https://res.cloudinary.com/dssep9ze1/image/upload/f_auto,q_auto/v1/brkshn/zobijxchgxvxpafuijoj'} alt="" className="rounded-xl object-cover w-full max-h-48 hover:opacity-90 duration-200" style={{width:'100%', height: '200px'}} />
                    </Link>
                </div>
                <div className="footer px-3">
                    <div className="detail">
                        <ul className="text-sm flex flex-1 justify-between text-gray-500" >
                            <li>
                                {
                                    dateParser(item?.createdAt)
                                }
                            </li>
                            <li>
                                <span>
                                    <FontAwesomeIcon icon={faEye} className="mr-2"/>{item?.view?.count||0}
                                </span>
                            </li>
                            <li>
                                <Link href={`/category/${item?.category?.slug}`} className="hover:text-primary duration-200">
                                    {item?.category?.title}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="title mt-5">
                        <Link href={`/posts/${item?.slug}`} className="font-medium line-clamp-1 uppercase hover:text-primary duration-200 " >
                            {item?.title}
                        </Link>
                        <div className="conetnt line-clamp-3 mt-2 text-sm" dangerouslySetInnerHTML={{ __html: item?.content }} style={{ color: 'black' }}></div>
                    </div>
                    <div className="button mt-5 ">
                        <Link href={`/posts/${item?.slug}`} className="font-medium hover:text-gray-400 duration-200">
                            Daha Fazlasını Oku <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}