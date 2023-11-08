"use client"
import React, { useEffect } from "react";
import CardComponent from "./card/card.component";
import { faArrowRight, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from "next/link";
import { randomInt } from "crypto";

export default function HomeContainer({ posts, categories }: { posts: any, categories?: any }) {
    const [limit, setLimit] = React.useState<number>(8)
    const [button, setButton] = React.useState<boolean>(false)
    const slice = posts.slice(0, limit)

    const [randomData, setRandomData] = React.useState<any>()
    
    
    useEffect(() => {
        if (posts) {
          const shuffledPosts = [...posts];
          for (let i = shuffledPosts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledPosts[i], shuffledPosts[j]] = [shuffledPosts[j], shuffledPosts[i]];
          }
          setRandomData(shuffledPosts.slice(0, 4));
        }
      }, [posts]);
      
    const handleClickOtherClick = () => {
        setLimit(limit + 4)

        if (limit >= posts.length) {
            setButton(true)
        }
    }

    return (
        <div>
            <div className="container mx-auto">
                <div className="title mt-10 mb-10 text-center text-3xl">
                    <h1 className='text-primary' >
                        <span className='border-b-2 border-black' >Yazmak</span> <span className='text-black font-bold italic border-b-2 border-primary' >Özgürlüktür</span>
                    </h1>
                </div>
                <div className='grid grid-cols-12 w-full min-h-[60vh] gap-5 items-start'>
                    {
                        slice.map((item: any, index: number) => (
                            <CardComponent key={index} item={item} />
                        ))
                    }
                </div>
                <div className="other text-center mt-10">
                    <button className='btn-primary bg-primary disabled:bg-gray-400' onClick={handleClickOtherClick} disabled={button} >
                        {
                            button ? (
                                <>
                                    Gösterilecek Veri Yok <FontAwesomeIcon icon={faClose} />
                                </>
                            ) : (
                                <>
                                    Daha Fazla Göster <FontAwesomeIcon icon={faArrowRight} />
                                </>)
                        }
                    </button>
                </div>
            </div>

            <div className="categoryHero w-full bg-black mt-20 mb-20 min-h-[20vh] flex flex-col items-center justify-center">
                <div>
                    <div className="title text-center p-5">
                        <h1 className="text-light text-2xl" >
                            Birbirinden Farklı Kategorilerde Gezinin
                        </h1>
                    </div>
                    <div className="categories text-light container mx-auto flex items-center justify-center flex-1">
                        <ul className="grid grid-cols-12 lg:gap-10 gap-5">
                            {
                                categories?.map((category: any, index: number) => (
                                    <li className="border border-light bg-darkLight p-2 px-5 rounded-full text-sm col-span-6 lg:col-span-4 mb-10 text-center hover:bg-gray-400 duration-200 cursor-pointer" key={index}>
                                        <Link href={`/category/${category.slug}`}>
                                            {
                                                category.title
                                            }
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="title text-center mb-5">
                <h1 className="text-3xl" >
                    Sana Özel
                </h1>
            </div>
            <div className='grid grid-cols-12 w-full min-h-[60vh] gap-5 items-start container mx-auto'>
                {
                    randomData?.map((item: any, index: number) => (
                        <CardComponent key={index} item={item} />
                    ))
                }
            </div>
        </div>
    )
}