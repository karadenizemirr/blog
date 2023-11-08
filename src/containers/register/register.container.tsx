"use client"
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import React from "react";
import Swal from "sweetalert2";
import * as Yup from 'yup';

export default function RegisterContainer() {
    return (
        <div className="min-h-[70vh] w-full container mx-auto flex flex-1 items-center justify-center" >
            <div className="registerContainer border p-5">
                <div className="title text-center">
                    <h1 className="text-2xl" >
                        Kayıt Ol
                    </h1>
                    <p className="mt-5">
                        Kayıt olun ve etkileyici yazılarınızı hemen paylaşın.
                    </p>
                </div>
                <div className="form mt-5">
                    <Formik 
                    initialValues={{
                        name:"",
                        surname: "",
                        phone_number: "",
                        mail_address:"",
                        password:""
                    }} 
                    validationSchema={
                        Yup.object({
                            name: Yup.string().required('İsim Zorunlu'),
                            surname: Yup.string().required('Soyisim Zorunlu'),
                            mail_address: Yup.string().required('Mail Adresi Zorunlu').email('Geçerli Bir Mail Adresi Girin'),
                            password: Yup.string().required('Şifre Zorunlu')
                        })
                    }
                    onSubmit={async (values:any, {resetForm}) => {
                        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/register', {
                            method:'POST',
                            headers: {
                                "content-type":"application/json"
                            },
                            body: JSON.stringify(values)
                        })

                        const {ok} = await res.json()
                        resetForm()

                        if (ok){
                            Swal.fire({
                                icon:'success',
                                title: 'Kayıt Ol',
                                text: 'Kayıt Olma İşlemi Başarılı.'
                            })
                        }else{
                            Swal.fire({
                                icon:'error',
                                title:'Kayıt Ol',
                                text: 'Kayıt Olma İşlemi Başarısız.'
                            })
                        }

                    }} >
                        <Form>
                            <div className="row flex flex-1 gap-5">
                                <Field name="name" placeholder="Adınız" className="form-element" autoComplete="off" />
                                <Field name="surname" placeholder="Soyadınız" className="form-element" autoComplete="off" />
                            </div>
                            <div className="row flex flex-1 gap-5  mt-5">
                                <Field name="phone_number" placeholder="Telefon Nu." className="form-element" autoComplete="off" />
                                <Field name="mail_address" placeholder="Mail Adresi" className="form-element" autoComplete="off" />
                            </div>
                            <div className="row flex flex-1 gap-5 mt-5">
                                <Field name="password" placeholder="Şifreniz" className="form-element" autoComplete="off" type="password" />
                            </div>
                            <div className="row mt-5 text-center flex flex-col gap-5">
                                <button className="btn-primary" type="submit">
                                    Kayıt Ol
                                </button>
                                <span>
                                    Zaten bir hesabınız var mı ? <Link className="text-blue-400" href="/login" >Giriş Yapın</Link>
                                </span>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}