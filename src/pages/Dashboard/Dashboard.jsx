import sendRequest from "../../utilities/send-request";
import ExperienceItem from "../ExperienceItem/ExperienceItem";
import { useState, useEffect } from "react";

export default function Dashboard({ experiences, user }) {
  return (
    <>
      <ul className="Dashboard">
        {experiences.map((e, idx) => (
          <ExperienceItem idx={idx} experience={e} key={idx} user={user} />
        ))}
      </ul>
    </>
  );
}
