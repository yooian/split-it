import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import { GreenButton } from "../theme";
import logo from '../images/small-logo.jpeg';

function F_Page_1() {
    const navigate = useNavigate();

    return (
        
        <Box>
            <Stack direction="column" spacing={6} justifyContent={"space-evenly"} alignItems={"center"}>
            <img src={logo} alt="Logo" />
                <GreenButton onClick={() => {navigate("/f_page_2");}}>FAMILY</GreenButton>
                <GreenButton onClick={() => {navigate("/i_page_2");}}>INDIVIDUAL</GreenButton>
            </Stack>
        </Box>
        
    );
}

export default F_Page_1;