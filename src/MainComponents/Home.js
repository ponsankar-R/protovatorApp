import React, { useState, useEffect, useCallback } from "react";
import "./Home.css";
import { FaAngleRight, FaInfoCircle } from "react-icons/fa";
import Popup from "./Popup";

let lastTouchTime = 0;

function Home() {
  const [mainTasks, setMainTasks] = useState(() => {
    const storedMainTasks = JSON.parse(localStorage.getItem("MainTasks")) || [];
    return storedMainTasks;
  });
  const [inputValue, setInputValue] = useState("");
  const [taskCount, setTaskCount] = useState(mainTasks.length);
  const [info, setInfo] = useState(0);
  const [deletedItem, setDeletedItem] = useState(null);

  useEffect(() => {
    setTaskCount(mainTasks.length);
  }, [mainTasks]);

  useEffect(() => {
    try {
      let existingValue = localStorage.getItem("DeletedItems");

      let newArray = [];

      if (existingValue) {
        newArray = JSON.parse(existingValue);
      }

      if (deletedItem !== null) {
        newArray.push(deletedItem);
      }

      localStorage.setItem("DeletedItems", JSON.stringify(newArray));
    } catch (error) {
      console.error("Error handling localStorage:", error);
      console.log("Fallback storage method:", deletedItem);
    }
  }, [deletedItem]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddItem = useCallback(() => {
    if (inputValue.trim() !== "") {
      const newTasks = [inputValue, ...mainTasks];
      setMainTasks(newTasks);
      localStorage.setItem("MainTasks", JSON.stringify(newTasks));
      setInputValue("");
    }
  }, [inputValue, mainTasks]);

  const handleDelete = (indexToDelete) => {
    if (indexToDelete < 0 || indexToDelete >= mainTasks.length) {
      console.error(`Invalid index to delete: ${indexToDelete}`);
      return;
    }

    const itemToDelete = mainTasks[indexToDelete];
    const updatedTasks = mainTasks.filter((_, index) => index !== indexToDelete);
    setMainTasks(updatedTasks);
    localStorage.setItem("MainTasks", JSON.stringify(updatedTasks));
    setDeletedItem(itemToDelete);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleAddItem();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleAddItem]);

  const handleTaskDoubleClick = (index) => {
    handleDelete(index);
  };

  const handleTaskTouch = (index) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTouchTime < DOUBLE_TAP_DELAY) {
      handleDelete(index);
    }
    lastTouchTime = now;
  };

  const handleInfo = (ci) => {
    setInfo(ci === "1" ? 1 : 0);
  };

  return (
    <div>
      <div>
        <input
          id="MainTaskInput"
          type="text"
          placeholder="Add New Task"
          value={inputValue}
          onChange={handleInputChange}
          maxLength={100}
        />
        <button type="submit" id="MainTaskButton" onClick={handleAddItem}>
          <FaAngleRight id="MainTaskAddIcon" />
        </button>
      </div>

      <div id="TotalTask">
        Total Tasks : {taskCount}{" "}
        <FaInfoCircle onClick={() => handleInfo("1")} id="UserGuide" />
      </div>
      {info ? <Popup setInfo={setInfo} /> : null}

      <div id="MainTasks">
        {mainTasks.map((task, index) => (
          <div
            key={index}
            className="Task"
            id={"Task" + index}
            onDoubleClick={() => handleTaskDoubleClick(index)}
            onTouchEnd={() => handleTaskTouch(index)}
          >
            {task}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
