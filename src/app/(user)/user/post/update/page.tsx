import PostAddContainer from "@/containers/post/add/post.add.container";
import React from "react";
import { fetchGetAllCategory } from "../add/page";

export const fetchGetPost = async (postId:string) => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL +'/post/get?id=' + postId + '&action=userPost', {
            method: 'GET',
            cache: 'no-store'
        })

        const {ok,data} = await res.json()

        if (ok) return data
        else return []
    }catch(err){
        return []
    }
}


export default async function UpdatePost({searchParams}:{searchParams:{id:string}}){
    const categories = await fetchGetAllCategory()
    const post = await fetchGetPost(searchParams.id as string)

    return (
        <div>
            <PostAddContainer category={categories} data={post} />
        </div>
    )
}