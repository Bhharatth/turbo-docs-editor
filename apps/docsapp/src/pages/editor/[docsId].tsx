import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Quill } from "quill";
import { api } from "@/utils/api";
import "quill/dist/quill.snow.css";
import { appendFile } from 'fs';
import {useRecoilState}  from 'recoil'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { NextPage } from "next";
import { any, number } from 'zod';
import { doc } from 'prettier';
import { docValidationSchema } from '@/common/authSchema';
import { error } from 'console';
import { DeleteButtonState, EditButtonState, deleteButtonState, editButtonState } from '@gdocs/recoilstore';

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
  const [deleteButtonStateData, setDeleteButtonState]  = useRecoilState(deleteButtonState)
  
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
      alert(error);
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
        })
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



  const handleSave = async (e:any) => {
    e.preventDefault();
    const delta = quill?.getContents();
    if (!delta) {
      console.error('Quill content is empty');
      return;
    }
    const res = await createDocs.mutate({
      name: "new docs1",
      quillContent: delta.ops.map((item) => ({
        insert: typeof item.insert === 'string' ? item.insert : '',
        attributes: item.attributes || {},
      })),
      createdById: userId || "",
    });
  }

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
        name: "updated doc",
        quillContent: delta.ops.map((item) => ({
          insert: typeof item.insert === 'string' ? item.insert : '',
          attributes: item.attributes || {},
        })),
      }
    });
    refetchDocs();
  }

  const docIdToDelete = "8";

  async function deleteDoc(docsId: string){
    try {
      const response = await api.post.deleteQuillDoc.useMutation({
        docsId: docIdToDelete,
      });
      
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  }

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
    quill?.setContents(fetchedData);
  }
  ), [quill, fetchedData]



  return (
    <div className='relative'>
      <div className='z-1'>

      </div>
      <div className="container">
        <div id="editor-wrapper" ref={wrapperRef}></div>
      </div>
      <button onClick={handleSave} >save</button>
      <button onClick={handleUpdate} >update doc</button>
    </div>

  )
}

export default Texteditor