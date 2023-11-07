import { faSadCry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function NotFound(){
    return (
        <div className="w-full min-h-[60vh] flex flex-1 items-center justify-center" >
            <h1 className="text-3xl" >
                Aradığınız Sayfa Bulunamadı <FontAwesomeIcon icon={faSadCry} />
            </h1>
        </div>
    )
}