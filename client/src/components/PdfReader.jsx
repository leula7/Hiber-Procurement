
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import PdfFile  from "./document.pdf"
// Ensure pdf.js worker is correctly loaded
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfReader = ({ path }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const nextPage = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

  const previousPage = () => {
    setPageNumber(prevPageNumber => prevPageNumber - 1);
  };

  return (
    <div>
      <button onClick={previousPage} disabled={pageNumber <= 1}>Previous</button>
      <button onClick={nextPage} disabled={pageNumber >= numPages}>Next</button>
      <Document
        file={PdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  );
};

export default PdfReader;