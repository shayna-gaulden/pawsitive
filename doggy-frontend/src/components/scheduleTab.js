import React, {useState, useEffect} from "react";
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import {useRecoilState, useRecoilValue, atom} from 'recoil';
import {scheduleRows} from '../recoil/managerAtom'
import ScheduleCard from './scheduleCards'

const SchedContainer = styled(Box)({
    display:'flex',
    flexFlow: 'row wrap'
});


const ScheduleList = () => {
    const schedules = useRecoilValue(scheduleRows)
    
    return(
        <SchedContainer>
            {
                schedules.length > 0 ? schedules.map(el => <ScheduleCard 
                        dept={el['DEPARTMENT']} 
                        empName={el["EMP_NAME"]} 
                        time={el["TIME_DATE"]} 
                        custName={el["CUST_NAME"]} 
                        dogName={el["DOG_NAME"]} /> ) :
                        <Typography>No Schedule</Typography>
            }

        
        
        </SchedContainer>
    )
}
export default ScheduleList