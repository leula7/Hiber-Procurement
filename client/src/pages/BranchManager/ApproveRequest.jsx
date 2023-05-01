import React, {useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components//Header';
import { useSelector } from 'react-redux';
import { approve, pending } from '../../api/Manager.js';

const ApproveRequest=()=> {
  const [requests,setRequests] = useState([])
  const { authData } = useSelector((state) => state.authReducer);
  let i = 0;//for num order in tbody

  //pending request
  useEffect(() => {

    const fetchRequests = async () => {
      try {
        const response = await pending(authData.user_id);
        setRequests(response.data.pendingRequests);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchRequests();
  },[authData,requests]);

  const handleApproveRequest =async (requestId) => {
      try {
        const response = await(approve(authData.user_id,requestId));
        alert(response.data.message);
      } catch (error) {
        alert(error);
      }
  };

  const handleRejectRequest =async (requestId) => {
    // const reject = await axios.put(`http://localhost:3000/requests/${user_id}/${requestId}/reject`);
    // alert(reject.data.message)
  };

  return (
      <>
        <Header />
         <div className='content'>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                requests.map(request => (
                  <tr key={request.request_id}>
                      <td>{++i}</td>
                      <td>{request.branch_name}</td>
                      <td>{request.item_name}</td>
                      <td>{request.quantity}</td>
                      <td>{request.purpose}</td>
                      <td>{request.time_of_purchase}</td>
                      <td>{request.price}</td>
                      <td className='action'>
                          <button className="approve" onClick={() => handleApproveRequest(request.req_app_id)}>Approve</button>
                          <button className="reject" onClick={() => handleRejectRequest(request.req_app_id)}>Reject</button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Footer />
      </>
      
  );
}

export default ApproveRequest;
