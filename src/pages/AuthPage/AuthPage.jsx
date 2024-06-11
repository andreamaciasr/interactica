import { useState, useEffect } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { getImage } from "../../utilities/experiences-api";

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [img, setImg] = useState(null);

  useEffect(() => {
    async function getBackgroundImage() {
      const img = await getImage();
      setImg(img);
    }
    getBackgroundImage();
  }, []);

  return (
    <main>
      {/* <div
        className="NasaPic"
        style={{
          backgroundImage: img ? `url(${img.url})` : "none",
        }}
      ></div> */}
      <h1>Login</h1>
      <button onClick={() => setShowSignUp(!showSignUp)}>
        {showSignUp ? "Log In" : "Sign Up"}
      </button>
      {showSignUp ? (
        <SignUpForm setUser={setUser} />
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </main>
  );
}
