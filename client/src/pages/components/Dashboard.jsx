import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { Link } from "react-router-dom";
import "../../css/style.css";
import { useSelector } from 'react-redux';


function Dashboard() {
  const {authData} = useSelector((state)=>state.authReducer);
  let dashboardList;

  switch(authData.position){
    case "supplier":
      dashboardList  = [
        {
          src: 'request.png',
          title: 'Add Technical Document',
          link: 'add'
        },
        {
          src: 'view_request.png',
          description: 'Image 2 description',
          title: 'Financial Value',
          link: 'financial-value'
        },
        {
          src: 'view_request.png',
          description: 'Image 2 description',
          title: 'View Status',
          link: 'status'
        },
        {
          src: 'approved.png',
          title: 'Get Technical Documents',
          link: 'technical-documents'
        },
      ];
      break;
    case "admin":
      dashboardList  = [
        {
          src: 'request.png',
          title: 'Change Time',
          link: 'update-proc-time'
        },
        {
          src: 'view_request.png',
          description: 'Image 2 description',
          title: 'Get Report',
          link: 'generated-report'
        },
      ];
      break;
    case "approvalbody":
      dashboardList  = [
        {
          src: 'request.png',
          title: 'Approve Document',
          link: 'doc'
        },
        {
          src: 'view_request.png',
          description: 'Image 2 description',
          title: 'Get Report',
          link: 'generated-report'
        },
      ];
      break;
    case "assistant":
      dashboardList  = [
        {
          src: 'request.png',
          title: 'Create New Request',
          link: 'create-request'
        },
        {
          src: 'view_request.png',
          description: 'Image 2 description',
          title: 'View Report',
          link: 'docs'
        },
        {
          src: 'approved.png',
          title: 'Approved Requests',
          link: 'approved-requests'
        },
        {
          src: 'waiting.png',
          title: 'Waiting Request',
          link: 'waiting-requests'
        }
      ];
      break;
    case "concerned_dep":
      dashboardList  = [
        {
          src: 'request.png',
          title: 'Set Spec',
          link: 'set-spec'
        },
        {
          src: 'view_request.png',
          description: 'Image 2 description',
          title: 'Get Report',
          link: 'generated-report'
        },
      ];
      break;
    case "manager":
      dashboardList  = [
        {
          src: 'request.png',
          title: 'Approve Request',
          link: 'approve-requests'
        },
      ];
      break;
    case "marketofficer":
      dashboardList  = [
        {
          src: 'request.png',
          title: 'Set Item Price',
          link: 'set-price'
        },
        {
          src: 'view_request.png',
          description: 'Image 2 description',
          title: 'Generated Report',
          link: 'generated-report'
        },
        {
          src: 'view_request.png',
          description: 'Image 2 description',
          title: 'Set Procurement Type',
          link: 'proc-type'
        },
        {
          src: 'approved.png',
          title: 'Get Technical Documents',
          link: 'technical-documents'
        },
        {
          src: 'view_request.png',
          description: 'Image 2 description',
          title: 'Public Procurement',
          link: 'post-proc'
        },
        {
          src: 'waiting.png',
          title: 'Waiting Request',
          link: 'waiting-requests'
        }
        ,
        {
          src: 'waiting.png',
          title: 'Generate Document',
          link: 'generated-document'
        }
      ];
      break;
  }

  return (
    <>
     {/* <Navigation data = {data}/> */}
     <Header /><br></br>
      <div className='content'>
          <div className='cards'>
            {dashboardList.map((image, index) => (
                  <div key={index} className='card-list'>
                    <img src={image.src} alt={image.title} />
                      <div className="card-content">
                        <h3>{image.title}</h3>
                        <Link to={image.link}>View details</Link>
                      </div>
                  </div>
                ))};
          </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
