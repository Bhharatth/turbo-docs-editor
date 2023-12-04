import React, { useCallback, useEffect, useRef, useState } from 'react';
import Quill from "quill";
import {  api } from "@/utils/api";
import "quill/dist/quill.snow.css";
import { appendFile } from 'fs';
import { signOut, useSession } from "next-auth/react";
import { NextPage } from "next";


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

const Texteditor:NextPage=():JSX.Element=>  {

    const session = useSession();
    const userId = session.data?.user.id
    console.log(userId)

  const [quill, setQuill] = useState<Quill | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [currentQuill, setCurrentQuill] = useState<string>("1");





const createDocs = api.post.saveQuillDocs.useMutation({
    onSuccess: (res)=> {
        console.log("doc created successfully", res)
    },
    onError: (error)=> {
        alert(error);
        console.log(error)
    }
})



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
       
        q.on('text-change',(delta, oldDelta, source)=>{
            if(source === 'user'){
                console.log(delta)
            }
        })
        setQuill(q);
      }
    });
  }, []);

  //   console.log(delta1)
  
  const handleSave = async()=> {
      const  delta = quill?.getContents();
      if (!delta) {
        console.error('Quill content is empty');
        return;
      }
    const res = await createDocs.mutate({
       name: "new docs",
       quillContent: delta.ops.map((item) => ({
        insert: typeof item.insert === 'string' ? item.insert : '',
      attributes: item.attributes || {},
      })),
       createdById: userId || "",
      });
  }

//   console.log(quill)

  return (
    <div className='relative'>
      <div className='z-1'>

      </div>
      <div className="container">
        <div  id="editor-wrapper" ref={wrapperRef}></div>
      </div>
      <button onClick={handleSave} >save</button>
    </div>

  )
}

export default Texteditor