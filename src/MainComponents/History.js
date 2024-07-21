import React, { useState, useEffect, useMemo } from 'react';
import './History.css';
import { FaUndoAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";


const History = () => {
  const [localHistory, setLocalHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("DeletedItems");
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory).filter(item => item !== null);
      setLocalHistory(parsedHistory);
    }
  }, []);

  const countMemo = useMemo(() => {
    return localHistory.length;
  }, [localHistory.length]);

  const handleDelete = (index) => {
    const updatedHistory = localHistory.filter((_, i) => i !== index);
    setLocalHistory(updatedHistory);
    localStorage.setItem("DeletedItems", JSON.stringify(updatedHistory));
  };

  const handleUndo = (index) => {
    const handleArray = [...localHistory];
    const [deletedTask] = handleArray.splice(index, 1);

    const mainArray = JSON.parse(localStorage.getItem("MainTasks")) || [];
    mainArray.unshift(deletedTask);
    localStorage.setItem("MainTasks", JSON.stringify(mainArray));
    setLocalHistory(handleArray);
    localStorage.setItem("DeletedItems", JSON.stringify(handleArray));
  };

  return (
    <div>
      {localHistory.length > 0 ? (
        <div>
          <div id="TopicContainer">
            <h2 id="Topic">History :</h2>
            <h2 id="HistoryCount">Total Deleted Tasks: {countMemo}</h2>
          </div>
          {localHistory.map((item, index) => (
            <div key={index} className='HistoryItem'>
              {item}
              <div id="HistoryIcons">
                <FaUndoAlt id="HistoryUndo" onClick={() => handleUndo(index)} />
                <FaTrash id="HistoryDelete" onClick={() => handleDelete(index)} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No history available.</p>
      )}
    </div>
  );
};

export default History;
