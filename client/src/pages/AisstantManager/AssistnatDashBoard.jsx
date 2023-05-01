// import React from 'react';
// import Footer from '../Public/components/Footer';
// import Header from '../Public/Header';
// import { useState,useEffect } from 'react';
// import { useLocation,Link, useNavigate } from "react-router-dom";
// import "../Public/css/style.css";
// import axios from "axios";


// function AssistnatDashboard(props) {
//   const location = useLocation();
//   //const {data} = location.state;
//   const [username] = props.user_response.userName;
//   const [branchs,setbranch] = useState({});
//   const user_id = props.user_response.user_id;
//   const navigate = useNavigate();

//   const imageList = [
//     {
//       src: 'request.png',
//       title: 'Create New Request',
//       link: 'create-request'
//     },
//     {
//       src: 'view_request.png',
//       description: 'Image 2 description',
//       title: 'View Report',
//       link: 'docs'
//     },
//     {
//       src: 'approved.png',
//       title: 'Approved Requests',
//       link: 'approved'
//     },
//     {
//       src: 'waiting.png',
//       title: 'Waiting Request',
//       link: 'waiting'
//     }
//   ];

//   useEffect(() => {
//     axios.get(`http://localhost:3000/branchname/${user_id}`)
//       .then(response => {
//         setbranch(response.data.branch[0]);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, [user_id]);


//   return (
//     <>
//      {/* <Navigation data = {data}/> */}
//         <div className='cards'>
//         <Header user_info={[props.user_response,branchs]}/><br></br>
//           {imageList.map((image, index) => (
//                 <div key={index} className='card-list'>
//                   <img src={image.src} alt={image.title} />
//                     <div className="card-content">
//                       <h3>{image.title}</h3>
//                       <Link to={image.link}>View details</Link>
//                     </div>
//                 </div>
//               ))};
//         </div>
//       <Footer />
//     </>
//   );
// };

// export default AssistnatDashboard;
