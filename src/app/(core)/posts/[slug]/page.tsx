import PostDetailContainer from "@/containers/post/detail/post.detail.container";
import React from "react";

const getPostSlug = async (slug:string) => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/post/get?action=get&slug=' + slug, {cache: 'no-store'})
        const {ok,data} = await res.json()

        if (ok) return data
        else return []
    }catch(err){
        return []
    }
}

const getViewer = async (id:string) => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/post/view?postId=' + id)

        const {ok} = await res.json()
        return ok


    }catch(err){
        return false
    }
}

export default async function SinglePost({params}:{params: {slug: string}}){
    const post = await getPostSlug(params.slug)
    const viewer = await getViewer(post[0]?.id)
    return (
        <div>
            <PostDetailContainer post={post[0]} />
        </div>
    )
}