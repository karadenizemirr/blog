import { faComment, faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Swal from "sweetalert2";

export default function CommentComponent({ comments, postId }: { comments?: any, postId?: string }) {
    const { data: session }: { data: any } = useSession()
    return (
        <div className="mt-10" >
            <div className="title mb-5">
                <h1 className="text-xl font-medium" >
                    Yorumlar
                </h1>
            </div>
            {
                comments?.map((comment: any, index: number) => (
                    <div className="commentList mt-5 mb-5" key={index}>
                        <div className="author flex flex-1 items-center gap-3">
                            <div className="avatar">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={comment?.user?.avatar?.url} alt="" style={{ width: '30px', height: '30px' }} className="rounded-full object-cover" />
                            </div>
                            <div className="namesurnam">
                                <Link href={`/user/${comment?.user?.id}`} className="text-sm text-gray-500" >
                                    {comment?.user?.name} {comment?.user?.surname}
                                </Link>
                            </div>
                        </div>
                        <div className="comment mt-3 p-2 flex gap-3">
                            <p>
                                {
                                    comment.message
                                }
                            </p>
                            {
                                session?.user?.id === comment?.user?.id && (
                                    <button className="hover:text-red-500 duration-200" onClick={async () => {
                                        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/comment/get?action=delete&id='+comment?.id)

                                        if (res.status === 200){
                                            Swal.fire({
                                                title: 'Yorum Sil',
                                                text: 'Yorum başarıyla silidni',
                                                icon: 'success'
                                            })
                                        }else{
                                            Swal.fire({
                                                title: 'Yorum Sil',
                                                text: 'Yorum silinirken bir sorun meydana geldi.',
                                                icon: 'error'
                                            })
                                        }
                                    }}>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                )
                            }
                        </div>
                    </div>
                ))
            }
            <div className="commentBar">
                <Formik initialValues={{
                    comment: ""
                }} onSubmit={async (values: any) => {
                    values.postId = postId
                    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/comment/post?id=' + session?.user?.id, {
                        method: 'POST',
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(values)
                    })

                    if (res.status === 200) {
                        Swal.fire({
                            title: 'Yorum Yap',
                            text: 'Yorum başarıyla eklendi',
                            icon: 'success'
                        })
                    } else {
                        Swal.fire({
                            title: 'Yorum Yap',
                            text: 'Yorum eklenirken sorun meydana geldi.',
                            icon: 'error'
                        })
                    }
                }} >
                    <Form>
                        <div className="row">
                            <Field name="comment" >
                                {({ field, form }: { field: any, form: any }) => (
                                    <textarea name="comment" id="comment" placeholder="Yorumunuz" className="w-full border rounded-lg p-2" disabled={!session?.user}
                                        onChange={(e: any) => {
                                            form.setFieldValue("comment", e.target.value)
                                        }}
                                    ></textarea>
                                )}
                            </Field>
                            {
                                session?.user ? (<>

                                    <button className="btn-primary bg-primary mt-5" type="submit" >
                                        <FontAwesomeIcon icon={faComment} /> Yorum Yap
                                    </button>
                                </>) : (
                                    <p className="mt-3">
                                        Yorum yapabilmek için <Link className="text-blue-500" href="/login" >Giriş Yapmalısınız</Link>
                                    </p>
                                )
                            }
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}