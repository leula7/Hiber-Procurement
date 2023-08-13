import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import "../../css/index.css";
import { branchs } from "../../api/Global";
import { signUp } from "../../api/AuthRequest";

const Register = () => {
  const consern = "concerned_dep"
  const [regresult,setregresult] = useState([]);
  const [branch, setbranch] = useState([]);
  const [register, setinformation] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    position: "",
    branch_id: "",
    tinnumber: "",
    spec: ""
  });
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setinformation((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

//Get Branch
  useEffect(() => {
    const fetchAllBranch = async () => {
      try {
        const res = await  branchs();
        setbranch(res.data);
      } catch (err) {
        alert(err);
      }
    };
    fetchAllBranch();
  },[branch]);

//Register
  const handleClick = async (e) => {
    e.preventDefault();
     if(register.position === ""){
        alert("Choose your position"); 
     }else if(register.spec !== ""){
        alert("Choose your specialization");
      }else if(register.position === consern){
        
      }
    try {
        const reg = await signUp(register);
        setregresult(reg.data);
        alert(reg.data.message);
        navigate("/login")
    } catch (err) {
      alert(err)
    }
  };

  return (
    <form>
    <div className="form">
      <h1>Register </h1>
      <input
        type="text"
        placeholder="Enter FirstName"
        name="fname"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Enter Last Name"
        name="lname"
        onChange={handleChange}
      />
    {  register.position ===consern &&(
       <select name= "spec" onChange={handleChange}>
        <option value="choice">Choose your specialization</option>
         <option value="computer">Computer Related</option>
         <option value="furniture">Furniture</option>
         <option value="other">Other</option>
     </select>
      )}
    {register.spec ==="other" &&(
      <input type="tex" placeholder="Enter your Sepcialize"/>
    )}
    {
      register.position ==="supplier" &&(
      <input type="tex" name= "tinnumber" onChange={handleChange} placeholder="Enter your Tin Number"/>
      )
    }
      <input
        type="text"
        placeholder="Enter Username"
        name="username"
        onChange={handleChange}
      />
       <input
        type="password"
        placeholder="Enter password"
        name="password"
        onChange={handleChange}
      />
        <select name= "position" onChange={handleChange}>
            <option value="choose">Choose your position</option>
            <option value="assistant">Asistant</option>
            <option value="manager">Manager</option>
            <option value="approvalbody">Approval Body</option>
            <option value="marketofficer">Market Offecer</option>
            <option value="concerned_dep">Concerned Department</option>
            <option value="supplier">Suplier</option>
        </select>
        <select name= "branch_id" onChange={handleChange}>
          {branch.map((branch)=>(
            <option key= {branch.Branch_id}value={branch.Branch_id}>{branch.Branch_Name}</option>
          ))}
        </select><br></br>
        {regresult.error === "200" &&(
          <span className="success">{regresult.message}</span>
        )}
      <button onClick={handleClick}>Register</button>
       <Link to="/login" >Already have account?</Link>
    </div>
    </form>
  );
};

export default Register;
