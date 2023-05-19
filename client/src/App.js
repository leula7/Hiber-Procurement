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
import Form from "pages/form/form.component.jsx"
import LoginPage from "pages/login/LoginPage.component";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  

  return (
    <div className="app">
    <BrowserRouter>
      <ThemeProvider  theme={theme}>
        <CssBaseline />
        <Routes>
        {!isLoggedIn && <Route path="/" element={<LoginPage />} />}
            {isLoggedIn && (
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/task" element={<Products />} />
                <Route path="/supplier" element={<Customers />} />
                <Route path="/requests" element={<Transaction />} />
                <Route path="/requestsform" element={<Form />} />
              </Route>
            )}
        </Routes>
       </ThemeProvider>
    </BrowserRouter>
      </div>
  );
}

export default App;
