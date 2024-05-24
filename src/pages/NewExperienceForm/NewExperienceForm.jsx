import { useState } from "react";
import { saveExperience } from "../../utilities/experiences-api";
import { useNavigate } from "react-router-dom";

export default function NewExperienceForm({ addExperience, user }) {
  const [newExperience, setNewExperience] = useState({
    title: "",
    description: "",
    img: "",
  });

  const navigate = useNavigate();

  async function handleNewExperience(evt) {
    evt.preventDefault();
    try {
      const formData = {
        title: newExperience.title,
        description: newExperience.description,
        img: newExperience.img,
        user: user,
      };
      const experience = await saveExperience(formData);
      const createdAt = new Date(experience.createdAt).toLocaleDateString();
      addExperience({
        title: experience.title,
        description: experience.description,
        createdAt,
      });
      setNewExperience({ title: "", description: "", img: "" });
      navigate("/experiences");
    } catch (error) {
      console.log("error!!!");
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setNewExperience({
      ...newExperience,
      [name]: value,
    });
  }

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleNewExperience}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={newExperience.title}
            onChange={handleChange}
            required
          />
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={newExperience.description}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>
      <p className="error-message">&nbsp;</p>
    </div>
  );
}
