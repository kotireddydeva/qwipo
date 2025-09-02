import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="page-container"> 
      <h1>404</h1> 
      <p>Oops! The page you’re looking for doesn’t exist.</p> 
      <Link to="/"> 
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound