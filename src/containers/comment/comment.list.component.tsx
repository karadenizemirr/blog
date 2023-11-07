"use client"
import TableComponent from "@/components/table/table.component";
import React from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
export default function CommentListContainer({comments}:{comments:any}){
    const {id} = useSelector((idReducer:any) => idReducer.idReducer)

    const tableProps = [
        {
            name:'Adı',
            selector:'user.name'
        },
        {
            name: 'Soyadı',
            selector:'user.surname'
        },
        {
            name: 'Yorum Tarihi',
            selector:'createdAt'
        },
        {
            name: 'Yorum',
            selector: 'message'
        }
    ]
    return (
        <div className="w-full container mx-auto min-h-[60vh] flex flex-col items-center mt-10">
            <div className="title">
                <h1 className="text-2xl" >
                    Tüm Yorumlar
                </h1>
            </div>
            <div className="table w-full mt-10">
                <TableComponent props={tableProps} data={comments}>
                <div className="menu absolute bg-white z-50 rounded-lg shadow-lg p-4" >
                        <ul className="flex flex-col gap-6" >
                            <li className="p-2 hover:bg-gray-300 rounded-lg duration-200">
                                <button onClick={async () => {
                                    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/comment/get?action=delete&id=' + id)

                                    if (res.status === 200){
                                        Swal.fire({
                                            icon:'success',
                                            title: 'Yorumu Sil',
                                            text:'Yorum başarıyla silindi'
                                        })
                                    }else{
                                        Swal.fire({
                                            icon:'error',
                                            title: 'Yorumu Sil',
                                            text:'Yorum silinirken bir sorun oluştu.'
                                        })
                                    }
                                }} > 
                                    Sil
                                </button>
                            </li>
                        </ul>
                    </div>
                </TableComponent>
            </div>
        </div>
    )
}