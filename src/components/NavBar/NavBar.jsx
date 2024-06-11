import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import "./NavBar.css";
import AuthPage from "../../pages/AuthPage/AuthPage";
import { useEffect, useState } from "react";
import { getImage } from "../../utilities/experiences-api";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  const [img, setImg] = useState(null);

  useEffect(() => {
    async function getBackgroundImage() {
      const img = await getImage();
      setImg(img);
    }
    getBackgroundImage();
  }, []);
  return (
    <div className="NavContainer">
      <nav>
        {user ? (
          <>
            {" "}
            <Link to="/">Dashboard</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/new">Create New Entry</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span>Welcome, {user.name}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="" onClick={handleLogOut}>
              Log Out
            </Link>
          </>
        ) : (
          // <div
          //   className="NasaPic"
          //   style={{
          //     backgroundImage: img ? `url(${img.url})` : "none",
          //   }}
          // >
          //   <AuthPage setUser={setUser} />
          // </div>
          <div>
            <Link to="/login">Login</Link>
          </div>
        )}
      </nav>
    </div>
  );
}
