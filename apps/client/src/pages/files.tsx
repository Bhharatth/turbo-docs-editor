import React from 'react';
import { LiaFileSolid } from "react-icons/lia";

const files = () => {
    return (
        <div className="bg-white border border-solid border-gray-300 rounded cursor-pointer overflow-hidden relative mb-10 p-4 w-1/6 h-1/6">
            <LiaFileSolid className="w-full h-full border border-solid border-gray-300 rounded sm:border-0 md:border-1 lg:border-1" />

            <div className="hidden sm:flex flex-row items-center justify-between mt-2 text-sm text-gray-600">
                <div>Created at: [your date]</div>
                <div>Created by: [creator name]</div>
            </div>

            <div className="hidden sm:block sm:text-xs text-lg font-semibold mt-2">
                File Name
            </div>

            <div className="hidden sm:flex flex-row mt-2">
                <button className="text-red11 bg-red-500 text-white hover:bg-red5 focus:shadow-red7 inline-flex h-[30px]  items-center justify-center rounded-[4px] px-[10px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                    Delete
                </button>
            </div>
        </div>
    )
}

export default files