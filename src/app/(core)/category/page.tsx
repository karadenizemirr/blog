import { fetchGetAllCategory } from "@/app/(user)/user/post/add/page";
import AdminCategoryContainer from "@/containers/category/admin.category";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function CategoryPage(){
    const categories = await fetchGetAllCategory()
    const {user} = await getServerSession(authOptions)


    if (user?.role !== 'editor' && user?.role !== 'admin'){
        redirect('/')
    }

    return (
        <div>
            <AdminCategoryContainer data={categories} />
        </div>
    )
}