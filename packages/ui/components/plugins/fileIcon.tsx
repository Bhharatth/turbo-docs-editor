import React from 'react';
import { LiaFileSolid } from "react-icons/lia";
// import AlertDialogDemo from 'ui/components/plugins/alertDemo';
import { PassThrough } from 'stream';
// import ToastDemo from 'ui/components/plugins/toastDemo';
import { MdOutlineDelete } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import DropdownMenuDemo from './dropDown';
import { format } from 'date-fns';
import { useRecoilState } from 'recoil';
import { deleteButtonState, editButtonState } from '@gdocs/recoilstore';
// import { editButtonState, deleteButtonState } from '../../../recoil'


type fileProps = {
    fileId: number;
    id: number,
    createdAt: Date,
    fileName: string,
    onEditClick: (fileId: number)=> void;
    onDeleteClick: (fileId: number)=> void;
  };

  
const FileICon: React.FC<fileProps> =({ fileId, createdAt, fileName, onEditClick,onDeleteClick })=> {



  //  const handleDeleteClick = (id: string) => {
  //       alert(id);
  //   }; 

    const originalDate = createdAt
    const prettifiedDate = format(originalDate, "MMMM dd, yyyy");
    return (
        <div className="bg-white border border-solid border-gray-300 rounded cursor-pointer overflow-hidden relative mb-10 mt-5 ml-5 w-1/6 h-1/6 pl-5">
        <LiaFileSolid className="w-full h-full border border-solid text-gray-600 border-gray-300 rounded sm:border-0 md:border-1 lg:border-1" />

        <div className="hidden sm:block sm:text-xs lg:text-24px font-semibold underline mt-2">
          {fileName}
        </div>

        <div className="hidden sm:flex flex-row items-center justify-between mt-2 text-sm border-gray-300">
          <div>Created at: {prettifiedDate}</div>
        </div>

        <div className="hidden sm:flex flex-row mt-2">
          <button className="text-red11   text-black hover:bg-red5 focus:shadow-red7 inline-flex h-[30px] items-center justify-center rounded-[4px] px-[10px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px mb-3"
          >
          {/* <MdOutlineDelete /> */}
          <FiMoreVertical />
          <DropdownMenuDemo fileId={fileId}/>
          </button>
        </div>
      </div>
    )
}

export default FileICon