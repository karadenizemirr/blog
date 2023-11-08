"use client"
import TableComponent from "@/components/table/table.component";
import Reactc from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function UserListContainer({ users }: { users: any }) {
    const { id } = useSelector((idReducer: any) => idReducer.idReducer)
    const tableProps = [
        {
            name: '#',
            selector: 'avatar.url',
            type: 'image'
        },
        {
            name: 'Adı',
            selector: 'name'
        },
        {
            name: 'Soyadı',
            selector: 'surname'
        },
        {
            name: 'Durumu',
            selector: 'isActive',
            type: 'boolean'
        },
        {
            name: 'Rolü',
            selector: 'role'
        }

    ]
    return (
        <div className="container mx-auto min-h-[65vh] mt-10" >
            <div className="title text-center">
                <h1 className="text-2xl" >
                    Tüm Kullanıcılar
                </h1>
            </div>
            <div className="table mt-5 w-full">
                <TableComponent props={tableProps} data={users}>
                    <div className="menu absolute bg-white z-50 rounded-lg shadow-lg p-4 right-3.5" >
                        <ul className="flex flex-col gap-6" >
                            <li className="p-2 hover:bg-gray-300 rounded-lg duration-200">
                                <button onClick={async () => {
                                    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/admin?action=role&role=editor&id=' + id, { method: 'GET' })

                                    const { ok, data } = await res.json()

                                    if (ok) {
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Rol Belirle',
                                            text: 'Kullanıcı editör olarak ayarlandı.'
                                        })
                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Rol Belirle',
                                            text: 'Rol değiştirilemedi'
                                        })
                                    }
                                }} >
                                    Editor Yap
                                </button>
                            </li>
                            <li className="p-2 hover:bg-gray-300 rounded-lg duration-200">
                                <button onClick={async () => {
                                    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/admin?action=role&role=user&id=' + id, { method: 'GET' })

                                    const { ok, data } = await res.json()

                                    if (ok) {
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Rol Belirle',
                                            text: 'Kullanıcı yazar olarak ayarlandı.'
                                        })
                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Rol Belirle',
                                            text: 'Rol değiştirilemedi'
                                        })
                                    }
                                }} >
                                    Yazar Yap
                                </button>
                            </li>
                            <li className="p-2 hover:bg-gray-300 rounded-lg duration-200">
                                <button onClick={async () => {
                                    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/admin?action=role&role=admin&id=' + id, { method: 'GET' })

                                    const { ok, data } = await res.json()

                                    if (ok) {
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Rol Belirle',
                                            text: 'Kullanıcı yönetici olarak ayarlandı.'
                                        })
                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Rol Belirle',
                                            text: 'Rol değiştirilemedi'
                                        })
                                    }
                                }} >
                                    Yönetici Yap
                                </button>
                            </li>
                            <li className="p-2 hover:bg-gray-300 rounded-lg duration-200">
                            <button onClick={async () => {
                                    const confirm = await Swal.fire({
                                        icon: 'info',
                                        title: 'Kullanıcı Sil',
                                        text: 'Kullanıcıyı silmek istediğinize emin misiniz ?',
                                        confirmButtonText: 'Evet',
                                        cancelButtonText:' Hayır'
                                    })

                                    if (confirm.isConfirmed){
                                        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/admin?action=delete&id=' + id , {method:'GET'})
                                        const {ok} = await res.json()

                                        if (ok){
                                            Swal.fire({
                                                icon: 'success',
                                                title:'Kullanıcı Sil',
                                                text: 'Kullanıcı başarıyla silidni'
                                            })
                                        }else {
                                            Swal.fire({
                                                icon: 'error',
                                                title:'Kullanıcı Sil',
                                                text: 'Kullanıcı silinemedi.'
                                            })
                                        }
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