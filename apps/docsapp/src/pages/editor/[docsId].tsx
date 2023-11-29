import React from 'react';
import { useRouter } from 'next/router';
import Navbar from 'ui/components/Navbar';
import Texteditor from 'ui/components/TextEditor';

const DocumentEditor = () => {
  const router = useRouter();
  const { docId } = router.query;

  // If docId exists, load the document for editing
  // If docId doesn't exist, treat it as a new document creation page

  return (
    <div>
      <h1>{docId ? `Edit Document ${docId}` : 'Create New Document'}</h1>
      <Texteditor />
    </div>
  );
};

export default DocumentEditor;