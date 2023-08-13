import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import "../../css/index.css";
import { useSelector } from 'react-redux';
import {approves} from '../../api/Assistant.js'
const Approved=()=> {
  const [requests, setRequests] = useState([]);
  const {authData} = useSelector((state)=>state.authReducer)
  let i = 0

  //pending request
  useEffect(() => {
    const app = async()=>{
      try {
        const approved =await approves(authData.user_id);
        setRequests(approved.data.approved);
      } catch (error) {
        console.error(error);
      }
    }
    app();
  }, [requests,authData.user_id]);

  return (
    <React.Fragment>
      
    <div className='content'>
      <Header /><br></br>
        <h1>Approved Requests BId: {authData.Branch_id}</h1>
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
            ))};
          </tbody>
        </table>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Approved;
