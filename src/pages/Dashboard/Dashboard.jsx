import sendRequest from "../../utilities/send-request";
import ExperienceItem from "../ExperienceItem/ExperienceItem";
import { useState, useEffect } from "react";

export default function Dashboard({ }) {
    const [allExperiences, setAllExperiences] = useState([]);

    async function getAllExperiences() {
        const response = await sendRequest('/api/experiences/all', 'GET')
        console.log(response)
        return setAllExperiences(response)
    };

    useEffect(() => {
        getAllExperiences();
    }, [])

  return (
    <>
      <ul className="Dashboard">{allExperiences.map((e, idx) =>  (
        <ExperienceItem experience={e} key={idx} />
      ))}</ul>
    </>
  );
}