import AdminPostListContainer from "@/containers/post/list/admin.post.list.container";
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
    return (
        <div>
            <AdminPostListContainer data={posts} />
        </div>
    )
}