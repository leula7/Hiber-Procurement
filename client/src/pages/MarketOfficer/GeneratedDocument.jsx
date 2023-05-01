import React, {useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

import Footer from '../components/Footer';
import Header from '../components/Header';
import { generatedocument } from '../../api/MarketOfficer';
import "../../css/index.css";


const GeneratedDocument=()=> {
  const [requests,setRequests] = useState([])
  const { authData } = useSelector((state) => state.authReducer);
  let i = 0;//for num order in tbody
  let row_span = 1;
  let subtotal = false;
  let subtot = 0,Total = 0,prevBranchName,shouldDisplayBranchName=true;

  //generate Document
  useEffect(() => {

    const fetchRequests = async () => {
      try {
        const response = await generatedocument();
        setRequests(response.data.result);
        console.log(requests)
      } catch (error) {
        alert(error.message);
      }
    };
    fetchRequests();
  },[authData,requests]);

  const subtotals = (quantity,price)=>{
    subtot +=quantity*price;
  }

  const resetSubtotal = ()=>{
    Total+=subtot;
    subtot = 0;
  }
  
  const exportToExel = ()=>{
    //To Excel
    alert("excel");
    var data = document.getElementById('document');
    var excelFile = XLSX.utils.table_to_book(data, {sheet: "sheet1"});
    XLSX.write(excelFile, { bookType: 'xlsx', bookSST: true, type: 'base64' });
    XLSX.writeFile(excelFile, 'Summery.xlsx');
  }

  const exportToPDF = ()=>{
        //PDF FIle
    const input = document.querySelector('#document');

  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('BID.pdf');
  });
  //TO PDF Without Table Style
    // const doc = new jsPDF();
    // doc.autoTable({ html: '#document' });
    // doc.save('myTable.pdf');
  }
 
  return (
    <>
      <Header />
         <div className='content'>
            <table id='document'>
              <thead>
                <tr>
                    <th>No</th>
                    <th>Department<br></br>/Branches</th>
                    <th>Description<br></br>(Item)</th>
                    <th>Quantity</th>
                    <th>Purpose of Neccessity</th>
                    <th>Time of Perchase per Quarter</th>
                    <th>Unit</th>
                    <th>Total</th>
                </tr>
              </thead>
              <tbody>

                {requests.map((request, index) => {
                  // Check if this is the first row or if the branch has changed
                  if(index > 0 ){
                    if(requests[index].branch_name === requests[index-1].branch_name){
                      shouldDisplayBranchName = false;
                      subtotal = false;
                    }else{
                      subtotal = true;
                      shouldDisplayBranchName = true;
                    }
                  }
                  return (
                    <>
                          {subtotal && (
                            <>
                            <tr style={{ background: "lightBlue" }}>
                              <td style={{ textAlign: "center",fontWeight: "bold" }} colSpan={6}>Sub Total</td>
                              <td></td>
                              <td style={{ fontWeight: "bold" }}>{subtot}</td>
                            </tr>       
                            {resetSubtotal()}
                            </>        
                          )}
                      <tr key={request.request_id}>
                        <td>{++i}</td>
                        <td style={{ textAlign: "center",fontWeight: "bold" }} 
                            rowSpan={row_span}>
                              {shouldDisplayBranchName?request.branch_name:""}
                              </td>  
                        <td>{request.item_name}</td>
                        <td>{request.quantity}</td>
                        <td>{request.purpose}</td>
                        <td>{request.time_of_purchase}</td>
                        <td>{request.price}</td>
                        <td>{request.quantity*request.price}</td>
                        {subtotals(request.quantity,request.price)}
                      </tr>
                      {/* final subtotal */}
                      {index+1 == requests.length && (
                          <>
                            <tr style={{ background: "lightBlue" }}>
                                <td style={{ textAlign: "center",fontWeight: "bold" }} colSpan={6}>Sub Total</td>
                                <td></td>
                                <td style={{ fontWeight: "bold" }}>{subtot}</td>
                                {resetSubtotal()}
                              </tr> 
                                <tr style={{ background: "red" }}>
                                <td style={{ textAlign: "center",fontWeight: "bold" }} colSpan={6}>Total</td>
                                <td></td>
                                <td style={{ fontWeight: "bold" }}>{Total}</td>
                              </tr>
                          </> 
                          )}
                    </>
                  );
                })}

              </tbody>

            </table>
            <div style={{ display: 'grid', textAlign: 'center'}}>
            <button style={{ marginTop: "20px" }} onClick={exportToExel}>Export To excel</button>
            <button style={{ marginTop: "20px" }} onClick={exportToPDF}>Export To PDF</button>
            </div>
          </div>
      <Footer />
    </>
      
  );
}

export default GeneratedDocument;
