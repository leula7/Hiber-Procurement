import {CssBaseline,ThemeProvider} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "pages/layout/Layout.component";
import Dashboard  from "pages/dashboard/Dashboard.component";
import Products from "pages/products/products.component";
import Customers from"pages/customers/customers.component";
import Transaction from "pages/transaction/transaction.component.jsx"
import LoginPage from "pages/login/LoginPage.component";
import RequestForm from "pages/RequestForm/RequestForm.component";
import Table from "pages/Table/Table";
import TenderCard from "pages/TenderShowing.page";


function App() {
  const mode = useSelector((state) => state.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  

  return (
  <>
 
    <BrowserRouter>
      <ThemeProvider  theme={theme}>
        <CssBaseline />
        <Routes>
        {!isAuth && ( 
          <>
                    <Route path="/" element={<LoginPage />} />
          </>
          
                    )}
            {isAuth && (  <></>) }
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/task" element={<Products />} />
                <Route path="/supplier" element={<Customers />} />
                <Route path="/requests" element={<Transaction />} />
                <Route path="/requestsform" element={<RequestForm />} />
                <Route path="/table" element={<Table />} />
                <Route path="/tendercard" element={<TenderCard />} />

              </Route>
            
        </Routes>
       </ThemeProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
