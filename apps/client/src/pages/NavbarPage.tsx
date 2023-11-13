

import * as React from "react";
import { BiAlignJustify } from "react-icons/bi";
import { SiGoogledocs } from "react-icons/si";
import { FaSearch } from "react-icons/fa";
import { CgMenuGridO } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import { FaShare } from "react-icons/fa";
import MenubarDemo from "./Menubar";

const NavbarPage=()=> {
    return (
        
        <div className="flex flex-row justify-between items-center w-full h-30 bg-gray-100 box-border z-20">
        <div className="flex flex-row justify-between align-center">
                {/* <div className=" rounded-full p-2 shadow-md ml-10">
                    <BiAlignJustify className="text-xl mt-auto " />
                </div> */}
                <MenubarDemo />
            </div>
            <div className="flex flex-row">
    <div className="hidden md:block"> 
        <div className="flex items-center bg-white border border-gray-300 rounded-full p-3 shadow-md ">
            <FaSearch className="text-gray-500" />
            <input
                type="text"
                placeholder="Search here"
                className="flex-grow ml-3 outline-none"
            />
        </div>
    </div>

    <div className="md:hidden"> 
        <div className="flex items-center bg-white border border-gray-300 rounded-full p-3 shadow-md ">
            <FaSearch className="text-gray-500" />
        </div>
    </div>
</div>

            <div className="flex flex-row justify-between p-5 bg-gray-100">
      <div className="m-2 p-2 rounded-full bg-white shadow-md">
        <FaShare className="text-blue-500" />
      </div>
      <div className="m-2 p-2 rounded-full bg-white shadow-md">
        <SiGoogledocs className="text-blue-500" />
      </div>
      <div className="m-2 p-2 rounded-full bg-white shadow-md">
        <CgMenuGridO className="text-blue-500" />
      </div>
      <div className="m-2 p-2 rounded-full bg-white shadow-md">
        <CgProfile className="text-black bg-blue-300 p-2 rounded-full" ></CgProfile>
      </div>
    </div>
        </div>
    );
}

export default NavbarPage
