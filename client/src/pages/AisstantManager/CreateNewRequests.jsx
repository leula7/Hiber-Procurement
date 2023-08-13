import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Items } from '../../api/Global';
import { sendRequest } from '../../api/Assistant';

const CreateNewRequests = (props)=>{

    const [requestresponse,setreqestresponse] = useState([]);
    const [request, setrequest] = useState({
        user_id: "",
        item_id: "",
        quantity: "",
        time_of_purchase: "",
        title_of_post: "",
        other_reason: "",
        type: "",
        bookvalue: "",
        serviceyear:"",
        frequency:"",
        tagno:"",
        username: ""
      });
    const [isnull, setisnull] = useState({valid: true});
    const {authData} = useSelector((state) => state.authReducer)

    const [item, setItem] = useState([]);
    
    const getToken = () => {
        return localStorage.getItem('token');
      }

//set username and id to local storage
useEffect(()=>{
  setrequest({user_id: authData.user_id});
 },[authData.username,authData.user_id]);

//item set
useEffect(() => {
    const fethcAllItem = async () => {
      try {
        const res = await Items();
        setItem(res.data);
      } catch (err) {
        alert(err);
      }
    };
     fethcAllItem();
  },[]);

  const handleChange = (e) => {
    setrequest((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setisnull({
        valid: true
    });

    const config = {
        headers: { Authorization: `Bearer ${getToken()}` }
      };

      if (request.quantity === "" || request.quantity === undefined) {
        alert("Choose quantity");
        setisnull({
            valid: false
        });
        return;
    }
    
    if (request.time_of_purchase === "" || request.time_of_purchase === undefined) {
        alert("time of purchase Item");
        setisnull({
            valid: false
        });
        return;
    }

    if ((request.title_of_post === "" || request.title_of_post === undefined) && authData.position === "additional") {
        alert("Choose title of post");
        setisnull({
            valid: false
        });
        return;
    }else{
        setisnull({
            valid: true
        });
    }
    if (request.item_id === "" || request.item_id === undefined) {
        alert("Choose Item");
        setisnull({
            valid: false
        });
        return;
    }
      
        try {
            console.log("checking: ",isnull.valid);
            if(isnull.valid){
                const req = await sendRequest(request,config);
                setreqestresponse(req.data);
                alert(req.data.message);
            }
        } catch (err) {
        //  setError(true)
        }  
  };

     return (
    <React.Fragment>
        <Header />
            <div className="content">
            <form>
                <div className="form">
                    <h1>Request Need {authData.username}</h1>
                    Additional <input name="type" type="radio" value="additional_request" onChange={handleChange}/>
                    replacement <input name="type" type="radio" value="replacement" onChange={handleChange}/>
                    <input
                        type="number"
                        placeholder="Quantity"
                        name="quantity"
                        onChange={handleChange}
                    />
                    {isnull.quantity ==="" &&(<span style={{ color: "red" }}>Enter Quantity</span>)}
                    <input
                        type="number"
                        placeholder="Time of purches in quarter"
                        name="time_of_purchase"
                        onChange={handleChange}
                    />
                    { request.type ==="additional_request" &&(
                        <React.Fragment>
                            <input
                                type="text"
                                placeholder="title_of_post"
                                name="title_of_post"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                placeholder="Other Reason"
                                name="other_reason"
                                onChange={handleChange}
                            />  
                        </React.Fragment>
                    )}
                    {  request.type ==="replacement" &&(
                            <React.Fragment>
                                <input
                                    type="text"
                                    placeholder="Tag No"
                                    name="tagno"
                                    onChange={handleChange}
                                />
                                <input
                                    type="number"
                                    placeholder="service year"
                                    name="serviceyear"
                                    onChange={handleChange}
                                />  
                                <input
                                    type="number"
                                    placeholder="Frequecny of mentenance"
                                    name="frequency"
                                    onChange={handleChange}
                                /> 
                                <input
                                    type="number"
                                    placeholder="Book Value"
                                    name="bookvalue"
                                    onChange={handleChange}
                                />   
                            </React.Fragment>
                        )}
                    <span>Description(itme)</span>
                    <select name= "item_id" onChange={handleChange}>
                        <option></option>
                        {item.map((item)=>(
                            <option key= {item.item_id} 
                                    value={item.item_id}>
                                        {item.item_name}
                                        </option>
                        ))}
                        </select>
                    <button onClick={handleClick}>Send Request</button>
                </div>
            </form>
            </div>
        {/* <Footer /> */}
    </React.Fragment>
  );
}

export default CreateNewRequests;