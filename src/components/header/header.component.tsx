"use client"
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HeaderComponent({ data }: { data: any }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    return (
        <div className="text-light">
            <Slider {...settings}>
                {data.map((item: any, index: number) => (
                    <div className="w-full h-[60vh] bg-darkLight relative" key={index}>
                        <div className="content h-full">
                            <div className="img">
                                <Image src={item?.image?.url} layout="fill" objectFit="cover" alt="" className="opacity-30 z-0" />
                            </div>

                            <div className="text flex flex-col items-center justify-center h-full text-center">
                                <div className="title w-1/3">
                                    <h1 className="text-4xl font-bold tracking-wider" >
                                        {item?.title}
                                    </h1>
                                    <div className="mt-5 line-clamp-3" dangerouslySetInnerHTML={{ __html: item?.content }}></div>
                                </div>
                                <div className="author relative mt-5">
                                    <p className="text-gray-300 italic">
                                        Emirhan Karadeniz 10/23/2023
                                    </p>
                                </div>
                                <div className="footer mt-5 z-50" >
                                    <button className="border border-primary rounded-full p-3 hover:bg-primary duration-200" >
                                        Okumaya Başla <FontAwesomeIcon icon={faChevronCircleRight} className="ml-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}