import PostListContainer from "@/containers/post/list/post.list.container";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";

// Get All Posts

const fetchUserAllPosts = async (userId: string) => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/post/getUser?id=' + userId, {
            method: 'GET',
            cache:'no-cache'
        })

        const {ok, data} = await res.json()

        if (ok) return data
        else return []
    }catch(err){
        return []
    }
}

export default async function PostList(){
    const session:any = await getServerSession(authOptions)
    const data = await fetchUserAllPosts(session?.user?.id)

    return (
        <div>
            <PostListContainer data={data} />
        </div>
    )
}