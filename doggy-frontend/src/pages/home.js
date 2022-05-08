import React, { useState } from 'react';
import Nav from "../components/nav";
import { Box, Button } from '@mui/material';
import Login from '../components/login';



const Homepage = () => {
    return (
    <Box> 
        <Nav />
        <Login />
    </Box>
    )
}

export default Homepage