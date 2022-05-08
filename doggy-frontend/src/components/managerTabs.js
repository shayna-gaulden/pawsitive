import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {Box,Button} from '@mui/material';
import { styled } from '@mui/system';
import ServiceTab from './serviceTab';
import ScheduleTab from './scheduleTab';
import {useRecoilState, useRecoilValue, atom} from 'recoil';
import {
  serviceRows, 
  employeeRows, 
  scheduleRows, 
  serviceHeaders, 
  serviceValues, 
  employeeHeaders,
  employeeValues
} from '../recoil/managerAtom';
import Axios from 'axios'
import {Link} from 'react-router-dom'
import EmployeeModal from './addEmployeeForm'
import ScheduleModal from './addSchedForm'

const ButtonWrapper = styled(Box)({
  display:'flex',
  justifyContent:'right',
  margin: '50px 60px'
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

  // recoil state 
  const [schedules, setSchedules] = useRecoilState(scheduleRows)
  const [services, setServices] = useRecoilState(serviceRows)
  const [employees, setEmployees] = useRecoilState(employeeRows)


  const serviceColHeaders = useRecoilValue(serviceHeaders)
  const empColHeaders = useRecoilValue(employeeHeaders)

  const serviceDataAttr = useRecoilValue(serviceValues)
  const empDataAttr = useRecoilValue(employeeValues)

  useEffect(() => {
    Axios.get('https://pawsitivedogdaycare.herokuapp.com/schedules')
        .then(res => {
          setIsLoading({...isLoading,scheduleLoading: true})
          const data = res.data.schedules[0]
          setSchedules(data)
          setIsLoading({...isLoading,scheduleLoading: false})
        })
        .catch(err =>{
          setIsError({...isLoading,scheduleError: true})
          console.log(err)
        });

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

      Axios.get('https://pawsitivedogdaycare.herokuapp.com/employees/showEmp')
      .then(res => {
        setIsLoading({...isLoading,employeeLoading: true})
        const data = res.data.employees
        setEmployees(data)
        setIsLoading({...isLoading,employeeLoading: false})

      })
      .catch(err =>{
        setIsError({...isLoading,employeeError: true})
        console.log(err)
      });

  },[])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Services" {...a11yProps(0)} />
          <Tab label="Employees" {...a11yProps(1)} />
          <Tab label="Schedule" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {services.length > 0 ? <ServiceTab  headers={serviceColHeaders} rows={services} values={serviceDataAttr} />: <Typography>No service data</Typography>}
        <ButtonWrapper>
          <Link to='/serviceForm'>
          <Button variant='contained'>Add Service</Button>
          </Link>
        </ButtonWrapper>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {employees.length > 0 ?
        <ServiceTab 
          headers={
            [
              "Department",
              "Name",
              "Address",
              "City",
              "State",
              "Zip",
              "Country"
              ]
          } 
          rows={employees} 
          values={
            [
              "DEPARTMENT",
              "EMP_NAME",
              "ADDRESS",
              "CITY",
              "ZIPCODE",
              "STATE",
              "COUNTRY",
            ]
          }
          hideButton={true} /> : <Typography>No employee data</Typography>}
        <ButtonWrapper>
          <EmployeeModal />
        </ButtonWrapper>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <ScheduleTab />
      <ButtonWrapper>
          <ScheduleModal />
        </ButtonWrapper>
      </TabPanel>
    </Box>
  );
}
