import { Link } from "react-router-dom"
import { FaHome } from "react-icons/fa";

const Header = () => {
    return (
        <div className="header">
            <Link to='/' className="link"><FaHome /> Home</Link>
        </div>
    )
}

export default Header;