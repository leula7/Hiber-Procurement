import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import '../../css/index.css';
import "tachyons"
import { useSelector } from "react-redux";
import { getDocument } from "../../api/Supplier";


function GetDocuments() {
  const [documents, setDocuments] = useState([]);
  const {authData} = useSelector((state)=>state.authReducer);
  
  // const [setSelectedDocument] = useState({
  //   filename: "",
  //   originalname: "",
  //   fileType: ""
  // });

  const navigate = useNavigate();

//Get Thechnical Document
  useEffect(() => {
    const getTechnicalDocment = async()=>{
     try {
       const getDocuments = await getDocument(authData.user_id,authData.position);
       setDocuments(getDocuments.data.response);
     } catch (error) {
      alert(error.message);
     }
    }
     getTechnicalDocment();
  }, [authData.user_id, authData.position, setDocuments]);

  const ReadFile = (document) => {
    navigate("/view", { state: document} );
  };

  return (
    <div className="">
      <Header />
      <h1>Document List</h1>
      {documents.map((document) =>{
        return (
        <div key={document.file_name} className="bg-light-green dib br3 ma2 pa3 bw2 shadow-5">
        <img src="/pdfFiles.png" width="200" height="200" alt="" />
        <h3>{document.file_name}</h3>
        <button className="view" 
                onClick={() => ReadFile(document)}> Review  
        </button>
      </div>)
      })
      }
      <Footer />
    </div>
  );
}

export default GetDocuments;
