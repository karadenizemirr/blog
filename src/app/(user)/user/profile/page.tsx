import UserProfileContainer from "@/containers/profile/user.profile.container";
import React from "react";

const fetchUserProfileData = async (id:string) => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/get?id=' + id + '&action=userData', {
            cache: 'no-cache'
        })

        const {ok, data} = await res.json()

        if (ok) return data
        else return []

    }catch(err){
        return []
    }
}

export default async function UserProfilePage({searchParams}: {searchParams: {id: string}}){
    const user = await fetchUserProfileData(searchParams.id)
    return (
        <div>
            <UserProfileContainer data={user} />
        </div>
    )
}