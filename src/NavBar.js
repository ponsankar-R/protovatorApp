import React from "react";
import { Link, useLocation } from "react-router-dom";
import './NavBar.css';
import { FaHome, FaHistory, FaBolt} from 'react-icons/fa';
import { FaMoneyBillTrendUp } from "react-icons/fa6";

function NavBar(){
    const location = useLocation();

    return(
        <div id="NavContainer">
            <ul id="NavLinks">
                <li className={location.pathname === "/" ? "activeNavItem" : ""}>
                    <Link to="/" id="NavHome"><FaHome /></Link>
                </li>
                <li className={location.pathname === "/History" ? "activeNavItem" : ""}>
                    <Link to="/History" id="NavCompletedTask"><FaHistory /></Link>
                </li>
                <li className={location.pathname === "/Goals" ? "activeNavItem" : ""}>
                    <Link to="/Goals" id="NavGoals"><FaBolt /></Link>
                </li>
                <li className={location.pathname === "/Finance" ? "activeNavItem" : ""}>
                    <Link to="/Finance" id="NavFinance"><FaMoneyBillTrendUp /></Link>
                </li>
            </ul>
        </div>
    )
}

export default NavBar;
