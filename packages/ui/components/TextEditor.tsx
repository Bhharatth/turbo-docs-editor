import React, { useCallback, useEffect, useRef, useState } from 'react';
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { appendFile } from 'fs';
// import { Button, Card,  Newbutton } from 'ui';
// import '@/styles/globals.css'

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

const Texteditor = () => {

  const [quill, setQuill] = useState<Quill | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [currentQuill, setCurrentQuill] = useState<Quill | null>(null);






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

  const handleSave = {
     

  }

  

  console.log(quill)

  return (
    <div className='relative'>
      <div className='z-1'>

      </div>
      <div className="container">
        <div  id="editor-wrapper" ref={wrapperRef}></div>
      </div>
      <button onClick={handleSave}>save</button>
    </div>

  )
}

export default Texteditor