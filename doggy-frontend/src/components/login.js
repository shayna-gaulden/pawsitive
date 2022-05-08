import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import LoginDog from '../assets/loginDog.png';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {useRecoilState,useRecoilValue} from 'recoil'
import {loggedUser} from '../recoil/userAtom'
import {useNavigate} from 'react-router-dom'

const Contianer = styled(Box)({
  display: 'flex',
  justifyContent:'center',
  margin:"10vh 0"
})

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
        Ultimate doggo
{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Login = () => {

  const [user, setUser] = useRecoilState(loggedUser)
  const [error, setError] = useState(false)
  
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      username: data.get('username'),
      password: data.get('password'),
    };

    Axios.post('https://pawsitivedogdaycare.herokuapp.com/auth/login/user',payload)
    .then(res => {
      setUser(res.data)
      console.log(res.data.usertype)

      if (res.data.usertype === 'cust'){
        window.localStorage.setItem('username', res.data.username)
        window.localStorage.setItem('token', res.data.token)
        if(user){
          navigate('/customerView/' + payload.username )
        }
      } else if (res.data.usertype !== 'Manager' ) {
        window.localStorage.setItem('username', res.data.username)
        window.localStorage.setItem('token', res.data.token)
        if(user){
          navigate('/employeeView/' + payload.username )
        }
      } else {
        setError(true)
      }
  

    })
    .catch(err => {
      console.error(err)
      setError(true)
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Contianer>
      <Grid container component="main" sx={{ height: '70vh', width:'80%' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${LoginDog})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                error={error}
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                
              />
              <TextField
                margin="normal"
                required
                fullWidth
                error={error}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={error ? 'Invalid User/Password': ""}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to='/signup/user'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      </Contianer>
    </ThemeProvider>
  );
}

export default Login