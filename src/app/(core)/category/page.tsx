import { fetchGetAllCategory } from "@/app/(user)/user/post/add/page";
import AdminCategoryContainer from "@/containers/category/admin.category";
import React from "react";

export default async function CategoryPage(){
    const categories = await fetchGetAllCategory()

    return (
        <div>
            <AdminCategoryContainer data={categories} />
        </div>
    )
}