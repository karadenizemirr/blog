import UserListContainer from "@/containers/profile/user.list.container";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";


const getUserList = async () => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/get?action=all', {method:'GET', cache: 'no-store'})

        const {ok,data} = await res.json()

        if (ok) return data
        else return data

    }catch(err){
        return []
    }
}

export default async function UserListPage(){
    const users = await getUserList()
    const {user} = await getServerSession(authOptions)

    if (user?.role !== 'editor' && user?.role !== 'admin'){
        redirect('/')
    }

    return (
        <div>
            <UserListContainer users={users} />
        </div>
    )
}