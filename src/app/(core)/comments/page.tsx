import CommentListContainer from "@/containers/comment/comment.list.component";
import React from "react";

const getComments = async () => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/comment/get?action=all', {cache: 'default'})

        const {ok, data} = await res.json()

        if (ok) return data
        else return []

    }catch(err){
        return []
    }
}

export default async function CommentListPage(){
    const comments = await getComments()
    return (
        <div>
            <CommentListContainer comments={comments} />
        </div>
    )
}