import React, { useState } from "react";
import './SkillPopup.css';

function SkillPopup({ handleAddSkill, handleMainGoalSkills }) {
    const [skills, setSkills] = useState({
        Skill_1: "",
        Skill_2: "",
        Skill_3: "",
        Skill_4: "",
        Skill_5: ""
    });


    // Handling cancel operation
    const handleCancel = () => {
        handleAddSkill(0);
        
    }

    // Handling Add button operation
    const handleAddButton = () => {
        // Extract values from skills object into an array
        const skillsArray = Object.values(skills).filter(skill => skill.trim() !== ""); // Filter out empty skills
        handleMainGoalSkills(skillsArray);
        handleAddSkill(0);
        //to indicate user skill added successfully
    
    }

    // Update state for each input field
    const handleChange = (e, skillKey) => {
        const value = e.target.value;
        setSkills(prevSkills => ({
            ...prevSkills,
            [skillKey]: value
        }));
    }

    return (
        <div id="SkillContainer">
            <button id="cancel" onClick={handleCancel}>X</button>
            <input className="Skill" value={skills.Skill_1} onChange={(e) => handleChange(e, "Skill_1")} placeholder="Skill-1" type="text" maxLength={14}/>
            <input className="Skill" value={skills.Skill_2} onChange={(e) => handleChange(e, "Skill_2")} placeholder="Skill-2" type="text" maxLength={14}/>
            <input className="Skill" value={skills.Skill_3} onChange={(e) => handleChange(e, "Skill_3")} placeholder="Skill-3" type="text" maxLength={14}/>
            <input className="Skill" value={skills.Skill_4} onChange={(e) => handleChange(e, "Skill_4")} placeholder="Skill-4" type="text" maxLength={14}/>
            <input className="Skill" value={skills.Skill_5} onChange={(e) => handleChange(e, "Skill_5")} placeholder="Skill-5" type="text" maxLength={14}/>
            <button id="AddSkills" onClick={handleAddButton}>Add</button>

        </div>
    );
}

export default SkillPopup;
