import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { LiaFileSolid } from "react-icons/lia";
import { MdOutlineDelete } from "react-icons/md";
import { api } from "@/utils/api";
import FileICon from "ui/components/plugins/fileIcon";
// import { FileIcon } from "@radix-ui/react-icons";

export default function Home() {
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const items = [
    { id: 1, createdAt: "2022-01-01", createdBy: "John", fileName: "Document 1" },
    { id: 2, createdAt: "2022-01-02", createdBy: "Jane", fileName: "Document 2" },
    { id: 2, createdAt: "2022-01-02", createdBy: "Jane", fileName: "Document 2" },
    { id: 2, createdAt: "2022-01-02", createdBy: "Jane", fileName: "Document 2" },
    { id: 2, createdAt: "2022-01-02", createdBy: "Jane", fileName: "Document 2" },
    { id: 2, createdAt: "2022-01-02", createdBy: "Jane", fileName: "Document 2" },
    { id: 2, createdAt: "2022-01-02", createdBy: "Jane", fileName: "Document 2" },
    { id: 2, createdAt: "2022-01-02", createdBy: "Jane", fileName: "Document 2" },
    { id: 2, createdAt: "2022-01-02", createdBy: "Jane", fileName: "Document 2" },
    { id: 2, createdAt: "2022-01-02", createdBy: "Jane", fileName: "Document 2" },
    // Add more items as needed
  ];

  const getDocs = api.post.getQuillDocs.useQuery();
  console.log(getDocs.data?.map);

  return (
    <div className="lg:max-h-screen flex flex-wrap">
      <div className="flex flex-row bg-grey border border-solid border-gray-300 rounded cursor-pointer overflow-hidden relative mt-5 mx-5 mb-10 p-4 w-1/6 h-100%">
        <div className="flex mt-n4 overflow-hidden pt-4 whitespace-nowrap w-25% h-90% align-middle justify-center">
          <img className="bg-yellow-50" src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png" alt="add doc" />
        </div>
      </div>

      {/* Map over the items array */}
      {getDocs.data?.map((item) => (
        // <div key={item.id} className="bg-white border border-solid border-gray-300 rounded cursor-pointer overflow-hidden relative mb-10 mt-5 ml-5 w-1/6 h-1/6 pl-5">
        //   <LiaFileSolid className="w-full h-full border border-solid text-gray-600 border-gray-300 rounded sm:border-0 md:border-1 lg:border-1" />

        //   <div className="hidden sm:flex flex-row items-center justify-between mt-2 text-sm border-gray-300">
        //     <div>Created at: {item.createdAt}</div>
        //     <div>Created by: {item.createdBy}</div>
        //   </div>

        //   <div className="hidden sm:block sm:text-xs text-lg font-semibold mt-2">
        //     {item.fileName}
        //   </div>

        //   <div className="hidden sm:flex flex-row mt-2">
        //     <button className="text-red11 bg-red-500 text-white hover:bg-red5 focus:shadow-red7 inline-flex h-[30px] items-center justify-center rounded-[4px] px-[10px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px mb-3">
        //     <MdOutlineDelete />
        //     </button>
        //   </div>
        // </div>
        <FileICon id={item.id} createdAt={item.createdAt}  fileName={item.name}/>
      ))}
    </div>
  );
}





// const hello = api.post.hello.useQuery({ text: "from tRPC" });



// const { data: secretMessage } = api.post.getSecretMessage.useQuery(
//   undefined, // no input
//   { enabled: sessionData?.user !== undefined }
// );







