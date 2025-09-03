import { useEffect, useState } from "react";
import axios from "axios";
import AddressForm from "../AddressForm";

const AddressList = ({ customerId }) => {
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);

  const fetchAddresses = () => {
    axios
      .get(`https://qwipo-server.vercel.app/api/customers/${customerId}/addresses`)
      .then(res => setAddresses(res.data.data || []))
      .catch(err => console.error("Error fetching addresses:", err));
  };

  useEffect(() => {
    fetchAddresses();
  }, [customerId]);

  const handleEdit = (address) => {
    setEditingAddress(address);
  };

  const handleDelete = (id) => {
    axios.delete(`https://qwipo-server.vercel.app/api/addresses/${id}`)
      .then(() => fetchAddresses())
      .catch(err => console.error(err));
  };

  return (
    <div>
      <ul className="customer-address-list">
        {addresses.map(a => (
          <li key={a.id} className="address-item">
            <address className="address-row">
              <div>Address: {a.address_details},</div>
              <div>City: {a.city},</div>
              <div>State: {a.state},</div>
              <div>Pin: {a.pin_code}</div>
            </address>
            <div className="button-row">
              <button className="edit-btn" onClick={() => handleEdit(a)}>Edit</button>
              <button className="add-delete-btn" onClick={() => handleDelete(a.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <AddressForm
        customerId={customerId}
        refresh={fetchAddresses}
        editingAddress={editingAddress}
        clearEditing={() => setEditingAddress(null)}
      />

    </div>
  );
};

export default AddressList;
