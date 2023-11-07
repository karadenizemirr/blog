"use client"
import React, { useState } from "react";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import store from "@/redux";
import { actions } from "@/redux/store/id.state";
import { useDispatch } from "react-redux";
export default function TableComponent({ props, data, children }: { props: any, data: any, children?: React.ReactNode }) {
    const [toggle, setToggle] = React.useState(false)
    const [menuIndex, setMenuIndex] = React.useState(0)

    const dispatch = useDispatch()

    const handleOpenToggleMenu = (index:any) => {
        setToggle(!toggle)
        setMenuIndex(index)
        dispatch(actions.setId({id: data[index].id}))
    }
    return (
        <div className="relative overflow-x-auto w-full min-h-[60vh]">
            <table className="w-full text-sm text-left ">
                <thead className="text-xs  uppercase border-t ">
                    <tr>
                        {
                            props.map((item: any, index: any) => (
                                <th scope="col" className="px-6 py-3" key={index}>
                                    {
                                        item.name
                                    }
                                </th>
                            ))
                        }
                        <th className="text-center">
                            İşlem
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item: any, index: any) => (
                            <tr key={index}>
                                {
                                    props.map((val: any, key: any) => (
                                        <td className="px-6 py-6" key={key}>
                                            {
                                                val.type === 'image' ? (
                                                    <>
                                                        <img src={val.selector.split('.').reduce((acc: any, value: any) => acc && acc[value], item)} alt="" width={50} height={50} style={{width: '50px', height: '50px'}} />
                                                    </>
                                                ) : val.type === 'boolean' ? (
                                                    <>
                                                        {
                                                            val.selector.split('.').reduce((acc: any, value: any) => acc && acc[value], item) ? (<span className="text-green-400" >Onaylandı</span>) :
                                                                (<span className="text-red-500">Onaylanmadı</span>)
                                                        }
                                                    </>
                                                ) : val.selector.split('.').reduce((acc: any, value: any) => acc && acc[value], item)
                                            }
                                        </td>
                                    ))
                                }
                                <td className="text-center relative">
                                    <button>
                                        <FontAwesomeIcon icon={faEllipsisV} onClick={() => {
                                            handleOpenToggleMenu(index)
                                        }} />
                                    </button>
                                    {
                                        menuIndex === index && toggle && (
                                            children
                                        )
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}