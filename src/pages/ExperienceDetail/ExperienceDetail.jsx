import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOne } from "../../utilities/experiences-api";

export default function ExperienceDetail() {
  const params = useParams();
  const experienceid = params.experienceid;
  const [experience, setExperience] = useState({
    title: "",
    description: "",
    comments: [],
  });

  useEffect(() => {
    async function fetchOne() {
      try {
        const fetchedExperience = await getOne(experienceid);
        setExperience(fetchedExperience);
      } catch (error) {
        console.error("Error fetching experience:", error);
      }
    }

    fetchOne();
  }, [experienceid]); // Add experienceid to the dependency array to re-fetch when it changes

  return (
    <>
      <h1>{experience.title}</h1>
      <p>{experience.description}</p>

      {experience.comments.length > 0 ? (
        experience.comments.map((c) => (
          <p key={c._id}>
            {c.content} {c.user.name}
          </p>
        ))
      ) : (
        <div>No comments yet.</div>
      )}
    </>
  );
}
