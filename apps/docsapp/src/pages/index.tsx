import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "@/utils/api";
import FileICon from "@gdocs/ui/components/plugins/fileIcon";
import DialogBox from "@gdocs/ui/components/plugins/dialogBox";
import DeleteDialogBox from "@gdocs/ui/components/plugins/deleteDialogBox";
import { useRouter } from 'next/router';
import { HomeButtonState, LogoutButtonState, deleteButtonState, editButtonState, newTabButtonState, savehandlerState, userState } from "@gdocs/recoilstore";
import { useRecoilValue, useRecoilState } from "recoil";
import { useEffect } from "react";
export default function Home() {
  const { data: sessionData } = useSession();
  const [newTabState, setNewTabState] = useRecoilState(newTabButtonState);
  const editButtonId = useRecoilValue(editButtonState) || "";
  const deleteButtonId = useRecoilValue(deleteButtonState) || "";
  const [saveState, setSaveState] = useRecoilState(savehandlerState);
  const [deleteButtonStateData, setDeleteButtonState] = useRecoilState(deleteButtonState)
  const [homeButtonHandler, setHomeButtonHandler] = useRecoilState(HomeButtonState);
  const [logoutHandler, setLogoutHandler] = useRecoilState(LogoutButtonState)
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  const session = useSession();

  //  console.log(session)
  const loaderNumber = [1, 2, 3, 4]

  const handlePopup = () => {
    setSaveState({
      clicked: true,
      docName: null,
      saveDoc: false,
    })
  }
  useEffect(() => {
    setDeleteButtonState({
      ...deleteButtonStateData,
      clicked: false,
      openPopup: false,
    });



  }, []);

  useEffect(() => {
    setUser({
      user: session.data?.user.email,
      email: session.data?.user.email
    });
  }, [session || router]);

  useEffect(() => {
    setHomeButtonHandler({
      clicked: false
    })

  }, [])

  useEffect(() => {
    if (newTabState.newTab === true) {
      router.push("/editor/new");
    }

    if (newTabState.newTab !== false) {
      setNewTabState({
        clicked: false,
        newTab: false,
      })
    }
  }, [newTabState, router]);

  const handleOperationClicked = () => {
    if (editButtonId.clicked && editButtonId.data !== null) {
      router.push(`/editor/${editButtonId.data}`)
    }
    
  };


  useEffect(() => {
    handleOperationClicked()
  }, [editButtonId.clicked, deleteButtonId.clicked]);


  useEffect(() => {
    if (saveState.saveDoc) {
      handleCreateNewDoc();
    }


  }, [saveState])




  const handleCreateNewDoc = () => {
    router.push("/editor/new")
  };



  const { mutate: deleteDocs, isLoading: deletingDoc } = api.post.deleteQuillDoc.useMutation({
    onSuccess: async () => {
      console.log("doc deleted successfully")
    }
  });


  useEffect(() => {
    function deleteDocument(docId: string) {
      deleteDocs({
        docsId: parseInt(docId)
      })
    }

    if (deleteButtonStateData.data && deleteButtonStateData.openPopup) {
      deleteDocument(deleteButtonStateData.data)
    }

  }, [deleteButtonStateData.openPopup])


  const {
    data: getDocs,
    isLoading: loadingQuillDocs,
  } = api.post.getQuillDocs.useQuery();


  useEffect(() => {
    if (logoutHandler.clicked === true) {
      signOut();
    }

  }, [logoutHandler]);



  useEffect(()=> {
    if(!sessionData){
      console.log("no sessiondata");
      if (typeof window !== 'undefined') {
        router.push("/signuppage")
      }
      return
    }

  },[])
 
  


  return (

    <div className="lg:max-h-screen flex flex-wrap">



      <div className="flex flex-row bg-grey border border-solid border-gray-300 rounded cursor-pointer overflow-hidden relative mt-5 mx-5 mb-10 p-4 w-1/6 h-100%">
        <div className="flex mt-n4 overflow-hidden pt-4 whitespace-nowrap w-25% h-90% align-middle justify-center" >
          <img className="bg-yellow-50" src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png" alt="add doc" onClick={handlePopup} />
        </div>
      </div>
      {deleteButtonStateData && <DeleteDialogBox />}
      <DialogBox />




      {/* Map over the items array */}
      {loadingQuillDocs && loaderNumber.map(number => (
        <div key={number} className="bg-white border border-solid border-gray-300 rounded cursor-pointer overflow-hidden relative mb-10 mt-5 ml-5 w-1/6 h-32px pl-5 flex justify-center items-center">
          <div role="status">
            <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ))}
      {getDocs?.map((item) => (

        <FileICon key={item.id} id={item.id} fileId={item.id} createdAt={item.createdAt} fileName={item.name}
        />
      ))}
    </div>
  );
}











