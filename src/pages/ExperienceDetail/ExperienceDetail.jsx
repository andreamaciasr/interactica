import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOne } from "../../utilities/experiences-api";
import { useState } from "react";

export default function ExperienceDetail() {
  const params = useParams();
  const experienceid = params.experienceid;
  const [experience, setExperience] = useState("");

  useEffect(() => {
    async function fetchOne() {
      const experience = await getOne(experienceid);
      setExperience(experience);
    }

    fetchOne();
  }, []);

  return (
    <>
      <h1>{experience.title}</h1>
      <p>{experience.description}</p>
    </>
  );
}
