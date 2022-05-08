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

  const sizes = [
    "extra small","small","medium","large"
  ]
  const genderOptions = [
      "M",
      "F"
  ]

  const handleSubmit = (e) => {
      e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload = {
        USER_ID:user,
        DOG_NAME:data.get('dogName'),
        SIZE:data.get("size"),
        BREED:data.get("breed"),
        SPAYED_NEUTERED:data.get("spayed")? 1 : 0,
        VACCINATED:data.get("vaccinated") ? 1 : 0,
        AGE:data.get("age"),
        GENDER:data.get('gender'),
    }

    Axios.post('https://pawsitivedogdaycare.herokuapp.com/dogs/add', payload)
    .then(response =>{
        handleClose()
        window.location.reload(false)
    })
    .catch(err => {
        console.log(err)
    })
  }

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>Add Dogs</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormWrapper>
            <FormContainer>
            <Typography component="h1" variant="h5">
              Add Your Dog 
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
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
                    sizes.map((option) => (
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
                        genderOptions.map((option) => (
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