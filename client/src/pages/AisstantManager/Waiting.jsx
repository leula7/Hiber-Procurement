import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Header from '../components/Header';
import "../../css/index.css";
import { useSelector } from 'react-redux';
import { waiting } from '../../api/Assistant';

const Waiting=(props)=> {
  const {authData} = useSelector((state)=>state.authReducer);
  const [branchs,setbranch] = useState([])
  const [requests, setRequests] = useState([]);
  const [username] = useState(localStorage.getItem('username') || props.user_response.userName);
  const [branch_name] = useState(localStorage.getItem('branchname') || props.user_response.branch_name);
  const [user_id] = useState(localStorage.getItem('userid') || props.user_response.user_id);
  const [branch_id] = useState(localStorage.getItem('branchid') || props.user_response.branch_id);

  //const {username,user_id,branch_name} = props.user_response
  let i = 0
  
  //pending request
  useEffect(() => {
    const wait = async()=>{
     try {
        const response = await waiting(authData.user_id);
        setRequests(response.data.approved);
     } catch (error) {
        console.error(error);
     }
    }
    wait();
  }, [requests]);

  return (
    <>
      <div className='content'>
      <Header user_info={[props.user_response,branchs]}/><br></br>
        <h1>Waiting Requests</h1>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Branches</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Purpose of Neccessity</th>
              <th>Time of Perchase per Quarter</th>
              <th>Unit Price</th>
            </tr>
          </thead>
          <tbody>
            {
            requests.map(request => (
              <tr key={request.id}>
                  <td>{
                   ++i
                    }</td>
                  <td>{request.branch_name}</td>
                  <td>{request.item_name}</td>
                  <td>{request.quantity}</td>
                  <td>{request.purpose}</td>
                  <td>{request.time_of_purchase}</td>
                  <td>{request.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}

export default Waiting;
