import CardComponent from "@/components/card/card.component";
import React from "react";

export default function CategoryPostContainer({post}:{post:any}){
    return (
        <div className="container mx-auto" >
            <div className="title text-center mt-10 mb-10">
                <h1 className="text-2xl">
                    {post[0]?.title}
                </h1>
            </div>
            <div className="grid grid-cols-12">
                {
                    post[0].post.map((item:any, index:number) => (
                        <CardComponent item={item} key={index} />
                    ))
                }
            </div>
        </div>
    )
}