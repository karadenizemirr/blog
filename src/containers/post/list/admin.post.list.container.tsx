"use client"
import TableComponent from "@/components/table/table.component"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import Swal from "sweetalert2"

export default function AdminPostListContainer({ data }: { data: any }) {
    const {id} = useSelector((idReducer:any) => idReducer.idReducer)
    const router = useRouter()
    
    const tablePrps = [
        {
            name: '#',
            type: 'image',
            selector: 'image.url'
        },
        {
            name: 'Başlık',
            selector: 'title'
        },
        {
            name: 'Yazar Adı',
            selector: 'user.name'
        },
        {
            name: 'Yazar Soyadı',
            selector: 'user.surname'
        },
        {
            name: 'Yazar Telefonu',
            selector: 'user.phone_number'
        },
        {
            name: 'Durumu',
            selector: 'isActive',
            type: 'boolean'
        },
        {
            name:'Görüntülenme',
            selector: 'view.count'
        },
        {
            name:'Beğeni',
            selector:'like.count'
        }
    ]
    return (
        <div className="mx-auto container min-h-[50vh]" >
            <div className="title flex flex-1 items-center justify-center">
                <h1 className="text-2xl" >
                    Tüm Yazılar
                </h1>
            </div>
            <div className="table w-full mt-10">
                <TableComponent props={tablePrps} data={data}>
                    <div className="menu absolute bg-white z-50 rounded-lg shadow-lg p-4 w-100 right-3.5" >
                        <ul className="flex flex-col gap-6" >
                            <li className="p-2 hover:bg-gray-300 rounded-lg duration-200">
                                <button onClick={async () => {
                                    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/post/get?action=verify&id=' + id, {method:'GET'})
                                    
                                    if (res.status === 200) return Swal.fire({icon: 'success', title: 'Yazı Onayı', text:'Yazı Onaylandı'})
                                    else return Swal.fire({icon: 'error', title: 'Yazı Onayı', text:'Yazı Onaylanmadı'})
                                }} >
                                    Onayla
                                </button>
                            </li>
                            <li className="p-2 hover:bg-gray-300 rounded-lg duration-200">
                                <button onClick={async () => {
                                    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/post/get?action=unverify&id=' + id, {method:'GET'})
                                    
                                    if (res.status === 200) return Swal.fire({icon: 'success', title: 'Yazı Onayı', text:'Yazı Yayından Kaldırıldı'})
                                    else return Swal.fire({icon: 'error', title: 'Yazı Onayı', text:'Yazı Yayından Kaldırılamadı'})
                                }} >
                                    Engelle
                                </button>
                            </li>
                            <li className="p-2 hover:bg-gray-300 rounded-lg duration-200">
                                <button onClick={async () => {
                                    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/post/get?action=delete&id=' + id, {method:'GET'})
                                    
                                    if (res.status === 200) return Swal.fire({icon: 'success', title: 'Yazı Onayı', text:'Yazı Silindi'})
                                    else return Swal.fire({icon: 'error', title: 'Yazı Onayı', text:'Yazı Silinemedi'})
                                }}>
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