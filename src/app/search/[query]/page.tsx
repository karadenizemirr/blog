import SearchContainer from "@/containers/search.container";
import React from "react";


const getSearch = async (query:string) => {
    try{
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/search?query=' + query, {method:'GET', cache:'default'})

        const {ok, data} = await res.json()

        if (ok) return data
        else return []
    }catch(err){
        return []
    }
}

export default async function SearchResult({ params }: { params: { query: string } }) {
    const search = await getSearch(params.query)

    return (
        <div className="container mx-auto w-full min-h-[60vh]" >
            <SearchContainer result={search} />
        </div>
    )
}