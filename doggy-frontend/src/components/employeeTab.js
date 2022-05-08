import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {Box,Button} from '@mui/material';
import { styled } from '@mui/system';
import {useRecoilState, useRecoilValue, atom} from 'recoil';
import {
  serviceRows, 
  employeeRows, 
  scheduleRows
} from '../recoil/managerAtom';
import Axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import CustomerTable from './customerTable';
import ScheduleTabs from './employeeSched'

const ButtonWrapper = styled(Box)({
  display:'flex',
  justifyContent:'right',
  margin: '50px 60px'
})

const CardWrapper = styled(Box)({
    display:'flex',
    justifyContent:'center',
    flexFlow: 'row wrap',


  })

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const [schedules, setSchedules] = useState([])
  const [services, setServices] = useRecoilState(serviceRows)
  const [employees, setEmployees] = useRecoilState(employeeRows)

  const { user } = useParams()

    // isloading states
    const [isLoading, setIsLoading] = useState({
        scheduleLoading: false,
        serviceLoading: false,
        employeeLoading: false
      })
    
      const [isError, setIsError] = useState({
        scheduleError: false,
        serviceError: false,
        employeeError: false
      })
  
  const deleteBooking = (e) => {
    console.log(e)
  }
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
        Axios.get('https://pawsitivedogdaycare.herokuapp.com/services')
      .then(res => {
        setIsLoading({...isLoading,serviceLoading: true})

        const data = res.data.services
        setServices(data)
        setIsLoading({...isLoading,serviceLoading: false})

      })
      .catch(err =>{
        setIsError({...isLoading,serviceError: true})

        console.log(err)
      });

      Axios.get('https://pawsitivedogdaycare.herokuapp.com/schedules')
      .then(res => {
          setSchedules(res.data.schedules[0])
          console.log(schedules)
      })
      .catch(error =>{
          console.log(error)
      })
    

  },[])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Services" {...a11yProps(0)} />
          <Tab label="Schedule" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        
            <CustomerTable headers={[
                "Services",
                "Details",
                "Price ($)",
                "Department",
                ""
            ]} 
            rows={services} 
            values={[
                "SERVICE",
                "DETAILS",
                "PRICE",
                "DEPARTMENT"  
            ]}
            
            hideButton={true}
            />
    
      </TabPanel>
      <TabPanel  value={value} index={1}>
            <ScheduleTabs schedules={schedules} />
      </TabPanel> 
    </Box>
  );
}
