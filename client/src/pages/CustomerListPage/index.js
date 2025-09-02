import CustomerList from "../../components/CustomerList";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

const CustomerListPage = () => {
  return (
    <div className="page-container">
      <Header />
      <h1>Customers</h1>
      <div>
      <Link to="/customers/new" className="btn link">Add Customer</Link>
      </div>
      <CustomerList />
    </div>
  );
};

export default CustomerListPage;
