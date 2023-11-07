import PostDetailContainer from "@/containers/post/detail/post.detail.container";
import React from "react";

const getPostSlug = async (slug:string) => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/post/get?action=get&slug=' + slug, {cache:'no-cache'})
        const {ok,data} = await res.json()

        if (ok) return data
        else return []
    }catch(err){
        return []
    }
}

export default async function SinglePost({params}:{params: {slug: string}}){
    const post = await getPostSlug(params.slug)
    return (
        <div>
            <PostDetailContainer post={post[0]} />
        </div>
    )
}