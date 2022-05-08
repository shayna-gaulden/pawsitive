import React, { useState } from 'react';
import Nav from "../components/customerNav";
import { Box, Button } from '@mui/material'
import { styled } from '@mui/system'
import Tabs from '../components/employeeTab';

const HomeBtn = styled(Button)({
    color:'black'
})

const ManagerView = (props) => {
    console.log(props)
    return (
        <Box>
            <Nav />
            <Tabs />
        </Box>
    )
}

export default ManagerView;