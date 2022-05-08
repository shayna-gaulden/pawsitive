import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Typography, MenuItem, Checkbox,FormControlLabel} from '@mui/material';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link, useNavigate} from 'react-router-dom'
import Axios from 'axios'
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
        Ultimate Doggo
{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const SignUp =  () => {
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const userPayload = {
      USER_ID: data.get('username'),
      PW:data.get('password'),
      USER_TYPE:"cust"
    }

    const customerPayload = {
      USER_ID: data.get('username'),
      CUST_NAME: data.get('fullname'),
      PHONE_NUMBER: data.get('phone'),
      ADDRESS: data.get('address'),
      CITY: data.get('city'),
      STATE: data.get('state'),
      ZIPCODE: data.get('zip'),
      COUNTRY: data.get('country')
    }


    const dogPayload = {
      USER_ID:data.get('username'),
      DOG_NAME:data.get('dogName'),
      SIZE:data.get("size"),
      BREED:data.get("breed"),
      SPAYED_NEUTERED:data.get("spayed")? 1 : 0,
      VACCINATED:data.get("vaccinated") ? 1 : 0,
      AGE:data.get("age"),
      GENDER:data.get('gender'),
    }

    try {
      const createUsr = await Axios.post('https://pawsitivedogdaycare.herokuapp.com/auth/signup/users', userPayload)
      console.log(createUsr)
      const createCust = await Axios.post('https://pawsitivedogdaycare.herokuapp.com/customers/add', customerPayload)
      console.log(createCust)
      const createDog = await Axios.post('https://pawsitivedogdaycare.herokuapp.com/dogs/add', dogPayload) 
      console.log(createDog)

      navigate('/login/user')
    } catch (err) {
      console.log(err)
    }
    
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            User Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
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

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="fullname"
                  label="full name"
                  id="fullname"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Street Address"
                  id="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  label="City"
                  id="city"
                  autoComplete="city"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="state"
                  label="State"
                  id="state"
                  autoComplete="state"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="zip"
                  label="Zip Code"
                  id="zip"
                  autoComplete="zip"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="country"
                  label="Country"
                  id="country"
                  autoComplete="country"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  id="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography component="h1" variant="h5">Fill Out Dog Info</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                label='Dog Name'
                fullWidth
                id="dogName"
                name="dogName"
                autoComplete="dogName"
                autoFocus
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                id="breed"
                label="Breed"               
                name="breed"
                autoComplete="breed"
                autoFocus
              />
              </Grid>
              <Grid item xs={12} sm={4}>
              <TextField
                select
                margin="normal"
                fullWidth
                label='Size'
                id="size"
                name="size"
                autoComplete="size"
                autoFocus
                >
                    {
                    ["extra small","small","medium","large"].map((option) => (
                    <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem> 
                ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
              <TextField
                margin="normal"
                fullWidth
                label='Age'
                id="age"
                name="age"
                autoComplete="age"
                autoFocus
              />
              </Grid>
              <Grid item xs={12} sm={4}>
              <TextField
                select
                margin="normal"
                fullWidth
                label='Gender'
                id="gender"
                name="gender"
                autoComplete="gender"
                autoFocus
                >
                    {
                        ['M','F'].map((option) => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem> ))
                    }
                </TextField>
              </Grid>
              <Grid item>
              <FormControlLabel control={<Checkbox  />} label="Spayed/Neutered" name='spayed' />
              <FormControlLabel control={<Checkbox/>} label="Vaccinated" name='vaccinated' />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to='/login/user'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignUp