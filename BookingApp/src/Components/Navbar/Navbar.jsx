import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="navbarDiv">
      <div className="topbar">
        <Link to="/">
          <span className="companyName">Xplore.com</span>
        </Link>
        {user ? (
          user.name
        ) : (
          <div className="lg-buttons">
            <button className="registerBtn">Register</button>
            <button className="loginBtn">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
