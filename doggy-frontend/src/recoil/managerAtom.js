import {atom} from 'recoil';

 export const serviceRows = atom({
    key: 'serviceRows', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });

export  const employeeRows = atom({
    key: 'employeeeRows', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });

 export const scheduleRows = atom({
    key: 'scheduleRows', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });

 export const serviceHeaders = atom({
      key:'serviceHeaders',
      default: [
        "Services",
        "Details",
        "Price ($)",
        "Department",
        "Options"
        ]
  })

  export const serviceValues = atom({
    key:'serviceValues',
    default: [
      "SERVICE",
      "DETAILS",
      "PRICE",
      "DEPARTMENT"
      ]
})

export const employeeHeaders = atom({
    key:'employeeHeaders',
    default: [
      "Department",
      "Name",
      "Address",
      "City",
      "State",
      "Zip",
      "Country",
      "Options"
      ]
})

export const employeeValues = atom({
  key:'employeeValues',
  default: [
    "DEPARTMENT",
    "EMP_NAME",
    "ADDRESS",
    "CITY",
    "ZIPCODE",
    "STATE",
    "COUNTRY",
    
    ]
})