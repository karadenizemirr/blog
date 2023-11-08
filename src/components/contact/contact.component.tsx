"use client"

import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik } from "formik";
import React from "react";

export default function ContactComponent(){
    return (
        <div className="min-h-[70vh] flex flex-1 items-center justify-center" >
            <Formik initialValues={{}} onSubmit={() => {}} >
                <Form className="w-full lg:w-1/3 p-5" >
                    <div className="title text-center mb-5">
                        <h1 className="text-2xl mt-5" >
                            Bize Ulaşın
                        </h1>
                    </div>
                    <div className="row flex flex-1 gap-5">
                        <Field name="name" placeholder="Adınız" className="form-element" />
                        <Field name="surname" placeholder="Soyadınız" className="form-element" />
                    </div>
                    <div className="row mt-5">
                        <Field>
                            {({field,form}:{field:any, form:any}) => (
                                <textarea name="" id="" placeholder="Mesajınız" className="form-element" ></textarea>
                            )}
                        </Field>
                    </div>
                    <div className="row ">
                        <button className="btn-primary w-full mt-5">
                            <FontAwesomeIcon icon={faMessage} /> Mesaj Gönder
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}