import React from 'react';
import './Popup.css'

const Popup= ({setInfo}) => {


  const handleClose = () => {
    setInfo(0)
  };



  return (
    <>
      
        <div className="popup">
          <div className="popup-content">
            <h2>How To Use ?</h2>
            <p>1)DOUBLE TAP To Delete Task. </p>
            <p>2)View Deleted Task On Next Section. </p>
            <p>3)Set Goals on 3rd Section. </p>
            <p>4)Make Schedule on 4th Section</p>
       
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      
    </>
  );
};

export default Popup;
