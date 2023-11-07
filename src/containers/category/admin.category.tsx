"use client"
import TableComponent from "@/components/table/table.component";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function AdminCategoryContainer({data}:{data:any}){
    const {id} = useSelector((idReducer:any) => idReducer.idReducer)

    const tableProps =[
        {
            name:'#',
            selector: 'id'
        },
        {
            name:'Kategori Adı',
            selector: 'title'
        }
    ]
    return (
        <div className="mx-auto container min-h-[50vh] w-full" >
            <div className="topbar flex flex-col items-center justify-center  mt-10 mb-10">
                <div className="title">
                    <h1 className="text-2xl" >
                        Kategoriler
                    </h1>
                </div>
                <div className="addCategory mt-5 flex flex-1 items-center justify-end w-full">
                    <Formik initialValues={{title: ""}} 
                        onSubmit={async (values:any) => {
                            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/category/add',{
                                method:'POST',
                                headers: {
                                    "content-type": "application/json"
                                },
                                body:JSON.stringify(values)
                            })

                            const {ok} = await res.json()

                            if (ok){
                                Swal.fire({
                                    icon:'success',
                                    title:' Kategori Ekle',
                                    text: 'Kategori başarıyla eklendi'
                                })
                            }else{
                                Swal.fire({
                                    icon:'error',
                                    title:'Kategori Ekle',
                                    text: 'Kategori eklenirken sorun meydana geldi.'
                                })
                            }
                        }}>
                        <Form>
                            <div className="row flex gap-5">
                                <Field className="form-element" name="title" placeholder="Kategori Adı" />
                                <button className="btn-primary" type="submit">
                                    Ekle
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
            <div className="table w-full">
                <TableComponent data={data} props={tableProps}>
                <div className="menu absolute bg-white z-50 rounded-lg shadow-lg p-4" >
                        <ul className="flex flex-col gap-6" >
                            <li className="p-2 hover:bg-gray-300 rounded-lg duration-200">
                                <button onClick={async () => {
                                    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/category/get?action=delete&id=' + id, {
                                        method: 'GET'
                                    })

                                    if (res.status === 200){
                                        Swal.fire({
                                            icon:'success',
                                            title:'Kategori Sil',
                                            text: 'Kategori silme işlemi başarılı'
                                        })
                                    }else{
                                        Swal.fire({
                                            icon:'success',
                                            title:'Kategori Sil',
                                            text: 'Kategori silme işlemi başarısız oldu.'
                                        })
                                    }
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