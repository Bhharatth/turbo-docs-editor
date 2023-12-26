import * as React from 'react';
import  { useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { savehandlerState } from '@gdocs/recoilstore';
import { useRecoilState } from 'recoil';

const DialogBox = () => {
 
  const [saveState, setSaveState] = useRecoilState(savehandlerState);
  const [currentName, setCurrentName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");
  

  const handleSaves=(newValues:any)=>{
    if(!currentName){
      setError("Please enter a name");
      return;

    }
    setError("");
    setSaveState({
      ...saveState,
      clicked: false,
      docName: currentName,
      saveDoc: true,
    });
  };

  const handleCancel=()=> {
  setSaveState({
    clicked: false,
    saveDoc: false,
    docName: null
  });
  setError("")
  }
  

  
  if (saveState.clicked) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-black bg-opacity-60 flex items-center justify-center h-screen z-10">
        <div className="bg-white p-6 rounded shadow-lg max-w-md">
          <h2 className="text-2xl font-bold mb-4">Edit Document Name</h2>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Document Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="New Doc"
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
          />
           {error && <p className="text-orange-500 text-sm mt-2">{error}</p>}
          <div className="mt-4 flex justify-between">
          <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleCancel}
            >
              cancel
            </button>

            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSaves}
            >
              Create
            </button>
          
          </div>
        </div>
      </div>
    );
  }

  return null;
};


export default DialogBox;
