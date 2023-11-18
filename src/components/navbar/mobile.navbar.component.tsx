import { faAdd, faBars, faClose, faPenFancy, faRegistered, faSign, faSignIn, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MobileNavbarComponent({ user }: { user: any }) {
    const [toggle, setToggle] = React.useState<boolean>(false)
    const [dropdown, setDropdown] = React.useState<boolean>(false)

    const handleClickToggleMenu = () => {
        setToggle(!toggle)
    }

    const handleClickDropdown = () => {
        setDropdown(!dropdown)
    }
    return (
        <div onMouseLeave={handleClickDropdown} >
            <div className="grid grid-cols-12 mt-5 items-center px-5">
                <div className="logo col-span-6">
                    <Link href="/" >
                        <Image src="/images/logo.png" width={120} height={120} alt="logo" />
                    </Link>
                </div>
                <div className="toggleButton col-span-6 flex flex-1 justify-end gap-5 items-center">
                    <button onClick={handleClickToggleMenu} >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <button onClick={handleClickDropdown} >
                        <FontAwesomeIcon icon={faUser} />
                    </button>
                </div>
            </div>
            {dropdown && user?.role === 'user' ? (
                <>
                    <div className="mobileLoginMenu absolute right-5 bg-darkLight text-light p-3 rounded-lg z-50"   >
                        <ul className="flex flex-col gap-5 items-start justify-center" >
                            <li className="hover:bg-primary p-2 rounded-lg duration-200" onClick={handleClickDropdown} >
                                <Link href="/user/post/add">
                                    <FontAwesomeIcon icon={faAdd} /> Yazı Ekle
                                </Link>
                            </li>
                            <li className="hover:bg-primary p-2 rounded-lg duration-200" onClick={handleClickDropdown}>
                                <Link href="/user/post/list">
                                    <FontAwesomeIcon icon={faPenFancy} /> Yazılarım
                                </Link>
                            </li>
                            <li className="hover:bg-primary p-2 rounded-lg duration-200" onClick={handleClickDropdown}>
                                <Link href={`/user/profile?id=${user?.id}`}>
                                    <FontAwesomeIcon icon={faUser} className="mr-2" />Profilim
                                </Link>
                            </li>
                            <li className="hover:bg-primary p-2 rounded-lg duration-200" onClick={handleClickDropdown}>
                                <button onClick={() => {signOut()}} >
                                    <FontAwesomeIcon icon={faSignOut} /> Çıkış Yap
                                </button>
                            </li>
                        </ul>
                    </div>
                </>
            ) : dropdown && user?.role === 'editor' ? (
                <></>
            ) : dropdown && user?.role === 'admin' ? (
                <></>
            ) : dropdown ? (
                <div className="mobileLoginMenu absolute right-5 bg-darkLight text-light p-3 rounded-lg">
                    <ul className="flex flex-col gap-5 items-start justify-center" >
                        <li className="hover:bg-primary p-2 rounded-lg duration-200" onClick={handleClickDropdown} >
                            <Link href="/login">
                                <FontAwesomeIcon icon={faSignIn} /> Giriş Yap
                            </Link>
                        </li>
                        <li className="hover:bg-primary p-2 rounded-lg duration-200" onClick={handleClickDropdown} >
                            <Link href="/register">
                                <FontAwesomeIcon icon={faSign} /> Kayıt Ol
                            </Link>
                        </li>
                    </ul>
                </div>
            ) : (<></>)}
            {
                toggle && (
                    <div className="mobileMenu absolute top-0 bg-primary w-full h-screen text-light">
                        <div className="topbar flex flex-1 justify-end p-5">
                            <button onClick={handleClickToggleMenu} >
                                <FontAwesomeIcon icon={faClose} width={30} />
                            </button>
                        </div>
                        <div className="content flex flex-col justify-around items-center h-full">
                            <div className="menu">
                                <ul className="text-center flex flex-col gap-5">
                                    <li>
                                        <Link href="/" className="text-3xl" onClick={handleClickToggleMenu} >
                                            Anasayfa
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about" className="text-3xl" onClick={handleClickToggleMenu} >
                                            Hakkımızda
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="text-3xl" onClick={handleClickToggleMenu} >
                                            İletişim
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="bottom">
                                <h1>
                                    brkshn
                                </h1>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}