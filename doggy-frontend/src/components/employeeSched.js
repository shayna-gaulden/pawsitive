import React, {useState, useEffect} from "react";
import { Box, Button, Typography, Autocomplete, Grid, TextField, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import {useRecoilState, useRecoilValue, atom} from 'recoil';
import {scheduleRows} from '../recoil/managerAtom'
import ScheduleCard from './scheduleCards'
import Axios from 'axios';

const SchedContainer = styled(Box)({
    display:'flex',
    flexFlow: 'row wrap'
});


const ScheduleList = ({schedules}) => {

    const [newSchedule, setNewSchedule] = useState(schedules)

    const [deptOptions, setDeptOptions] = useState([])
    const [empNameOptions, setEmpNameOptions] = useState([])

    const onlyUniq = (value, index, self) => {
            return self.indexOf(value) === index;
    }



    const uniqEmpOptions = () => {
        const uniq = schedules.map(el => el.EMP_NAME).filter(onlyUniq)
        uniq.push('All Departments')
        setEmpNameOptions(uniq)
        
    }



    const handleSubmit = (event) => {
        event.preventDefault();        
        const data = new FormData(event.currentTarget);
        const filters = {
            emp: data.get('employee')
        }
        const updatedScheduleView = schedules.filter(el => el.EMP_NAME === filters.emp)
        if(filters.emp){
            setNewSchedule(updatedScheduleView)
        }
        if (filters.emp === 'All Departments'){
            setNewSchedule(schedules)
        }
    }
    useEffect(() => {
        uniqEmpOptions()
    },[newSchedule])
    return(
        <>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
                        <Grid item xs={12} sm={5}>
            {
                schedules.length > 0 ?
                <TextField
                fullWidth
                id="outlined-select-dog"
                select
                required
                fullWidth

                label="Employee"
                name='employee'
                
                >
                {empNameOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem> 
                ))}
                </TextField>
                :''

            }
            </Grid>
            <Grid item xs={12} sm={2}>
            <Button type="submit"
                fullWidth
                variant="contained"
                >Submit</Button>
            </Grid>
            </Grid>
     
               
        
        </Box>
        <SchedContainer>
            {
                newSchedule.length > 0 ? newSchedule.map(el => <ScheduleCard 
                        dept={el['DEPARTMENT']} 
                        empName={el["EMP_NAME"]} 
                        time={el["TIME_DATE"]} 
                        custName={el["CUST_NAME"]} 
                        dogName={el["DOG_NAME"]} /> ) :
                        <Typography>No Schedule</Typography>
            }

        
        
        </SchedContainer>
        </>
    )
}
export default ScheduleList