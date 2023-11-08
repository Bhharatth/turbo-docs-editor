import React, { useCallback, useEffect, useRef, useState } from 'react';
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Button, Card, NavBar, Newbutton } from 'ui';

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
            q.disable();
            q.setText('Loading...');
            setQuill(q);
          }
        });
      }, []);

    return (
        <div className="container">
          <NavBar/>
        {/* <div id="editor-wrapper" ref={wrapperRef}></div> */}
   
      </div>
    )
}

export default Texteditor