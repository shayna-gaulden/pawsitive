import React, { useState } from 'react';
import Nav from "../components/customerNav";
import { Box, Button } from '@mui/material'
import { styled } from '@mui/system'
import CustomerTabs from '../components/customerTabs'

const HomeBtn = styled(Button)({
    color:'black'
})

const CustomerView = (props) => {
    console.log(props)
    return (
        <Box>
            <Nav />
            <CustomerTabs />
        </Box>
    )
}

export default CustomerView;