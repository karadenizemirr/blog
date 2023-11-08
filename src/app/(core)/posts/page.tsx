import AdminPostListContainer from "@/containers/post/list/admin.post.list.container";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const fetchGetAllPosts = async () => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/post/get?action=all', {method:'GET', cache: 'no-cache'})
        const {data , ok} = await res.json()
        if (ok) return data
        else return []

    }catch(err){
        return []
    }
}
export default async function AdminGetAllPostPage(){
    const posts = await fetchGetAllPosts()
    const {user} = await getServerSession(authOptions)

    if (user?.role !== 'admin' || user?.role !== 'editor'){
        redirect('/')
    }
    return (
        <div>
            <AdminPostListContainer data={posts} />
        </div>
    )
}