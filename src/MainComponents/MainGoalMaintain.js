import React, { useEffect, useState } from "react";
import './MainGoalMaintain.css';

function MainGoalMaintain({ goalName, goalDate, goalSkills, checkedSkills, setCheckedSkills, resetGoal, setMainGoal }) {
    const [timeRemaining, setTimeRemaining] = useState('');

    useEffect(() => {
        if (!goalDate) {
            setTimeRemaining('Goal date not provided');
            return;
        }

        const goalDateObj = new Date(goalDate);

        if (isNaN(goalDateObj.getTime())) {
            setTimeRemaining('Invalid date format');
            return;
        }

        const today = new Date();
        const timeDifference = goalDateObj.getTime() - today.getTime();

        if (timeDifference < 0) {
            setTimeRemaining('Goal date has passed');
            return;
        }

        const oneDay = 24 * 60 * 60 * 1000;

        const years = Math.floor(timeDifference / (365 * oneDay));
        const months = Math.floor((timeDifference % (365 * oneDay)) / (30 * oneDay));
        const days = Math.floor((timeDifference % (30 * oneDay)) / oneDay);

        const timeRemainingString = `${years} years ${months} months ${days} days`;

        setTimeRemaining(timeRemainingString);
    }, [goalDate]);

    const handleCheckboxChange = (index) => {
        const updatedCheckedSkills = { ...checkedSkills, [index]: !checkedSkills[index] };
        setCheckedSkills(updatedCheckedSkills);
    };

    return (
        <div id="MainGoalMaintain">
            <div id="Goal-Container">
                <button id="BackToSetGoal" onClick={() => {
                    resetGoal();
                    setMainGoal(true);
                }}>Reset Goal</button>
                <h1 id="GoalName">{goalName}</h1>
                <p id="Time">Time Remaining: {timeRemaining}</p>
                <div id="skills">
                    {goalSkills.map((skill, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                id={`skill-${index}`}
                                className="skill"
                                checked={checkedSkills[index] || false}
                                onChange={() => handleCheckboxChange(index)}
                            />
                            <label className="skillLabel" htmlFor={`skill-${index}`}>{skill}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MainGoalMaintain;
