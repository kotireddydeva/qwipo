import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddressList from "../../components/AddressList";
import Header from "../../components/Header";

const CustomerDetailPage = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/customers/${id}`)
      .then(res => setCustomer(res.data.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!customer) return <p>Loading...</p>;

  return (
    <div className="page-container">
      <Header />
      <div className="profile">
      <h1>{customer.first_name} {customer.last_name}</h1>
      <p><b>Phone:</b> {customer.phone_number}</p>
      <button type="button" className="edit-profile-btn">
        <Link to={`/customers/edit/${id}`} className="action-link">Edit Customer Data</Link>
        </button>
      </div>
      <h2>Addresses</h2>
      <AddressList customerId={id} />
    </div>
  );
};

export default CustomerDetailPage;
