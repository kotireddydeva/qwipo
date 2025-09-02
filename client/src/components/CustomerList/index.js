import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(5);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/customers`)
      .then(res => setCustomers(res.data.data))
      .catch(err => console.error(err));
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/api/customers/${id}`)
      .then((res) => {
        setCustomers(customers.filter((c) => c.id !== id));
      })
      .catch((err) => console.error(err));
  };

  const filteredCustomers = customers.filter((c) => {
    const fullName = `${c.first_name} ${c.last_name}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (!sortField) return 0;

    const nameA = a[sortField].toLowerCase();
    const nameB = b[sortField].toLowerCase();

    return sortOrder === "asc"
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = sortedCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(sortedCustomers.length / customersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="filter-controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="first_name">First Name</option>
          <option value="last_name">Last Name</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <table className="customer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map(c => (
            <tr key={c.id}>
              <td data-label="Name">
                <Link to={`/customers/${c.id}`} className="action-link" >{c.first_name.charAt(0).toUpperCase() + c.first_name.slice(1).toLowerCase()}{" "}
                  {c.last_name.charAt(0).toUpperCase() + c.last_name.slice(1).toLowerCase()}</Link>
              </td>
              <td data-label="Phone"><button type="button" className="delete-btn" onClick={() => deleteUser(c.id)}><MdDelete /></button> </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
