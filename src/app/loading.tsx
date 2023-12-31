import React from "react";

export default function Loading() {
    return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <div className="rounded-full h-20 w-20 bg-primary animate-ping"></div>
            </div>
        </div>
    )
}