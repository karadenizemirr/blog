import CategoryPostContainer from "@/containers/category/category.posts.container";
import React from "react";

const getCategoryPost = async (slug:string) => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/category/get?action=post&slug=' + slug, {method:'GET', cache: 'default'})

        const {ok,data} = await res.json()

        if (ok) return data
        else return []

    }catch(err){
        return []
    }
}

export default async function CategoryPosts({params}:{params:{slug: string}}){
    const posts = await getCategoryPost(params.slug)

    console.log(posts)
    return (
        <div>
            <CategoryPostContainer post={posts} />
        </div>
    )
}