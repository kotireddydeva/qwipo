import { useState, useEffect } from "react";
import axios from "axios";

const AddressForm = ({ customerId, refresh, editingAddress, clearEditing }) => {
  const [form, setForm] = useState({ addressDetails: "", city: "", state: "", pinCode: "" });

  useEffect(() => {
    if (editingAddress) {
      setForm({
        addressDetails: editingAddress.address_details,
        city: editingAddress.city,
        state: editingAddress.state,
        pinCode: editingAddress.pin_code
      });
    } else {
      setForm({ addressDetails: "", city: "", state: "", pinCode: "" });
    }
  }, [editingAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingAddress) {
      axios.put(`${process.env.REACT_APP_API_URL}/api/addresses/${editingAddress.id}`, form)
        .then(() => {
          setForm({ addressDetails: "", city: "", state: "", pinCode: "" });
          clearEditing();
          refresh();
        })
        .catch(err => console.error(err));
    } else {
      axios.post(`${process.env.REACT_APP_API_URL}/api/customers/${customerId}/addresses`, form)
        .then(() => {
          setForm({ addressDetails: "", city: "", state: "", pinCode: "" });
          refresh();
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input placeholder="Address" value={form.addressDetails} required
        onChange={e => setForm({ ...form, addressDetails: e.target.value })} />
      <input placeholder="City" value={form.city}
        onChange={e => setForm({ ...form, city: e.target.value })} />
      <input placeholder="State" value={form.state} required
        onChange={e => setForm({ ...form, state: e.target.value })} />
      <input placeholder="Pin Code" value={form.pinCode} required
        onChange={e => setForm({ ...form, pinCode: e.target.value })} />
      <button type="submit" className="btn">{editingAddress ? "Update Address" : "Add Address"}</button>
      {editingAddress && <button type="button" className="btn" onClick={clearEditing}>Cancel</button>}
    </form>
  );
};

export default AddressForm;
