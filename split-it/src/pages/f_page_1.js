import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, styled } from "@mui/material";

function F_Page_1() {
    const GreenButton = styled(Button)(({theme})=>({
        backgroundColor: theme.palette.primary.main, 
        color:"white",
        margin:5,
        "&:hover":{
            backgroundColor:"#4B7F52",
            color:"#C9FFE2",
        },
    }));
    const navigate = useNavigate();

    return (
        <div className="button-container">
            <GreenButton onClick={() => {navigate("/f_page_2");}}>FAMILY</GreenButton>
            <GreenButton>OTHERS</GreenButton>
        </div>
    );
}

export default F_Page_1;