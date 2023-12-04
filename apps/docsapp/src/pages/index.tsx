import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { LiaFileSolid } from "react-icons/lia";
import { MdOutlineDelete } from "react-icons/md";
import { api } from "@/utils/api";
import FileICon from "ui/components/plugins/fileIcon";
import { useRouter } from 'next/router';
// import { FileIcon } from "@radix-ui/react-icons";

export default function Home() {
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const router = useRouter();

  const handleCreateNewDoc = ()=> {
    router.push("/editor/new")

  };

  const handleEditDoc =(docId: number):void=> {
    console.log("from handle edit doc",docId)
    router.push(`/editor/${docId}`)

  }


  const getDocs = api.post.getQuillDocs.useQuery();
  console.log(getDocs.data);

  return (
    <div className="lg:max-h-screen flex flex-wrap">
      <div className="flex flex-row bg-grey border border-solid border-gray-300 rounded cursor-pointer overflow-hidden relative mt-5 mx-5 mb-10 p-4 w-1/6 h-100%">
        <div className="flex mt-n4 overflow-hidden pt-4 whitespace-nowrap w-25% h-90% align-middle justify-center" onClick={handleCreateNewDoc}>
          <img className="bg-yellow-50" src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png" alt="add doc" />
        </div>
      </div>

      {/* Map over the items array */}
      {getDocs.data?.map((item) => (
       
        <FileICon id={item.id} fileId={item.id} createdAt={item.createdAt}  fileName={item.name} onEditClick={() => handleEditDoc(item.id)}/>
      ))}
    </div>
  );
}





// const hello = api.post.hello.useQuery({ text: "from tRPC" });



// const { data: secretMessage } = api.post.getSecretMessage.useQuery(
//   undefined, // no input
//   { enabled: sessionData?.user !== undefined }
// );







