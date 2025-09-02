import { useParams } from "react-router-dom";
import CustomerForm from "../../components/CustomerForm";
import Header from "../../components/Header";

const CustomerFormPage = () => {
  const { id } = useParams();
  return (
    <div className="page-container">
      <Header />
      <CustomerForm customerId={id} />
    </div>
  );
};

export default CustomerFormPage;
