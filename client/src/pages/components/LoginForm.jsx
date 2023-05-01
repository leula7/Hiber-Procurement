import React, { useEffect, useState } from 'react';
import {useNavigate,Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from '../../actions/AuthAction';


function LoginForm() {

  const [userinfo, setUserInfo] = useState({
    username: "",
    password: "",
    position: ""
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authData} = useSelector((state) => state?.authReducer);
  
  //Login
  useEffect(()=>{
    if(isLoggedIn){
      if (authData?.error === "200") {
        if(userinfo.position ==="assistant" ){
          alert("Login: ",authData.message);
          navigate("/assistant");
        }else if(userinfo.position ==="manager"){
          alert(authData.message);
          navigate("/branch-manager");
        }else if(userinfo.position ==="supplier"){
          alert(authData.message)
          navigate("/supplier");
        }else if(userinfo.position ==="marketofficer"){
          alert(authData.message)
          navigate("/market-officer");
        }
    } else {
      if(authData?.message !== undefined){
        alert(authData?.message);
      }
    }
    }
  },[isLoggedIn]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(userinfo.position ===""){
      alert("Choose Position");
    }else
    {
      dispatch(logIn(userinfo));
      setIsLoggedIn(true);
    }
  };

  useEffect(()=>{
    if(userinfo.position ==="assistant" ){
      alert("Login: ",authData.message);
      navigate("/assistant");
    }else if(userinfo.position ==="manager"){
      alert(authData.message);
      navigate("/branch-manager");
    }else if(userinfo.position ==="supplier"){
      alert(authData.message)
      navigate("/supplier");
    }else if(userinfo.position ==="marketofficer"){
      alert(authData.message)
      navigate("/market-officer");
    }
  },[])

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        UserName:
        <input type="text" value={userinfo.username} onChange={(event) => setUserInfo({ ...userinfo, username: event.target.value })} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={userinfo.password} onChange={(event) => setUserInfo({ ...userinfo, password: event.target.value })} />
      </label>
      <br />
        <span className='span'></span><br></br>
      <Link to="/register" >New here?</Link>
      <select name= "position" onChange={(event)=>setUserInfo({...userinfo,position: event.target.value})}>
            <option value="">Choose your position</option>
            <option value="assistant">Asistant</option>
            <option value="manager">Manager</option>
            <option value="approvalbody">Approval Body</option>
            <option value="marketofficer">Market Offecer</option>
            <option value="concerned_dep">Concerned Department</option>
            <option value="supplier">Suplier</option>
     </select>
     <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;
