"use client"
import { faFacebook, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faAdd, faComment, faList, faList12, faPenAlt, faPenToSquare, faPerson, faSearch, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import MobileNavbarComponent from "./mobile.navbar.component";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import NProgress from 'nprogress';
import { Router } from 'next/router';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function NavbarComponent({ user, posts }: { user?: any, posts?: any }) {
    const [userToggle, setUserToggle] = React.useState(false)
    const [index, setIndex] = React.useState(0)
    const router = useRouter()

    const handleOpenUserToggle = () => {
        setUserToggle(!userToggle)
    }


    useEffect(() => {
        setTimeout(() => {
            setIndex(index + 1)

            if (index >= posts.length) {
                setIndex(0)
            }
        }, 3000)
    }, [index])

    return (
        <nav className="text-sm" >
            <div className="topbar border-b py-2">
                <div className="topbarMenu container mx-auto flex flex-1 justify-between line-clamp-1 lg:line-clamp-none">
                    <div className="latestPost">
                        <ul className="flex flex-1 gap-4 items-center" >
                            <li>
                                <FontAwesomeIcon icon={faAdd} />
                            </li>
                            <li className="text-sm lg:text-md" >
                                <Link href={`/posts/${posts[index]?.slug}`}>
                                    {posts[index]?.title}
                                </Link>
                            </li>
                            <li className="text-primary text-sm italic hidden lg:block" >
                                <Link href={`/user/${posts[index]?.user?.id}`}>
                                    {posts[index]?.user?.name} {posts[index]?.user?.surname}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border-b hidden lg:hidden xl:block">
                <div className="container mx-auto py-5 grid grid-cols-12 z-50" >
                    <div className="logo col-span-3 flex items-center gap-5">
                        <Link href="/" >
                            <Image src="/images/logo.png" width={120} height={120} alt="logo" />
                        </Link>

                        {/* <h1 className="text-2xl font-medium tracking-wider" >
                            brkshn
                        </h1> */}
                        <div className="searchabr">
                            <label htmlFor="">
                                <div className="relative">
                                    <Formik initialValues={{ query: "" }} onSubmit={(values: any) => {
                                        router.push(`/search/${values.query}`)
                                    }} >
                                        <Form className="text-sm">
                                            <Field name="query" placeholder="Ara..." className="border p-1 rounded-full bg-gray-100" autoComplete="off" />
                                            <button className="ml-2" type="submit" >
                                                <FontAwesomeIcon icon={faSearch} />
                                            </button>
                                        </Form>
                                    </Formik>
                                </div>
                            </label>

                        </div>
                    </div>
                    <div className="col-span-7 flex items-center">
                        <ul className="flex flex-1  gap-10 justify-end items-center" >
                            <li>
                                <Link href="/" >
                                    Anasayfa
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" >Hakkımızda</Link>
                            </li>
                            <li>
                                <Link href="/contact" >
                                İletişim
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-2 flex flex-1 justify-end items-center gap-10">
                        {
                            user ? (
                                <>
                                    <Link href="/user/post/add" >
                                        <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />Yazı Ekle
                                    </Link>
                                    <div className="login">
                                        <div className="user relative w-10 h-10 rounded-full border-[1px] border-black p-3 cursor-pointer" onClick={handleOpenUserToggle}>
                                            <Image src={user?.avatar} layout="fill" alt="asd" className="rounded-full object-cover" />
                                        </div>
                                        {
                                            userToggle && (
                                                <div className="menu absolute p-5 right-12 rounded border duration-200 z-50 bg-white" onMouseLeave={handleOpenUserToggle}>
                                                    {
                                                        user?.role === 'user' ? (
                                                            <>
                                                                <ul className="flex flex-col gap-5" >
                                                                    <li className="p-2 hover:bg-gray-300 rounded-lg duration-200" >
                                                                        <Link href="/user/post/add" >
                                                                            <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />Yazı Ekle
                                                                        </Link>
                                                                    </li>
                                                                    <li className="p-2 hover:bg-gray-300 rounded-lg duration-200">
                                                                        <Link href="/user/post/list">
                                                                            <FontAwesomeIcon icon={faList} className="mr-2" />Yazılarım
                                                                        </Link>
                                                                    </li>

                                                                    <li className="p-2 hover:bg-gray-300 rounded-lg duration-200">
                                                                        <Link href={`/user/profile?id=${user?.id}`}>
                                                                            <FontAwesomeIcon icon={faUser} className="mr-2" />Profilim
                                                                        </Link>
                                                                    </li>
                                                                    <li className="p-2 hover:bg-gray-300 rounded-lg duration-200">
                                                                        <button onClick={() => { signOut() }} >
                                                                            <FontAwesomeIcon icon={faSignOut} className="mr-2" />Çıkış Yap
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </>
                                                        ) : user?.role === 'editor' ? (
                                                            <>
                                                                <ul className="flex flex-col gap-5" >
                                                                    <li className="p-2 hover:bg-gray-300 rounded-lg duration-200" >
                                                                        <Link href="/user/post/add" >
                                                                            <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />Yazı Ekle
                                                                        </Link>
                                                                    </li>
                                                                    <li className="p-2 hover:bg-gray-300 rounded-lg duration-200" >
                                                                        <Link href="/category" >
                                                                            <FontAwesomeIcon icon={faList12} className="mr-2" />Kategoriler
                                                                        </Link>
                                                                    </li>
                                                                    <li className="p-2 hover:bg-gray-300 rounded-lg duration-200">
                                                                        <Link href="/user/post/list">
                                                                            <FontAwesomeIcon icon={faPenAlt} className="mr-2" />Yazılarım
                                                                        </Link>
                                                                    </li>
                                                                    <li className="p-2 hover:bg-gray-300 rounded-lg duration-200" >
                                                                        <Link href="/posts" >
                                                                            <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />Tüm Yazılar
                                                                        </Link>
                                                                    </li>
                                                                    <li className="p-2 hover:bg-gray-300 rounded-lg duration-200">
                                                                        <Link href="/comments">
                                                                            <FontAwesomeIcon icon={faComment} className="mr-2" />Yorumlar
                                                                        </Link>
                                                                    </li>

                                                                    <li className="p-2 hover:bg-gray-300 rounded-lg duration-200">
                                                                        <Link href={`/user/profile?id=${user?.id}`}>
                                                                            <FontAwesomeIcon icon={faUser} className="mr-2" />Profilim
                                                                        </Link>
                                                                    </li>
                                                                    <li className="p-2 hover:bg-gray-300 rounded-lg duration-200">
                                                                        <button onClick={() => { signOut() }} >
                                                                            <FontAwesomeIcon icon={faSignOut} className="mr-2" />Çıkış Yap
                                                                        </button>
                                                                    </li>
                                                                </ul></>
                                                        ) : user?.role === 'admin' ? (
                                                            <>
                                                                <ul className="flex flex-col gap-5" >
                                                                <li className="p-2 hover:bg-gray-300 rounded-lg duration-200" >
                                                                        <Link href="/user/list" >
                                                                            <FontAwesomeIcon icon={faPerson} className="mr-2" />Kullanıcılar
                                                                        </Link>
                                                                    </li>
                                                                    <li className="p-2 hover:bg-gray-300 rounded-lg duration-200" >
                                                                        <Link href="/category" >
                                                                            <FontAwesomeIcon icon={faList12} className="mr-2" />Kategoriler
                                                                        </Link>
                                                                    </li>
                                                                    <li className="p-2 hover:bg-gray-300 rounded-lg duration-200" >
                                                                        <Link href="/posts" >
                                                                            <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />Tüm Yazılar
                                                                        </Link>
                                                                    </li>
                                                                    <li className="p-2 hover:bg-gray-300 rounded-lg duration-200">
                                                                        <Link href="/comments">
                                                                            <FontAwesomeIcon icon={faComment} className="mr-2" />Yorumlar
                                                                        </Link>
                                                                    </li>

                                                                    <li className="p-2 hover:bg-gray-300 rounded-lg duration-200">
                                                                        <Link href={`/user/profile?id=${user?.id}`}>
                                                                            <FontAwesomeIcon icon={faUser} className="mr-2" />Profilim
                                                                        </Link>
                                                                    </li>
                                                                    <li className="p-2 hover:bg-gray-300 rounded-lg duration-200">
                                                                        <button onClick={() => { signOut() }} >
                                                                            <FontAwesomeIcon icon={faSignOut} className="mr-2" />Çıkış Yap
                                                                        </button>
                                                                    </li>
                                                                </ul></>
                                                        ) : (<></>)
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link href="/register" >
                                        Kayıt Ol
                                    </Link>
                                    <Link href="/login" className="btn-primary" >
                                        Giriş Yap
                                    </Link>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="xl:hidden" >
                <MobileNavbarComponent user={user} />
            </div>
        </nav>
    )
}