"use client"
import { faFacebook, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik } from "formik";
import React from "react";

export default function FooterComponent(){
    return (
        <div className="w-full bg-dark  p-6 text-white mt-20" >
            {/* <div className="content subscribe text-center">
                <h1 className="text-2xl">
                    Abone Olun
                </h1>
                <p className="mt-5" >
                    Abone olarak son yazılardan haberdar olun.
                </p>
                <div className="form flex flex-1 items-center justify-center mt-5">
                    <Formik initialValues={{}} onSubmit={() => {}} >
                        <Form className="w-1/3" >
                            <div className="row">
                                <Field name="email" placeholder="Mail Adresi" className="bg-black border border-white rounded-full w-full p-2" autoComplete="off" />
                                <button className=" btn-primary bg-primary rounded-full mt-5" >
                                    Abone Ol
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div> */}
            <div className="footer grid grid-cols-12 mt-10 items-center">
                <div className="col-span-12 lg:col-span-4 text-sm">
                    <ul className="flex flex-1 gap-5 text-gray-400 justify-center lg:justify-start mb-5 lg:mb-0" >
                        <li>
                            Terms of Use
                        </li>
                        <li>
                            Privacy Policy
                        </li>
                    </ul>
                </div>
                <div className="col-span-12 lg:col-span-4 flex items-center justify-center">
                    <ul className="flex flex-1  items-center justify-center gap-5" >
                        <li>
                            <FontAwesomeIcon icon={faFacebook} width={15} />
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faTwitter} width={15} />
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faInstagram} width={15} />
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faYoutube} width={15} />
                        </li>
                    </ul>
                </div>
                <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end items-center text-sm text-gray-400 mt-5 lg:mt-0">
                    Tüm Hakları Saklıdır @2023
                </div>
            </div>
        </div>
    )
}