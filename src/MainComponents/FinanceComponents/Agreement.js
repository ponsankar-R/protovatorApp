import React from "react";
import './Agreement.css'

function Agreement({setAgreement}){
    const handleAccept=()=>{
        setAgreement(1);
        localStorage.setItem("Agreement",1)
    }
    return (
            <div id="AgreementContainer">
            <h1 id="AgreementHead">Message from Protovator:</h1>
            <h2 id="AgreementContent">"We do not store your data on our servers. Every piece of data generated within your application is stored exclusively on your device. We are not responsible for any data loss resulting from storage issues on your device. Your data is never shared or stored on the internet. Any data leakage due to insufficient security measures on your device is entirely your responsibility."</h2>
            <button id="AcceptButton" onClick={handleAccept}>I Accept And Ready To Explore</button>
            </div>
    )
}


export default Agreement;