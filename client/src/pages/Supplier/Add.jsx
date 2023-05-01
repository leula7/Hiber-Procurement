import React, { useEffect } from "react";
import { useState } from "react";
import { Link} from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { uploadFile } from "../../api/Supplier";


const Add = (props) => {
  
  const [uploadres,setUploadresponse] = useState([]);
  const {authData} = useSelector((state)=>state.authReducer);

  const [book, setBook] = useState({
    user_id: "",
    username: "",
    avatar: "",
  });
  

  const handlePathChange = (e)=>{
    setBook({avatar: e.target.files[0]});
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
      if(book.avatar){
        formData.append('file', book.avatar);
        formData.append('username', authData.username);
        formData.append('user_id', authData.user_id);
      try {
        const Uploadresponse = await uploadFile(formData);
        console.log("uploading; ",Uploadresponse.data)
        if(Uploadresponse.data.error === "200"){
          alert("Upload Success")
          setUploadresponse(Uploadresponse.data);
        }
      } catch (err) {
          alert(err.message);
      }
      }
  };

  useEffect(() => {
    console.log("Selected Upload changed: ", uploadres.error);
  }, [uploadres]);
  return (
      <React.Fragment>
           <Header /><br></br>
            <div className="form">
                  <h1>Upload Your File <b>{authData.username}</b></h1>
                  <input
                    type="file"
                    accept="application/pdf"
                    placeholder="Enter the path Of file"
                    name="filepath"
                    onChange={handlePathChange}
                    multiple/>
                  <button onClick={handleClick}>Add</button>
                  {/* {error?"Something went wrong!":"Upload Success"} */}
                  <Link to="/supplier/technical-documents" >See all books</Link>
            </div><br></br>
          <Footer />
      </React.Fragment>
  );
};

export default Add;
