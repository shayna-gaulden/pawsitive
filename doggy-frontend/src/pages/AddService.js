import React, {useState} from 'react'
import ServiceForm from '../components/addserviceForm';
import {Box} from '@mui/material';
import { styled } from '@mui/system';

const ServiceFormWrapper = styled(Box)({

});

const AddService = (props) => {
    console.log(props)
    return(
        <ServiceFormWrapper>
            <ServiceForm  />
        </ServiceFormWrapper>
    )
}

export default AddService;