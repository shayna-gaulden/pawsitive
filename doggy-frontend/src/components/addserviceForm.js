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
import { useNavigate } from "react-router-dom";


const FormWrapper = styled(Box)({
    width: '600px',
    margin: '50px auto'
});

const SerivceForm = (props) => {
    const [payload, setPayload] = useState({
        SERVICE:"",
        DEPARTMENT:"",
        PRICE:"",
        DETAILS:""
    });

    const [error, setError] = useState(false)
     
    const history = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(payload))
        Axios.post("https://pawsitivedogdaycare.herokuapp.com/services/add", payload)
        .then(response => {
            console.log(response)
            history("/managerView")
        })
        .catch(error => {
            console.log(error)
            setError(true)
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setPayload({...payload, [name.toUpperCase()]: value})
    }


    return(
        <FormWrapper>
            <Typography component="h1" variant="h5">
              Add Service
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="service"
                label="Service Name"
                name="SERVICE"
                autoComplete="service"
                onChange={handleChange}
                autoFocus
              />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  id="outlined-select-dog"
                  select
                  required
                  fullWidth
                  margin="normal"

                  label="Select"
                  name='department'
                  onChange={handleChange}
                  helperText="Please select department"
                  >
                  {['Boarding', 'Training', 'Grooming'].map((option) => (
                      <MenuItem key={option} value={option}>
                      {option}
                      </MenuItem> 
                  ))}
                  </TextField>
              </Grid>
              <Grid item xs={12} sm={3}>
              <TextField
                margin="normal"
                required
                fullWidth
                type={"int"}
                name="PRICE"
                label="Price($)"
                id="price"
                autoComplete="price"
                onChange={handleChange}
                error={error}
                helperText={error ? 'only numbers' : ''}

              />
              </Grid>
              <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="DETAILS"
                label="Details"
                id="details"
                autoComplete="details"
                onChange={handleChange}

              />
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

export default SerivceForm;