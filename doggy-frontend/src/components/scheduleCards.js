import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const CardContainer = styled(Card)({
    margin:'20px'
});

const BasicCard = ({dept, empName, time, custName, dogName}) =>  {

    const date = new Date(time)


  return (
    <CardContainer sx={{ minWidth: 275, maxWidth:300}}>
      <CardContent>
        <Typography variant='h5' gutterBottom>
          {dept}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Employee: {empName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {custName == null && dogName == null ?
            'No Appointment' :
            'Customer: ' + custName + ' with ' + dogName
            }
          
        </Typography>
        <Typography variant="body2">
          {date.toString()}
        </Typography>
      </CardContent>
    </CardContainer>
  );
}

export default BasicCard