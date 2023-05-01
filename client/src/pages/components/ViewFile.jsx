import React, { useState } from "react";
import { Document, Page } from "react-pdf";

function ViewFile() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file="/../backend/uploads/supplier/4.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <button disabled={pageNumber <= 1} onClick={() => setPageNumber(pageNumber - 1)}>
        Previous
      </button>
      <button disabled={pageNumber >= numPages} onClick={() => setPageNumber(pageNumber + 1)}>
        Next
      </button>
    </div>
  );
}

export default ViewFile;
