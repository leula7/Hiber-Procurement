import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'tachyons';
import { useState } from "react";

//Global
import Register from "./pages/components/Register";
import Dashboard from "./pages/components/Dashboard";
import Chat from "./pages/chat/Chat";
import LoginForm from "./pages/components/LoginForm";
import Update from "./pages/Update";

//Market officer
import SetUnitPrice from "./pages/MarketOfficer/SetUintPirce";
import GetDocuments from "./pages/components/GetDocuments";
import ViewFile from "./pages/components/ViewFile";

//ASistant
import CreateNewRequests from "./pages/AisstantManager/CreateNewRequests";
import Approved from "./pages/AisstantManager/Approved";
import Waiting from "./pages/AisstantManager/Waiting";

//BranchManager
import ApproveRequest from "./pages/BranchManager/ApproveRequest";

//Supplier
import Add from "./pages/Supplier/Add";
import Books from "./pages/Books";
import GeneratedDocument from "./pages/MarketOfficer/GeneratedDocument";
import ItemForm from "./pages/Concerned/Concerned";


function App() {
  //For Login
  const [user_response,setUserResponse] = useState({
    user_id: "",
    userName: "",
    error: "",
    message: "",
    branch_name: "",
    branch_id: ""
});

  // const [selectedDocument, setSelectedDocument] = useState({
  //   filename: ""
  // });

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
           {/* Global */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginForm setUserResponse = {setUserResponse}/>} />
          <Route path="chat" element={<Chat user_response= {user_response}/>}/>
          <Route path="/" element={<LoginForm setUserResponse = {setUserResponse}/>} />
          {/* <Route path="/try" element={<Try />} /> */}
            {/* Assistant */}
          <Route path="assistant" element={<Dashboard user_response= {user_response}/>}/>
          <Route path="assistant/create-request" element={<CreateNewRequests user_response={user_response}/>} />
          <Route path="assistant/approved-requests" element={<Approved user_response={user_response}/>} />
          <Route path="assistant/waiting-requests" element={<Waiting user_response={user_response}/>} />

            {/* BranchManager */}
          <Route path="branch-manager" element={<Dashboard user_response= {user_response}/>}/>
          <Route path="branch-manager/approve-requests" element={<ApproveRequest user_response={user_response}/>} />
            {/* MarketOfficer */}
          <Route path="market-officer" element={<Dashboard user_response= {user_response}/>}/>
          <Route path="market-officer/set-price" element={<SetUnitPrice user_response= {user_response}/>}/>
          <Route path="/view" element={<ViewFile  />}/>
          <Route path="market-officer/technical-documents" element={<GetDocuments user_response={user_response} />}/>
          <Route path="market-officer/generated-document" element={<GeneratedDocument user_response={user_response} />}/>

          
            {/* Supplier */}
          <Route path="supplier" element={<Dashboard user_response= {user_response}/>}/>
          <Route path="supplier/add" element={<Add user_response={user_response}/>} />
          <Route path="supplier/technical-documents" element={<GetDocuments user_response={user_response} />}/>
          <Route path="/books" element={<Books />} />
          <Route path="/update/:id" element={<Update />} />

          {/* Concerned Department */}
          <Route path="/concerned" element={<ItemForm />} />
          {/* Try */}
          {/* <Route path="/try-header" element={<Headers />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
