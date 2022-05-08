import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {Box,Button} from '@mui/material';
import { styled } from '@mui/system';
import {useRecoilState, useRecoilValue, atom} from 'recoil';
import {
    dogsList,
    bookingList,
    calendarList
} from '../recoil/customerAtom';
import Axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import CustomerTable from './customerTable';
import Availability from './availability';
import DogForm from './dogForm';

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

  // data
  const [dogs, setDogs] = useRecoilState(dogsList)
  const [bookings, setBookings] = useRecoilState(bookingList)
  const [calendar, setCalendar] = useRecoilState(calendarList)
  const [userData, setUserData] = useState({})
  const [schedules, setSchedules] = useState([])
  const { user } = useParams()
  const [cost, setCost] = useState([])
  
  const [showDogForm, setShowDogForm] = useState(false)

  const timeConverter = (time) => {
    const ISOString = time.toISOString().slice(0,16).replace('T', ' ')
    return ISOString
}
  const dogModalHandler = () => {
    setShowDogForm(!showDogForm)
  }

  const filterCustomerDogs = (dogsArray,name) => {
    return dogsArray.find(el => el.DOG_NAME === name ).DOG_ID
  }
  const getEmployeeID = (scheduleArray, empName) => {
    // console.log(scheduleArray, empName)
    return scheduleArray[0].find( el => el.EMP_NAME == empName)
  }

  const deleteBooking = (e) => {
    const date = new Date(e.TIME_DATE)    
    const payload = {
        TIME_DATE: timeConverter(date),
        USER_ID: getEmployeeID(schedules, e.EMP_NAME).EMP_ID,
        DOG_ID: filterCustomerDogs(dogs, e.DOG_NAME)
      } 
      console.log(payload)

      Axios.delete('https://pawsitivedogdaycare.herokuapp.com/calendar/delete/',  {
        data:payload
      })
      .then(res => {
          console.log(res)
          window.location.reload(false)
          a11yProps(3)
      })
      .catch(err => {
          console.log(err)
      })
    }
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {

    // getuser details
    Axios.post("https://pawsitivedogdaycare.herokuapp.com/customers/custById",{"USER_ID":user})
    .then(res => {
        setUserData(res.data.customers)
    })
    .catch(err => {
        console.log(err)
    });

    //   get user dogs
    console.log(user)
    Axios.post("https://pawsitivedogdaycare.herokuapp.com/dogs/findByUser",{"USER_ID":user})
    .then(res => {
        setDogs(res.data.dogs)
    })
    .catch(err => {
        console.log(err)
    })

    // get booking by user

    Axios.post("https://pawsitivedogdaycare.herokuapp.com/schedules/findByCust",{"USER_ID":user})
    .then(res => {
        setBookings(res.data.schedules)
    })
    .catch(err => {
        console.log(err)
    })

    // get calendar

    Axios.get("https://pawsitivedogdaycare.herokuapp.com/calendar")
    .then(res => {
        setCalendar(res.data.calendar)
    })
    .catch(err => {
        console.log(err)
    })
    
    // get total cost of bookings
    Axios.post("https://pawsitivedogdaycare.herokuapp.com/calendar/findPriceByUser", {"USER_ID": user})
    .then(res => {
        console.log(res.data)
        setCost(res.data.calendar[res.data.calendar.length - 1])
    })
    .catch(err => {
        console.log(err)
    })


    // get schdules
    Axios.get('https://pawsitivedogdaycare.herokuapp.com/schedules')
    .then(res => {
      setSchedules(res.data.schedules)
    })
    .catch( err => {
      console.log(err)
    })
  },[
  
  ])

  const deleteDog = (row) => {
    
    Axios.delete(`https://pawsitivedogdaycare.herokuapp.com/dogs/${row["DOG_ID"]}`)
    .then(res => {
        console.log(res)
        window.location.reload(false)
    })
    .catch(err => {
        console.log(err)
    })
}

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Dogs" {...a11yProps(0)} />
          <Tab label="Calendar" {...a11yProps(1)} />
          <Tab label="Bookings" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        
            <CustomerTable headers={[
                "Dog",
                "Size",
                "Breed",
                "Is Spayed/Neutered",
                "Vaccinated",
                "Age",
                "Gender",
                "Options"
            ]} 
            rows={dogs} 
            values={[
                "DOG_NAME",
                "SIZE",
                "BREED",
                "SPAYED_NEUTERED",
                "VACCINATED",
                "AGE",
                "GENDER"    
            ]}
            buttonText="Delete"
            buttonAction={deleteDog}
            
            />
          <ButtonWrapper>
            <DogForm />
        </ButtonWrapper>
      </TabPanel>
      <TabPanel  value={value} index={1}>
          <CardWrapper>
        {calendar.map(el => <Availability time={el['TIME_DATE']} empName={el['EMP_NAME']} dept={el['DEPARTMENT'] } empId={el['USER_ID']} subId={el['SUB_ID']} /> )}
        </CardWrapper>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <CustomerTable headers={[
                "Department",
                "Employee",
                "Time",
                "Customer",
                "Service",
                "Dog",
                '',
                'Options'
            ]} 
            rows={bookings} 
            values={[
                "DEPARTMENT",
                "EMP_NAME",
                "TIME_DATE",
                "CUST_NAME",
                "SERVICE",
                "DOG_NAME",
                " "   
            ]}
            buttonText="cancel"
            buttonAction={deleteBooking}
            />
        <Typography>Total Cost: {cost ? JSON.stringify(cost['TOTAL']): ""}</Typography>
      </TabPanel>
    </Box>
  );
}
