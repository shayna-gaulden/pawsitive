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
import {serviceRows} from '../recoil/managerAtom';
import {useRecoilValue, useRecoilState} from 'recoil'


const FormWrapper = styled(Box)({
    width: '600px',
    margin: '50px auto',
});

const SerivceForm = () => {
    const currentData = useRecoilValue(serviceRows);
    const [serviceList, setServiceList] = useState([])
    const [service, setService] = useState({})
    const navigate = useNavigate()
    const [payload, setPayload] = useState({
        SERVICE:"",
        DEPARTMENT:"",
        PRICE:"",
        DETAILS:""
    });

    const [error, setError] = useState(false)

    const {serviceId} = useParams();  

    const handleSubmit = (event) => {
        event.preventDefault();        
        console.log(payload)
        const data = new FormData(event.currentTarget);
        payload.SERVICE = service.SERVICE

        if (payload.DEPARTMENT === ''){
          payload.DEPARTMENT = service.DEPARTMENT
        }

        if (payload.PRICE === ''){
          payload.PRICE = service.PRICE
        }

        if (payload.DETAILS === ''){
          payload.DETAILS = service.DETAILS
        }
        console.log(payload)
        console.log(service)
          Axios.put("https://pawsitivedogdaycare.herokuapp.com/services", payload)
          .then(response => {
              console.log(response)
              navigate('/managerView')
          })
          .catch(error => {
              console.log(error)
              setError(true)
          })
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setPayload({...payload, [name.toUpperCase()]: value})
        console.log(payload)
    }

    const findServiceById = (serviceId) => {
      console.log(serviceList)
      // setService(serviceList.find(o => o['SERVICE'] === serviceId))
      if(service.length > 0){
        setService(serviceList.find(o => o['SERVICE'] === serviceId))
      }
        
    }
    

    useEffect(() => {

    }, [currentData,service,payload,handleChange])

    useEffect(()=> {
      Axios.get("https://pawsitivedogdaycare.herokuapp.com/services")
          .then(response => {
              setService(response.data.services.find(o => o['SERVICE'] === serviceId))
          })
          .catch(error => {
              console.log(error)
          })
    },[])
    return(
        <FormWrapper>
            <Typography component="h1" variant="h5">
              Edit Service: {service['SERVICE']}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
              <TextField
                margin="normal"
                disabled
                fullWidth
                id="service"
                name="service"
                value={service['SERVICE']}
                autoComplete="service"
                onChange={handleChange}
                autoFocus
              />
              </Grid>
              <Grid item xs={12} sm={4}>
              {/* <TextField
                margin="normal"
                required
                fullWidth
                name="department"
                label={service['DEPARTMENT']}
                id="department"
                autoComplete="department"
                onChange={handleChange}
              /> */}
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
                name="price"
                label={service['PRICE']}
                id="price"
                autoComplete="price"
                onChange={handleChange}
                error={error}
                helperText={error ? 'only numbers' :''}

              />
              </Grid>
              <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="details"
                label={service['DETAILS']}
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
                Save
              </Button>
            </Box>
        </FormWrapper>
    )
}

export default SerivceForm;