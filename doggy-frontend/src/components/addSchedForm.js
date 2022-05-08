import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import {Button, Grid, TextField, Checkbox, FormControlLabel, MenuItem} from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system';
import {useParams} from 'react-router-dom'
import Axios from 'axios'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

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

  const [empList, setEmpList] = useState([])
  const [time, setTime] = useState(new Date());

  const {user} = useParams();


  const handleSubmit = (e) => {
      e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(time.toISOString())
    const empPayload = {
        USER_ID:data.get('employee'),
        TIME_DATE:time.toISOString().replaceAll('/',"-").replace('T'," ").substring(0,16),
        SUB_ID:data.get("subId")
    }    

    console.log(empPayload)
    
    Axios.post('https://pawsitivedogdaycare.herokuapp.com/schedules/add',empPayload)
    .then(response => {
        console.log(response)
        window.location.reload(false)
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    Axios.get('https://pawsitivedogdaycare.herokuapp.com/schedules/empDrop')
    .then(response => {
        setEmpList(response.data.schedules)
    })
    .catch(error => {

    })
  },[])

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>Create Schedule</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormWrapper>
            <FormContainer>
            <Typography component="h1" variant="h5">
              Create Schedule   
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
              <TextField
                  fullWidth
                  id="outlined-select-dog"
                  select
                  required
                  fullWidth

                  label="Employee"
                  name='employee'
                  >
                  {empList.map((option) => (
                      <MenuItem key={option.EMP_NAME +` (${option.USER_ID})`} value={option.USER_ID}>
                      {option.EMP_NAME  +`(${option.USER_ID})`}
                      </MenuItem> 
                  ))}
                  </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  name="subId"
                  label="Sub ID"
                  id="subId"
                  autoComplete="subId"
                />
              </Grid>
              
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid item xs={12} sm={12}>
            <DateTimePicker
                renderInput={(props) => <TextField 
                    required
                    fullWidth
                    name="time"
                    id="time" {...props} />}
                label="Date Time Picker"
                value={time}
                onChange={(newValue) => {
                setTime(newValue);
                }}
            />
                          </Grid>

    </LocalizationProvider>
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