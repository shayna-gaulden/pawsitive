import React, { useState } from 'react';
import Nav from "../components/managerNav";
import { Box, Button } from '@mui/material'
import { styled } from '@mui/system'
import Tabs from '../components/managerTabs';

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