import { useState } from "react";
//import { newExperience } from "../../utilities/notes-api";

export default function NewExperienceForm({ addExperience, user}) {
    const [newExperience, setnewExperience] = useState("");

    async function handleNewExperience(evt) {
        evt.preventDefault();
        const formData = { newExperience };
        console.log(newExperience)
        const experience = await saveExperience(formData);
        const createdAt = new Date(experience.createdAt).toLocaleDateString();
        addExperience({ });
        setnewExperience("");
    }
    return (
        <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <label>Title</label>
            <input type="text" name="title" value={credentials.email} onChange={handleChange} required />
            <label>Description</label>
            <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
            <button type="submit">Login</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{error}</p>
      </div>
    )
}

