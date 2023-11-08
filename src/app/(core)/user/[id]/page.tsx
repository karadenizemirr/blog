import HomeUserProfileContainer from "@/containers/profile/home.user.profile.container";
import React from "react";

const getUserProfile = async (id:string) => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/get?action=userProfile&id='+ id, {method: 'GET'})

        const {ok,data} = await res.json()

        if (ok) return data
        else return []

    }catch(err){
        return []
    }
}

export default async function UserPage({params}:{params: {id:string}}){
    const user = await getUserProfile(params.id)

    return (
        <div>
            <HomeUserProfileContainer user={user} />
        </div>
    )
}