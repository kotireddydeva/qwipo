import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CustomerForm = ({ customerId }) => {
  const [form, setForm] = useState({ firstName: "", lastName: "", phoneNumber: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (customerId) {
      axios.get(`http://localhost:5000/api/customers/${customerId}`)
        .then(res => {
          setForm({
            firstName: res.data.data.first_name,
            lastName: res.data.data.last_name,
            phoneNumber: res.data.data.phone_number
          });
        })
        .catch(err => console.error(err));
    }
  }, [customerId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = customerId
      ? `http://localhost:5000/api/customers/${customerId}`
      : "http://localhost:5000/api/customers";

    const method = customerId ? axios.put : axios.post;

    method(url, form)
      .then(() => navigate("/"))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        placeholder="First Name"
        value={form.firstName}
        onChange={e => setForm({ ...form, firstName: e.target.value })}
      />
      <input
        placeholder="Last Name"
        value={form.lastName}
        onChange={e => setForm({ ...form, lastName: e.target.value })}
      />
      <input
        placeholder="Phone"
        value={form.phoneNumber}
        onChange={e => setForm({ ...form, phoneNumber: e.target.value })}
      />
      <button type="submit" className="btn">
        {customerId ? "Update" : "Create"}
      </button>
    </form>

  );
};

export default CustomerForm;
