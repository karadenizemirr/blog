"use client"
import cloudinaryUploadSingle from "@/lib/cloudinary";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import React from "react";
import Swal from "sweetalert2";

export default function UserProfileContainer({data}:{data:any}) {
    const [avatar, setAvatar] = React.useState()
    const [srcAvatar, setSrcAvatar] = React.useState()
    return (
        <div className="container mx-auto mt-10" >
            <div className="title text-center flex flex-col justify-center items-center mb-10">
                <h1 className="text-2xl" >
                    Profilim
                </h1>
                <div className="img w-24 h-24 mt-5 bg-gray-300 rounded-full relative">
                    <Image src={srcAvatar ||data?.avatar?.url||""} layout="fill" alt="profile" objectFit="cover" className="rounded-full" />
                </div>
            </div>
            <Formik initialValues={{
                username: data.profile?.username,
                born_date:data.profile?.born_date,
                country: data.profile?.country,
                city: data.profile?.city,
                name: data.name,
                surname:data.surname,
                phone_number: data.phone_number,
                mail_address:data.email,
                password: data.password,
                avatar:data?.avatar?.url,
                facebook: data?.social?.facebook,
                instagram: data?.social?.instagram,
                twitter: data?.social?.twitter,
                linkedin: data?.social?.linkedin,
                website: data?.social?.website,
                about:data?.profile?.about
            }} 
            onSubmit={async (values:any, {resetForm}) => {
                if (avatar){
                    const img_url = await cloudinaryUploadSingle(avatar)
                    values.avatar = img_url
                }
                const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/update?id='+ data.id , {
                    method:'POST',
                    headers:{
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(values)
                })

                const {ok} = await res.json()
                resetForm()

                if (ok) {
                    Swal.fire({
                        icon:'success',
                        title: 'Profilimi Güncelle',
                        text: 'Profil başarıyla güncellendi'
                    })
                }else{
                    Swal.fire({
                        icon:'error',
                        title:'Profilimi Güncelle',
                        text: 'Profil güncellenirken bir sorun meydana geldi.'
                    })
                }
            }} >
                <Form className="grid grid-cols-12 gap-5 items-center p-2">
                    <div className="col-span-12 lg:col-span-4 border-r-2 border-black px-2">
                        <div className="row flex flex-1 gap-5">
                            <Field name="username" placeholder="Takma Ad" className="form-element" />
                            <Field name="born_date" placeholder="Doğum Tarihi" className="form-element" type="date" />
                        </div>
                        <div className="row flex flex-1 gap-5 mt-5">
                            <Field name="country" placeholder="Yaşadığınız Ülke" className="form-element" />
                            <Field name="city" placeholder="Yaşadığınız Şehir" className="form-element" />
                        </div>
                        <div className="row flex flex-1 gap-5 mt-5">
                            <Field>
                                {({ field, form }: { field: any, form: any }) => (
                                    <textarea 
                                        name="about" 
                                        className="form-element" 
                                        placeholder="Hakkımda"
                                        onChange={(e:any) => {
                                            form.setFieldValue('about', e.target.value)
                                        }}
                                        >
                                            {data?.profile?.about}
                                        </textarea>
                                )}
                            </Field>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-4 border-r-2 mt-5 lg:mt-0 border-black px-2">
                        <div className="row flex flex-1 gap-5">
                            <Field name="name" placeholder="Adı" className="form-element" />
                            <Field name="surname" placeholder="Soyadı" className="form-element" />
                        </div>
                        <div className="row flex flex-1 mt-5 gap-5">
                            <Field name="phone_number" placeholder="Telefon Nu." className="form-element" />
                            <Field name="mail_address" placeholder="Mail Adresi" className="form-element" />
                        </div>
                        <div className="row flex flex-1 mt-5 gap-5">
                            <Field name="password" type="password" placeholder="Şifre" className="form-element" />
                            <Field name="avatar" >
                                {({ field, form }: { field: any, form: any }) => (
                                    <label htmlFor="file" className="form-element cursor-pointer hover:bg-gray-300 duration-100 flex justify-between">
                                        Profil Fotoğrafı Seç
                                        <input type="file" id="file" className="sr-only" onChange={(e:any) => {
                                            const file = e.currentTarget.files[0]
                                            setAvatar(file)
                                            if (!file || !['image/jpeg', 'image/png'].includes(file?.type)) Swal.fire({
                                                icon: 'error',
                                                title: 'Profil Fotoğrafı',
                                                text: 'Profil fotoğrafı beklenen formatta değil. Yalnızca .jpg'
                                            })

                                            const reader = new FileReader()
                                            reader.onload = (event:any) => {
                                                setSrcAvatar(event?.target?.result)
                                            }

                                            reader.readAsDataURL(file)
                                        }} />
                                    </label>
                                )}
                            </Field>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-4 mt-5 lg:mt-0">
                        <div className="row flex flex-1 gap-5">
                            <Field name="facebook" placeholder="Facebook" className="form-element" />
                            <Field name="instagram" placeholder="Instagram" className="form-element" />
                        </div>
                        <div className="row flex flex-1 gap-5 mt-5">
                            <Field name="twitter" placeholder="Twitter" className="form-element" />
                            <Field name="linkedin" placeholder="Linkedin" className="form-element" />
                        </div>
                        <div className="row mt-5">
                            <Field name="website" placeholder="Web Sitesi" className="form-element" />
                        </div>
                    </div>
                    <div className="row mt-5 col-span-12 lg:col-span-3 w-full">
                        <button className="btn-primary w-full" type="submit">
                            Tüm Değişiklikleri Kaydet
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}