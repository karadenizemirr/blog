"use client"
import cloudinaryUploadSingle from "@/lib/cloudinary";
import { Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import Swal from "sweetalert2";
import * as Yup from 'yup'

export default function PostAddContainer({ category, data }: { category: any, data?: any }) {

    const [content, setContent] = useState(data?.content || "")
    const [image, setImage] = useState()
    const [imageSrc, setImageSrc] = useState("")
    const [spinner, setSpinner] = useState(false)
    const { data: session }: { data: any } = useSession()


    const handleClickSpinner = () => {
        setSpinner(!spinner)
    }

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'], // Metin stillerini değiştirme araçları
        ['blockquote', 'code-block'], // Blokların formatını değiştirme araçları
        [{ header: 1 }, { header: 2 }], // Başlık seviyelerini değiştirme araçları
        [{ list: 'ordered' }, { list: 'bullet' }], // Sıralı ve madde işaretli listeleri ekleme araçları
        [{ script: 'sub' }, { script: 'super' }], // Alt ve üst çizgi stillerini değiştirme araçları
        [{ indent: '-1' }, { indent: '+1' }], // Girinti seviyelerini değiştirme araçları
        [{ direction: 'rtl' }], // Yazı yönünü değiştirme araçları
        [{ size: ['small', false, 'large', 'huge'] }], // Metin boyutunu değiştirme araçları
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // Başlık seviyelerini değiştirme araçları
        [{ color: [] }, { background: [] }], // Metin rengini ve arka plan rengini değiştirme araçları
        [{ font: [] }], // Metin yazı tipini değiştirme araçları
        [{ align: [] }], // Metin hizalamasını değiştirme araçları
        ['clean'], // Metni temizleme araçları
    ];

    return (
        <div className="container mx-auto w-full min-h-[60vh] mt-10" >
            <div className="title text-center">
                <h1 className="text-2xl" >
                    {
                        data ? 'Yazı Güncelle' : 'Yazıyı Ekle'
                    }
                </h1>
            </div>
            <div className="content mt-10">
                <div className="form">
                    <Formik
                        initialValues={{
                            title: data?.title || "",
                            keywords: data?.keywords.title || "",
                            category: data?.category.id || "",
                            content: data?.content

                        }}
                        onSubmit={async (
                            values: any,
                            { resetForm }
                        ) => {
                            values.content = content
                            values.userId = session?.user?.id
                            if (image) {
                                const img_url = await cloudinaryUploadSingle(image)
                                values.image = img_url
                            } else {
                                values.image = data?.image?.url || ""
                            }

                            // Update 

                            if (data) {
                                const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/post/update?id=' + data.id, {
                                    method: 'POST',
                                    headers: {
                                        "content-type": "application/json"
                                    },
                                    body: JSON.stringify(values)
                                })

                                const { ok } = await res.json()

                                if (ok) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Yazı Güncelle',
                                        text: 'Yazı başarıyla güncellendi'
                                    })
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Yazı Güncelle',
                                        text: 'Yazı güncellenirken bir sorun meydana geldi.'
                                    })
                                }

                                setSpinner(false)
                            } else {
                                const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/post/add', {
                                    method: 'POST',
                                    headers: {
                                        "content-type": "application/json"
                                    },
                                    body: JSON.stringify(values)
                                })

                                const { ok } = await res.json()

                                if (ok) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Yazı Ekle',
                                        text: 'Yazı başarıyla eklendi.'
                                    })
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Yazı Ekle',
                                        text: 'Yazı eklenirken bir sorun meydana geldi.'
                                    })
                                }
                                setSpinner(false)
                            }

                            resetForm()

                        }} >
                        <Form>
                            <div className="row">
                                <ReactQuill
                                    theme="bubble"
                                    value={content}
                                    onChange={setContent}
                                    placeholder="Buraya tıklayarak yazmaya başlayın.."
                                    className="font-regular border rounded-full"
                                    modules={{
                                        toolbar: toolbarOptions
                                    }}
                                />
                            </div>
                            <div className="row mt-5 flex flex-col lg:flex-1 lg:flex-row gap-5">
                                <Field name="title" placeholder="Başlık*" className="form-element" autoComplete="off" required />
                                <Field name="keywords" placeholder="Anahtar Kelimeler" className="form-element" autoComplete="off" />
                                <Field name="category" component="select" className="form-element" placeholder="Kategori Seçin" defaultValue="null" required>
                                    <option value="null">Kategori Seçin*</option>
                                    {
                                        category.map((item: any, index: number) => (
                                            <option value={item.id} key={index}>
                                                {
                                                    item.title
                                                }
                                            </option>
                                        ))
                                    }
                                </Field>
                                <Field name="images" >
                                    {({ field, form }: { field: any, form: any }) => (
                                        <label htmlFor="file" className="form-element cursor-pointer hover:bg-gray-300 duration-100 flex justify-between">
                                            Kapak Görseli
                                            <input type="file" id="file" className="sr-only" required onChange={(event: any) => {
                                                const file = event.currentTarget.files[0]
                                                setImage(file)

                                                if (!file || !['image/jpeg', 'image/png'].includes(file?.type)) Swal.fire({
                                                    icon: 'error',
                                                    title: 'Kapak Görseli',
                                                    text: 'Kapak görseli beklenen formatta değil. Yalnızca .jpg'
                                                })
                                                const reader = new FileReader()
                                                reader.onload = (e: any) => {
                                                    setImageSrc(e?.target?.result)
                                                }

                                                reader.readAsDataURL(file)
                                            }} />
                                            <Image src={imageSrc || data?.image?.url || ""} alt="" width={20} height={20} />
                                        </label>
                                    )}
                                </Field>
                            </div>
                            <div className="row text-center">
                                <button className="text-center mt-10 btn-primary" onClick={handleClickSpinner} type="submit" >
                                    {
                                        spinner ? (<>
                                            <div role="status">
                                                <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin fill-blue-600 text-center" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                            </div>
                                        </>) : (
                                            data ? 'Yazı Güncelle' : 'Yazı Ekle'
                                        )
                                    }
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}