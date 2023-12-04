"use client"
import { Field, Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from 'yup'

export default function LoginContainer(){
    return (
        <div className="w-full min-h-[70vh] mx-auto flex flex-1 items-center justify-center" >
            <div className="loginContainer border p-5">
                <div className="title text-center">
                    <h1 className="text-2xl" >
                        Giriş Yap
                    </h1>
                    <p className="mt-5" >
                        Giriş yapın ve yazılarınızı hemen paylaşın.
                    </p>
                </div>
                <div className="loginForm form- mt-5">
                    <Formik initialValues={{
                        mail_address:"",
                        password:""
                    }} 
                    validationSchema={
                        Yup.object({
                            mail_address: Yup.string().required('Mail Adresi Zorunlu').email('Geçerli Bir Mail Adresi Giriniz').trim(),
                            password: Yup.string().required('Şifre Zorunlu').trim()
                        })
                    }
                    onSubmit={(values:any) => {
                        signIn('credentials', {
                            mail_address: values.mail_address,
                            password: values.password,
                            callbackUrl: '/'
                        })
                    }} >
                        <Form>
                            <div className="row">
                                <Field name="mail_address" placeholder="Mail Adresi" className="form-element" autoComplete="off" />
                            </div>
                            <div className="row mt-5" >
                                <Field name="password" placeholder="Şifreniz" className="form-element" type="password" autoComplete="off" />
                            </div>
                            <div className="row text-center mt-5">
                                <button className="btn-primary w-full" type="submit">
                                    Giriş Yap
                                </button>
                                <p className="mt-5" >
                                    Henüz bir hesabınız yok mu ? <Link href="/register" className="text-blue-500" >Kayıt Olun</Link>
                                </p>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}