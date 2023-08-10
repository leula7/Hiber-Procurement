import React, { useEffect } from 'react';
import { Document, Page } from 'react-pdf';

const ReplacmentRequest = () => {
  useEffect(() => {
    // Get the iframe element by its id
    const pdfUrl = 'http://192.168.43.3:3000/uploads/bids/pis.pdf';
    const pdfViewer = document.getElementById('pdfViewer');

    // Set the src attribute of the iframe to the PDF URL
    pdfViewer.src = pdfUrl;
  }, []);

  return (
    <div>
      <iframe id="pdfViewer" width="100%" height="500px" title="PDF Viewer"></iframe>
    </div>
  );
};

export default ReplacmentRequest;
