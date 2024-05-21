import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import Dashboard from "../Dashboard/Dashboard";
import ExperienceDetail from "../ExperienceDetail/ExperienceDetail";
import NewExperienceForm from "../NewExperienceForm/NewExperienceForm";
import "./App.css";

import NavBar from "../../components/NavBar/NavBar";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [experiences, setExperiences] = useState([]);

  // useEffect(() => {
  //   async function
  // });

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
            <Route path="/experiences" element={<Dashboard />} />
          </Routes>
          <NewExperienceForm addExperience={addExperience} user={user} />
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
