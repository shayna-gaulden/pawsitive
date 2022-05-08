import React, {useState} from 'react'
import {Box} from '@mui/material';
import { styled } from '@mui/system';
import BookingForm from '../components/bookingForm'

const BookingFormWrapper = styled(Box)({

});

const AddBooking = (props) => {
    return(
        <BookingFormWrapper>
            <BookingForm />
        </BookingFormWrapper>
    )
}

export default AddBooking;