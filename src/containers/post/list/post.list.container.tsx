"use client"
import TableComponent from "@/components/table/table.component";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function PostListContainer({ data }: { data?: any }) {
    const {id} = useSelector((idReducer:any) => idReducer.idReducer)
    const table = [
        {
            name: '#',
            selector: 'image.url',
            type: 'image'
        },
        {
            name: 'Başlık',
            selector: 'title'
        },
        {
            name: 'Kategori',
            selector: 'category.title'
        },
        {
            name: 'Durumu',
            selector: 'isActive',
            type: 'boolean'
        }
    ]

    return (
        <div className="container mx-auto mt-10" >
            <div className="title text-center">
                <h1 className="text-2xl" >
                    Tüm Yazılarım
                </h1>
            </div>
            <div className="table w-full mt-10">
                <TableComponent props={table} data={data}>
                    <div className="menu absolute bg-white z-50 rounded-lg shadow-lg p-4" >
                        <ul className="flex flex-col gap-6" >
                            <li className="p-2 hover:bg-gray-300 rounded-lg duration-200">
                                <Link href={`/user/post/update?id=${id}`}  >
                                    Düzenle
                                </Link>
                            </li>
                            <li className="p-2 hover:bg-gray-300 rounded-lg duration-200">
                                <button onClick={async () => {
                                    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/post/delete?id=' + id , {method:'DELETE'})

                                    if (res.status === 200){
                                        Swal.fire({
                                            title: 'Yazı Sil',
                                            text: 'Yazı başarıyla silindi',
                                            icon:'success'
                                        })
                                    }else{
                                        Swal.fire({
                                            title:'Yazı Sil',
                                            text: 'Yazı silinirken bir sorun meydana geldi.',
                                            icon:'error'
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