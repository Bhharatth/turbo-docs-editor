// import * as React from 'react';
// import  { useRef, useState } from 'react';
// import * as Dialog from '@radix-ui/react-dialog';
// import { Cross2Icon } from '@radix-ui/react-icons';
// import { savehandlerState } from '@gdocs/recoilstore';
// import { useRecoilState } from 'recoil';

// const DialogBox = () => {
 
//   const [saveState, setSaveState] = useRecoilState(savehandlerState);
//   const [currentName, setCurrentName] = useState("");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
  

//   const handleSaves=(newValues:any)=>{
    
//     setSaveState({
//       ...saveState,
//       clicked: false,
//       docName: currentName || "",
//       saveDoc: true,
//     });
//   };
  

  
//   if (saveState.clicked) {
//     return (
//       <div className="fixed top-0 left-0 right-0 bg-black bg-opacity-60 flex items-center justify-center h-screen z-10">
//         <div className="bg-white p-6 rounded shadow-lg max-w-md">
//           <h2 className="text-2xl font-bold mb-4">Edit Document Name</h2>
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//             Document Name:
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="name"
//             type="text"
//             placeholder="Pedro Duarte"
//             value={currentName}
//             onChange={(e) => setCurrentName(e.target.value)}
//           />
//           <div className="mt-4 flex justify-end">
//             <button
//               className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               onClick={handleSaves}
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return null;
// };


// export default DialogBox;
