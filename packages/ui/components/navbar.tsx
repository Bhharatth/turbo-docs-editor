import * as React from "react";
import { BiAlignJustify } from "react-icons/bi";
import { SiGoogledocs } from "react-icons/si";
import { FaSearch } from "react-icons/fa";
import { CgMenuGridO } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";

export function NavBar() {
    return (
        <div className="flex flex-row justify-between align-center w-25 mt-8 w-">
            <div className="flex flex-row ">
                <div className=" rounded-full p-2 shadow-md h-25">
                    <BiAlignJustify className="text-xl mt-5" />
                </div>
                <div><SiGoogledocs /></div>
            </div>
            <div className="flex flex-row">
                <div>  <div className="flex items-center bg-white border border-gray-300 rounded-full p-3 shadow-md">
                    <FaSearch className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search Google"
                        className="flex-grow ml-3 outline-none"
                    />
                </div>
                </div>
            </div>
            <div className="flex flex-row">
                <div> <CgMenuGridO /></div>
                <div><CgProfile /></div>
            </div>
        </div>
    );
}
