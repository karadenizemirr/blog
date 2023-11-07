import CardComponent from "@/components/card/card.component";
import React from "react";

export default function SearchContainer({result}:{result:any}){
    return (
        <div>
            <div className="title text-center mt-10 mb-10">
                <h1 className="text-2xl" >
                    Arama Sonuçları
                </h1>
            </div>
            <div className="searchCard grid grid-cols-12">
                {
                    result.map((item:any, index:number) => (
                        <CardComponent item={item} key={index} />
                    ))
                }
            </div>
        </div>
    )
}