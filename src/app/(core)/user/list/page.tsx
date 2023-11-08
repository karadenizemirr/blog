import UserListContainer from "@/containers/profile/user.list.container";
import React from "react";


const getUserList = async () => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/get?action=all', {method:'GET'})

        const {ok,data} = await res.json()

        if (ok) return data
        else return data

    }catch(err){
        return []
    }
}

export default async function UserListPage(){
    const users = await getUserList()
    return (
        <div>
            <UserListContainer users={users} />
        </div>
    )
}