import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { LiaFileSolid } from "react-icons/lia";
import { MdOutlineDelete } from "react-icons/md";
import { api } from "@/utils/api";
import FileICon from "@gdocs/ui/components/plugins/fileIcon";
import { useRouter } from 'next/router';
import { DeleteButtonState, EditButtonState, deleteButtonState, editButtonState } from "@gdocs/recoilstore";
import { useRecoilValue, useRecoilState } from "recoil";
import { useEffect } from "react";
import { Field } from "@radix-ui/react-form";
// import { FileIcon } from "@radix-ui/react-icons";
export default function Home() {

 const editButtonId = useRecoilValue(editButtonState) || "";
 const deleteButtonId = useRecoilValue(deleteButtonState) || "";
 console.log("edit",editButtonId.clicked)
 console.log("delete",deleteButtonId.clicked);
 const router = useRouter();




const handleOperationClicked =()=> {
  if(editButtonId.clicked && editButtonId.data !== null){
    router.push(`/editor/${editButtonId.data}`)
  }
  // resetEditButtonState();
};


 useEffect(() => {
  handleOperationClicked()

 
  



}, [editButtonId.clicked, deleteButtonId.clicked]);



  



  const handleCreateNewDoc = ()=> {
    router.push("/editor/new")

  };

 

  const {mutate: deleteDocs, isLoading: deletingDoc} = api.post.deleteQuillDoc.useMutation({
    onSuccess: async()=> {
      console.log("doc deleted successfully")
    }
  });

  function deleteDocument(docId: string){
    deleteDocs({
      docsId: docId
    })
  }
  

  const getDocs = api.post.getQuillDocs.useQuery();
  console.log(getDocs.data);

  return (
    <div className="lg:max-h-screen flex flex-wrap">
      
      <div className="flex flex-row bg-grey border border-solid border-gray-300 rounded cursor-pointer overflow-hidden relative mt-5 mx-5 mb-10 p-4 w-1/6 h-100%">
        <div className="flex mt-n4 overflow-hidden pt-4 whitespace-nowrap w-25% h-90% align-middle justify-center" >
          <img className="bg-yellow-50" src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png" alt="add doc" onClick={handleCreateNewDoc}/>
        </div>
      </div>

      {/* Map over the items array */}
      {getDocs.data?.map((item) => (
       
        <FileICon key={item.id} id={item.id} fileId={item.id} createdAt={item.createdAt}  fileName={item.name} 
        />
      ))}
    </div>
  );
}





// const hello = api.post.hello.useQuery({ text: "from tRPC" });



// const { data: secretMessage } = api.post.getSecretMessage.useQuery(
//   undefined, // no input
//   { enabled: sessionData?.user !== undefined }
// );







