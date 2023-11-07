"use client"

import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Error(){
    return (
        <div className="mx-auto container w-full min-h-[60vh] flex flex-1 items-center justify-center flex-col" >
            <h1 className="text-5xl text-center" >
                Bir hata ile karşılaşıldı. <br /> Sayfayı yenilemeyi deneyin.
            </h1>
            <button className="mt-5 btn-primary px-10" >
                <FontAwesomeIcon icon={faPhone} className="mr-5" /> Bize Bildirin
            </button>
        </div>
    )
}