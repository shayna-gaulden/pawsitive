import React, {useState} from 'react'
import ServiceForm from '../components/editServiceForm';
import {Box} from '@mui/material';
import { styled } from '@mui/system';

const ServiceFormWrapper = styled(Box)({

});

const AddService = (props) => {
    return(
        <ServiceFormWrapper>
            <ServiceForm  />
        </ServiceFormWrapper>
    )
}

export default AddService;