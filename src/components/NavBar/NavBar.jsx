import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <div className="NavContainer">
      <nav>
        <Link to="/">Dashboard</Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/new">Create New Entry</Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>Welcome, {user.name}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="" onClick={handleLogOut}>
          Log Out
        </Link>
      </nav>
    </div>
  );
}
