import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import {useNavigate} from 'react-router-dom';

const CardContainer = styled(Card)({
    margin:'20px'
});

const BasicCard = ({dept, time, empName, empId, subId}) =>  {
    console.log(time)
    const date = new Date(time)
    const navigate = useNavigate()

    const timeConverter = (time) => {
        const ISOString = time.toISOString().slice(0,16).replace('T', ' ')
        return ISOString
    }

    const clickHandler = () => {
        navigate(`${empName}/${empId}/${dept}/${timeConverter(date)}/${subId}`)
    }

  return (
    <CardContainer sx={{ minWidth: 275, maxWidth:300}}>
      <CardContent>
        <Typography variant='h5' gutterBottom>
          {dept}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Employee: {empName}
        </Typography>
        <Typography variant="body2">
          {timeConverter(date)}
        </Typography>
        <Button onClick={clickHandler}>Book</Button>
      </CardContent>
    </CardContainer>
  );
}

export default BasicCard