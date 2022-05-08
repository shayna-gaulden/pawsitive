import React, { useState } from 'react';
import Nav from "../components/nav";
import { Box, Button } from '@mui/material';
import Login from '../components/managerSignup';



const ManagerSignup = () => {
    return (
    <Box> 
        <Nav />
        <Login />
    </Box>
    )
}

export default ManagerSignup