import CommentListContainer from "@/containers/comment/comment.list.component";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const getComments = async () => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/comment/get?action=all', {cache: 'no-store'})

        const {ok, data} = await res.json()

        if (ok) return data
        else return []

    }catch(err){
        return []
    }
}

export default async function CommentListPage(){
    const comments = await getComments()

    const {user} = await getServerSession(authOptions)

    if (user?.role !== 'admin' || user?.role !== 'editor'){
        redirect('/')
    }
    return (
        <div>
            <CommentListContainer comments={comments} />
        </div>
    )
}