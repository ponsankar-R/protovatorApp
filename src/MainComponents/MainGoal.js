import React, { useState, useEffect } from "react";
import './MainGoal.css';
import { FaSquarePlus } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import SkillPopup from "./SkillPopup";
import MainGoalMaintain from "./MainGoalMaintain";

function MainGoals() {
    const [manageSkill, setManageSkill] = useState(false);
    const [mainGoalSkills, setMainGoalSkills] = useState([]);
    const [goalInputValue, setGoalInputValue] = useState("");
    const [completionDate, setCompletionDate] = useState("");
    const [buttonClicked, setButtonClicked] = useState(false);
    
    const [mainGoal, setMainGoal] = useState(() => {
        const savedMainGoal = localStorage.getItem('mainGoal');
        return savedMainGoal ? JSON.parse(savedMainGoal) : true;
    });

    const [goalName, setGoalName] = useState(() => localStorage.getItem('goalName') || "Goal");
    const [goalDate, setGoalDate] = useState(() => localStorage.getItem('goalDate') || "00/00/0000");
    const [goalSkills, setGoalSkills] = useState(() => {
        const savedGoalSkills = localStorage.getItem('goalSkills');
        return savedGoalSkills ? JSON.parse(savedGoalSkills) : [];
    });

    const [checkedSkills, setCheckedSkills] = useState(() => {
        const savedCheckedSkills = localStorage.getItem('checkedSkills');
        return savedCheckedSkills ? JSON.parse(savedCheckedSkills) : {};
    });

    useEffect(() => {
        localStorage.setItem('goalName', goalName);
        localStorage.setItem('goalDate', goalDate);
        localStorage.setItem('goalSkills', JSON.stringify(goalSkills));
        localStorage.setItem('mainGoal', JSON.stringify(mainGoal));
        localStorage.setItem('checkedSkills', JSON.stringify(checkedSkills));
    }, [goalName, goalDate, goalSkills, mainGoal, checkedSkills]);

    const handleAddSkill = (IsSkillDisplay) => {
        IsSkillDisplay ? setManageSkill(true) : setManageSkill(false);
    }

    const handleMainGoalSkills = (skills) => {
        setMainGoalSkills(skills);
        setButtonClicked(true);
    }

    const handleGoalInput = (e) => {
        setGoalInputValue(e.target.value);
    }

    const handleCompletionDateChange = (e) => {
        setCompletionDate(e.target.value);
    }

    const handleSetGoal = () => {
        if (goalInputValue !== "" || completionDate !== "") {
            setGoalName(goalInputValue);
            setGoalSkills(mainGoalSkills);
            setGoalDate(completionDate);
        }

        setGoalInputValue("");
        setMainGoalSkills([]);
        setCompletionDate("");
        setButtonClicked(false);
        setMainGoal(false); 
    }

    const resetGoal = () => {
        localStorage.removeItem('goalName');
        localStorage.removeItem('goalDate');
        localStorage.removeItem('goalSkills');
        localStorage.removeItem('mainGoal');
        localStorage.removeItem('checkedSkills');

        setGoalName("Goal");
        setGoalDate("00/00/0000");
        setGoalSkills([]);
        setCheckedSkills({});
        setMainGoal(true); 
    }

    return (
        <div id="GoalComponent">
            {mainGoal ? (
                <div id="MainGoal">
                    <div>
                        <input id="GoalInput" placeholder="Set Your Main Goal" value={goalInputValue} onChange={handleGoalInput} required maxLength={20} />
                        <FaSquarePlus id="Skills" onClick={() => handleAddSkill(true)} />
                        <h5 id="SkillText">Add Skill</h5>
                    </div>
                    {buttonClicked && <FaCheckCircle id="SkillsAddedIndicator" />}
                    {manageSkill ? (
                        <div id="SkillPopup">
                            <SkillPopup handleAddSkill={handleAddSkill} handleMainGoalSkills={handleMainGoalSkills} />
                        </div>
                    ) : (
                        <></>
                    )}
                    <label id="DateContainer">
                        <h4 id="DateName">Target completion date :</h4>
                        <input type="date" id="Date" value={completionDate} onChange={handleCompletionDateChange} />
                    </label>
                    <button id="GoalButton" onClick={handleSetGoal}>Set Goal</button>
                </div>
            ) : (
                <MainGoalMaintain
                    goalName={goalName}
                    goalDate={goalDate}
                    goalSkills={goalSkills}
                    checkedSkills={checkedSkills}
                    setCheckedSkills={setCheckedSkills}
                    resetGoal={resetGoal}
                    setMainGoal={setMainGoal}
                />
            )}
        </div>
    );
}

export default MainGoals;
