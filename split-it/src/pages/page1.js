import React from "react";
import { useNavigate } from "react-router-dom";
import "./page1.css";

function Page1() {
    const navigate = useNavigate();

    const goToPage2 = () => {
        navigate("/page2");
    };

    return (
        <div className="button-container">
            <button onClick={goToPage2}>FAMILY</button>
            <button >OTHERS</button>
        </div>
    );
}

export default Page1;