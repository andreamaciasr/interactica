import ExperienceItem from "../ExperienceItem/ExperienceItem";

export default function Dashboard({ experiences }) {
  return (
    <>
      <ul className="Dashboard">
        {experiences.map((e, idx) => (
          <ExperienceItem experience={e} key={idx} />
        ))}
      </ul>
    </>
  );
}
