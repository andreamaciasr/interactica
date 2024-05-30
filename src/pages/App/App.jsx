import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import Dashboard from "../Dashboard/Dashboard";
import ExperienceDetail from "../ExperienceDetail/ExperienceDetail";
import NewExperienceForm from "../NewExperienceForm/NewExperienceForm";
import { getImage, getOne } from "../../utilities/experiences-api";
import "./App.css";

import NavBar from "../../components/NavBar/NavBar";
import { getExperiences } from "../../utilities/experiences-api";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [experiences, setExperiences] = useState([]);
  const [img, setImg] = useState(null);

  useEffect(() => {
    async function getBackgroundImage() {
      const img = await getImage();
      setImg(img);
    }
    getBackgroundImage();
  }, []);

  useEffect(() => {
    async function fetchExperiences() {
      const experiences = await getExperiences();
      setExperiences(experiences);
    }

    fetchExperiences();
  }, []);

  function addExperience(experience) {
    setExperiences([...experiences, experience]);
  }

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route
              path="/experiences/:experienceid"
              element={<ExperienceDetail />}
            />
            <Route
              path="/"
              element={<Dashboard experiences={experiences} user={user} />}
            />
            <Route
              path="/new"
              element={
                <NewExperienceForm addExperience={addExperience} user={user} />
              }
            />
          </Routes>
        </>
      ) : (
        <div
          className="NasaPic"
          style={{
            backgroundImage: img ? `url(${img.url})` : "none",
          }}
        >
          <AuthPage setUser={setUser} />
        </div>
      )}
    </main>
  );
}
