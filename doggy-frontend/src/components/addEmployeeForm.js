import * as React from 'react';
import Box from '@mui/material/Box';
import {Button, Grid, TextField, Checkbox, FormControlLabel, MenuItem} from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system';
import {useParams} from 'react-router-dom'
import Axios from 'axios'


const FormWrapper = styled(Box)({
    width: '800px',
    margin: '50px auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    boxShadow: 24,
    backgroundColor:'white',
    p: 4,
    borderRadius:10
});

const FormContainer = styled(Box)({
    display:'flex',
    flexFlow:'column',
    alignItems: 'center',
    margin: '20px'
});


const BasicModal = () =>  {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {user} = useParams();


  const handleSubmit = (e) => {
      e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userPayload = {
        USER_ID:data.get('username'),
        PW: data.get('password'),
        USER_TYPE: data.get('department')
    }

    const empPayload = {
        USER_ID:data.get('username'),
        DEPARTMENT:data.get('department'),
        EMP_NAME:data.get("name"),
        ADDRESS:data.get("address"),
        CITY:data.get("city"),
        STATE:data.get("state"),
        ZIPCODE:data.get("zip"),
        COUNTRY:data.get('country'),
        SOCIAL_SECURITY_NUMBER:data.get('ssn')
    }

    console.log(empPayload,userPayload)
    
    Axios.post('https://pawsitivedogdaycare.herokuapp.com/auth/signup/users', userPayload)
    .then(res => {
        console.log(res)
    })
    .then(res => {
        Axios.post('https://pawsitivedogdaycare.herokuapp.com/auth/signup/employee', empPayload)
        .then(res => {
            window.location.reload(false)
        })
        .catch(err => console.log(err))
    } )
    .catch(error => console.log(error))
  }

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>Create Employee</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormWrapper>
            <FormContainer>
            <Typography component="h1" variant="h5">
              Create Employee Account
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="name"
                  label="Username"
                  autoFocus
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={8} >
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Street Address"
                  id="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  label="City"
                  id="city"
                  autoComplete="city"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  name="state"
                  label="State"
                  id="state"
                  autoComplete="state"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  name="zip"
                  label="Zip Code"
                  id="zip"
                  autoComplete="zip"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
              <TextField
                  fullWidth
                  id="outlined-select-dog"
                  select
                  required
                  fullWidth

                  label="Select"
                  name='department'
                  >
                  {['Boarding', 'Training', 'Grooming'].map((option) => (
                      <MenuItem key={option} value={option}>
                      {option}
                      </MenuItem> 
                  ))}
                  </TextField>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  required
                  fullWidth
                  name="ssn"
                  label="SSN"
                  id="ssn"
                  autoComplete="ssn"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  name="country"
                  label="Country"
                  id="country"
                  autoComplete="country"
                />
              </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
            </Box>
            </FormContainer>
        </FormWrapper>
      </Modal>
    </div>
  );
}

export default BasicModal