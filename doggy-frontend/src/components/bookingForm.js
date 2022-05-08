import React, {useState,useEffect} from 'react';
import {
    Box,
    Avatar,
    Typography,
    TextField,
    Grid,
    Button,
    MenuItem
} from '@mui/material';
import { styled } from '@mui/system';
import Axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";


const FormWrapper = styled(Box)({
    width: '600px',
    margin: '50px auto'
});

const BookingForm = (props) => {
     
    const navigate = useNavigate()
    const {user, employee, time, department, empId, subId} = useParams()
    const [services, setServices] = useState([])
    const [dogs, setDogs] = useState([])
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    
    const getDogId = (dogName) => {
        const dogId = dogs.find(el => el.DOG_NAME === dogName)

        return dogId.DOG_ID
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const payload = {
          "USER_ID": empId,
          "TIME_DATE": data.get('DATE_TIME'),
          "SERVICE": data.get('SERVICE'),
          "DOG_ID": parseInt(getDogId(data.get('DOG'))),
          "SUB_ID": subId
        };
        console.log(payload)
        Axios.post('https://pawsitivedogdaycare.herokuapp.com/calendar/book', payload)
        .then(res => {
            console.log(res)
            navigate('/customerView/' + user)
        })
        .catch(err => {
            console.log(err)
            setError(true)
            setErrorMsg(err.request.response)
        })

    }

    const handleChange = (e) => {

    }

    useEffect(() => {
        // get dog optinos
        Axios.post('https://pawsitivedogdaycare.herokuapp.com/dogs/findByUser',{'USER_ID': user})
        .then(res => {
            setDogs(res.data.dogs)
            console.log(dogs)
        })
        .catch(err => {
            console.log(err)
        })

        // get service options
        Axios.post('https://pawsitivedogdaycare.herokuapp.com/services/findByDept',{'DEPARTMENT': department})
        .then(res => {
            setServices(res.data.services)
            console.log(services)
        })
        .catch(err => {
            console.log(err)
        })

    },[])


    return(
        <FormWrapper>
            <Typography component="h1" variant="h5">
              Booking
            </Typography>
            {
              errorMsg !== '' ? <Typography style={{color:'red'}}>{errorMsg}</Typography>:''
            }
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="empName"
                label="EmployeeName"
                name="EMP_NAME"
                autoComplete="empName"
                onChange={handleChange}
                autoFocus
                value={employee}
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="DATE_TIME"
                label="Time"
                id="time"
                autoComplete="time"
                onChange={handleChange}
                value={time}

              />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                fullWidth
                id="outlined-select-dog"
                select
                label="Select"
                name='SERVICE'
                onChange={handleChange}
                helperText="Please select service"
                >
                {services.map((option) => (
                    <MenuItem key={option.SERVICE} value={option.SERVICE}>
                    {option.SERVICE}
                    </MenuItem> 
                ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                fullWidth
                id="outlined-select-dog"
                select
                label="Select"
                name="DOG"
                onChange={handleChange}
                helperText="Please select dog"
                >
                {dogs.map((option) => (
                    <MenuItem key={option.DOG_NAME} value={option.DOG_NAME}>
                    {option.DOG_NAME}
                    </MenuItem> 
                ))}
                </TextField>
              </Grid>
              
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
        </FormWrapper>
    )
}

export default BookingForm;