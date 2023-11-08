import PostAddContainer from "@/containers/post/add/post.add.container";
import React from "react";

export const fetchGetAllCategory = async () => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/category/getAll', {
            method: 'GET',
            cache: 'no-store'
        })

        const {ok, data} = await res.json()

        if (ok) return data
        else data

    }catch(err){
        return []
    }
}

export default async function PostPage(){
    const categories = await fetchGetAllCategory()
    return (
        <div>
            <PostAddContainer category={categories} />
        </div>
    )
}