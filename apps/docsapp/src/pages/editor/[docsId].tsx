import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Quill } from "quill";
import { api } from "@/utils/api";
import "quill/dist/quill.snow.css";
import { appendFile } from 'fs';
import {useRecoilState}  from 'recoil'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { NextPage } from "next";
import { docValidationSchema } from '@/common/authSchema';
import { DeleteButtonState, EditButtonState, deleteButtonState, editButtonState,  newTabButtonState, saveHandlerButtonState, savehandlerState, updateHandlerButtonState } from '@gdocs/recoilstore';

type Docstype = {
  insert: any;
  attributes: any;
}[]


const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

const Texteditor: NextPage = (): JSX.Element => {

  const [editButtonClicked, setEditButtonClicked] = useRecoilState(editButtonState);
  const [deleteButtonStateData, setDeleteButtonState]  = useRecoilState(deleteButtonState);
  const [savehandler, setSaveHandler] = useRecoilState(saveHandlerButtonState);
  const [updateHandler, setUpdateHandler] = useRecoilState(updateHandlerButtonState);
  const { data: sessionData } = useSession();

  const [newTabState, setNewTabState] = useRecoilState(newTabButtonState);
  const [saveState, setSaveState] = useRecoilState(savehandlerState);

  useEffect(()=> {
    const handleState=(prev:any)=> {
      setSaveState({
        ...prev,
        saveDoc:false
      })
    }
    handleState(saveState);

  },[])
  

 

  useEffect(()=> {

  },[saveState.clicked])


  
  useEffect(()=> {
    if(newTabState.newTab === true){
      router.push("/");
    }
  
    if(newTabState.newTab !== false){
      setNewTabState({
        clicked: false,
        newTab: false,
      })
    };

    setDeleteButtonState({
      ...deleteButtonStateData,
      clicked: false,
      openPopup: false,
    });
  },[newTabState]);
  
  const handleDeleteButtonClick =()=> {
   setDeleteButtonState((prevState: DeleteButtonState)=> ({
     ...prevState,
     clicked: true,
     data: null
   }));
 };
 
  const resetEditButtonState =()=> {
   setEditButtonClicked((prevState: EditButtonState)=> ({
     ...prevState,
     clicked: false, // Setting it to false as it seems to be a reset
     data: null
   }));
 };

 useEffect(()=> {
  handleDeleteButtonClick();
  resetEditButtonState();

 },[])


  const router = useRouter();
  const { docsId } = router.query;
  const formatedDocId: string = typeof docsId === 'string' ? docsId : '';




  const session = useSession();
  const userId = session.data?.user.id;
  console.log(userId)

  const [quill, setQuill] = useState<Quill | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [currentQuill, setCurrentQuill] = useState<Quill | null>(null);
  const [singleDoc, setSingleDoc] = useState<typeof docValidationSchema | null>(null);
  const [fetchedData, setFetchedData] = useState<Docstype | null>(null);




  const { data: docs, refetch: refetchDocs } = api.post.getSingleQuillDoc.useQuery({
    docId: formatedDocId,
  });



  const createDocs = api.post.saveQuillDocs.useMutation({
    onSuccess: (res) => {
      console.log("doc created successfully", res);
      router.push(`/editor/${res.id}`)
    },
    onError: (error) => {
      alert(error);
      console.log(error)
    }
  });


  const updateDocs = api.post.updateQuillDoc.useMutation({
    onSuccess: (res) => {
      console.log("doc updated successfully", res);
      const refetchNewDoc = api.post.getSingleQuillDoc.useQuery({
         docId: res.id.toString()
      });
    
     refetchDocs();
    },
    onError: (error) => {
      console.log(error)
    }
  });

  // const deleteDocs = api.post.deleteQuillDoc.useMutation({

  // })


  useEffect(() => {
    import('quill').then((Quill) => {
      const wrapper = wrapperRef.current;

      if (wrapper) {
        wrapper.innerHTML = '';
        const editor = document.createElement('div');
        wrapper.appendChild(editor);

        const q = new Quill.default(editor, {
          theme: 'snow',
          modules: { toolbar: TOOLBAR_OPTIONS },
        });

        q.on('text-change', (delta, oldDelta, source) => {
          if (source === 'user') {
          }
        });
        setQuill(q);
      }
    });
  }, []);


  // const fetchDoc = api.post.getSingleQuillDoc.useQuery();
  // useEffect(() => {
  //   if (docId) {
  //     // Fetch the document data based on the docId
  //     fetchDoc.refetch({id:docId})
  //   }
  // }, [docId]);

  const handleSave = async (e?: React.MouseEvent<HTMLButtonElement> | any) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    console.log('handle save working')
    const delta = quill?.getContents();
    if(saveState.docName){
      console.log(saveState.docName)
     
    
    if (!delta) {
      console.error('Quill content is empty');
      return;
    };
    console.log("quill content is not empty")
    const res = await createDocs.mutate({
      name: saveState.docName,
      quillContent: delta.ops.map((item) => ({
        insert: typeof item.insert === 'string' ? item.insert : '',
        attributes: item.attributes || {},
      })),
      createdById: userId || "",
    });
    console.log(" success => response:",res);
  };
}

  useEffect(()=> {
    if (savehandler.clicked) {
      
      handleSave();
      console.log('clicked success, going to set as false');

      setSaveHandler({
        clicked: false
      });
    };
    console.log('operation success')
  },[savehandler.clicked]);

 



 

 

  useEffect(()=> {
    const handleUpdate = async () => {
      const delta = quill?.getContents();
  
      if (!delta) {
        console.log('Quill content is empty');
        return;
      };
  
      let convertedDocsId: string;
  
      if (Array.isArray(docsId)) {
        convertedDocsId = docsId.join(',');
      } else {
        convertedDocsId = docsId || ''; // Use an empty string as a default if docsId is undefined
      }
      const res = await updateDocs.mutate({
        docId:  convertedDocsId,
        updatedData: {
          // name: "updated doc",
          quillContent: delta.ops.map((item) => ({
            insert: typeof item.insert === 'string' ? item.insert : '',
            attributes: item.attributes || {},
          })),
        }
      });
      refetchDocs();
    };
    if(updateHandler.clicked){
      handleUpdate();

    }

  },[updateHandler])

  // const docIdToDelete = "8";

  // async function deleteDoc(docsId: string){
  //   try {
  //     const response = await api.post.deleteQuillDoc.useMutation({
  //       docsId: docIdToDelete,
  //     });
      
  //   } catch (error) {
  //     console.error("Error deleting document:", error);
  //   }
  // }

  // useEffect(() => {
  //   if (docId !== 'new' && quill) {


  // if (docs && docs.quillContent) {
  //   Assuming docs.quillContent is an array of delta ops
  //   const quillContent = docs.quillContent.map((item) => ({
  //     insert: item.insert || '',
  //     attributes: item.attributes || {},
  //   }));

  //   quill.setContents(quillContent);

  //   Optionally, you can disable the editor after setting the contents
  //   quill.disable();
  // }
  //   }
  // }, [docId, quill]);



  useEffect(() => {
    if (docs) {
      setFetchedData(docs);
    }
  }, [docs, updateDocs]);
  console.log(fetchedData)


  useEffect(() => {
    // if(quill && fetchedData){
    //   const quillContent = fetchedData[0].map((item:any)=> ({
    //     insert: item.insert || '',
    //     attributes: item.attributes || {},
    //   }))
    // }
    
    // @ts-ignore
    quill?.setContents(fetchedData);
  }
  ), [quill, fetchedData]

  
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
    <div className='relative'>
  
      <div className='z-0'>

      </div>
      <div className="container">
        <div id="editor-wrapper" ref={wrapperRef}></div>
      </div>
       {/* <button onClick={handleSave} >save</button>  */}
      {/* <button onClick={handleUpdate} >update doc</button> */}
    </div>

  )
}

export default Texteditor