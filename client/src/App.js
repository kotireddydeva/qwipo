import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';

import CustomerListPage from "./pages/CustomerListPage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import CustomerFormPage from "./pages/CustomerFormPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
      <Router>
      <Routes>
        <Route path='/' element={<CustomerListPage />} />
        <Route path="/customers/:id" element={<CustomerDetailPage />} />
        <Route path="/customers/new" element={<CustomerFormPage />} />
        <Route path="/customers/edit/:id" element={<CustomerFormPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </Router>
  );
}

export default App;
