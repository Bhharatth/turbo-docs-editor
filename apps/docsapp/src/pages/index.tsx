import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "@/utils/api";
import FileICon from "@gdocs/ui/components/plugins/fileIcon";
import DialogBox from "@gdocs/ui/components/plugins/dialogBox";
import DeleteDialogBox from "@gdocs/ui/components/plugins/deleteDialogBox";
import { useRouter } from 'next/router';
import {  deleteButtonState, editButtonState, newTabButtonState, savehandlerState, userState} from "@gdocs/recoilstore";
import { useRecoilValue, useRecoilState } from "recoil";
import { useEffect } from "react";
export default function Home() {
  const [newTabState, setNewTabState] = useRecoilState(newTabButtonState);
 const editButtonId = useRecoilValue(editButtonState) || "";
 const deleteButtonId = useRecoilValue(deleteButtonState) || "";
 const [saveState, setSaveState] = useRecoilState(savehandlerState);
 const [deleteButtonStateData, setDeleteButtonState]  = useRecoilState(deleteButtonState)
 const [user, setUser] = useRecoilState(userState);
 const router = useRouter();

 const session = useSession();

//  console.log(session)

 const handlePopup=()=> {
  setSaveState({
    clicked: true,
    docName: null,
    saveDoc: false,
  })
 }
 useEffect(()=> {
  setDeleteButtonState({
    ...deleteButtonStateData,
    clicked: false,
    openPopup: false,
  });

 
  
 },[]);
 
 useEffect(()=> {
  setUser({
    user: session.data?.user.email,
    email: session.data?.user.email
  });
 },[session || router]);


 useEffect(()=> {
  if(newTabState.newTab === true){
    router.push("/editor/new");
  }

  if(newTabState.newTab !== false){
    setNewTabState({
      clicked: false,
      newTab: false,
    })
  }
},[newTabState]);

const handleOperationClicked =()=> {
  if(editButtonId.clicked && editButtonId.data !== null){
    router.push(`/editor/${editButtonId.data}`)
  }
  // resetEditButtonState();
};


 useEffect(() => {
  handleOperationClicked()
}, [editButtonId.clicked, deleteButtonId.clicked]);


useEffect(()=> {
  if(saveState.saveDoc){
    handleCreateNewDoc();
  }


},[saveState])
  



  const handleCreateNewDoc = ()=> {
    router.push("/editor/new")
  };

 

  const {mutate: deleteDocs, isLoading: deletingDoc} = api.post.deleteQuillDoc.useMutation({
    onSuccess: async()=> {
      console.log("doc deleted successfully")
    }
  });


  useEffect(()=> {
    function deleteDocument(docId: string){
      deleteDocs({
        docsId: parseInt(docId)
      })
    }

    if(deleteButtonStateData.data && deleteButtonStateData.openPopup ){
      deleteDocument(deleteButtonStateData.data)
    }

  },[deleteButtonStateData.openPopup])
  

  const {
    data: getDocs,
    isLoading: loadingQuillDocs,
  } = api.post.getQuillDocs.useQuery();

  return (
    <div className="lg:max-h-screen flex flex-wrap">
   
      <div className="flex flex-row bg-grey border border-solid border-gray-300 rounded cursor-pointer overflow-hidden relative mt-5 mx-5 mb-10 p-4 w-1/6 h-100%">
        <div className="flex mt-n4 overflow-hidden pt-4 whitespace-nowrap w-25% h-90% align-middle justify-center" >
          <img className="bg-yellow-50" src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png" alt="add doc" onClick={handlePopup}/>
        </div>
      </div>
      {deleteButtonStateData &&   <DeleteDialogBox/>}
      <DialogBox/>
    
      
      

      {/* Map over the items array */}
      {getDocs?.map((item) => (
       
        <FileICon key={item.id} id={item.id} fileId={item.id} createdAt={item.createdAt}  fileName={item.name} 
        />
      ))}
    </div>
  );
}











