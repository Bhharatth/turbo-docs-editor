import * as React from 'react';
import  { useState } from 'react';
import { deleteButtonState, savehandlerState } from '@gdocs/recoilstore';
import { useRecoilState } from 'recoil';

const DeleteDialogBox = () => {
 
  const [currentName, setCurrentName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteButtonStateData, setDeleteButtonState]  = useRecoilState(deleteButtonState)
  

  const handleSaves=(newValues:any)=>{
    setDeleteButtonState({
      ...deleteButtonStateData,
      openPopup: true,
      clicked: false,
    });
  };
  
  const handleCancel=(newValues:any)=>{
    setDeleteButtonState({
      ...deleteButtonStateData,
      openPopup: false,
      clicked: false,
    });
  };
  

  
  if (deleteButtonStateData.clicked) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-black bg-opacity-60 flex items-center justify-center h-screen z-10">
        <div className="bg-white p-6 rounded shadow-lg max-w-md">
          <h2 className="text-2xl font-bold mb-4">Delete Document</h2>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          This will delete your entire document.. are you sure!
          </label>
  
         
          <div className="mt-4 flex justify-between">
    

<button
  className="bg-green-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-700"
  onClick={handleCancel}
>
  Cancel
</button>
<button
  className="bg-green-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-700"
  onClick={handleSaves}
>
  Delete
</button>

          </div>
        </div>
      </div>
    );
  }

  return null;
};


export default DeleteDialogBox;
