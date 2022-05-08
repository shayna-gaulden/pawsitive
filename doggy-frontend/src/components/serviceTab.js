import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Paper, Button, Box} from '@mui/material';
import { styled } from '@mui/system';
import {editServiceData} from '../recoil/serviceFormAtom';
import {useRecoilState} from 'recoil'
import {Route,Routes, useNavigate} from "react-router-dom";
import EditServiceForm from '../pages/editService';


const TableWrapper = styled(Box)({
  width:'90%',
  margin: 'auto'
});

const ButtonWrapper = styled(Box)({
    display:'flex',
    justifyContent:'right',
    margin: '50px 0'
})

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'black',
      color: "white",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: "#E0E0E0",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


const BasicTable = ({headers, rows, values, hideButton}) => {
    const [serviceData, setServiceData] = useRecoilState(editServiceData);
    const navigate = useNavigate();
    const clickHandler = (e) => {
      setServiceData({...e})
      if(serviceData['SERVICE']){
       navigate('/editServiceForm/' + e['SERVICE'])
      } 
    }

    useEffect(() => {
    },[serviceData])

  return (
      <TableWrapper>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            {headers.map(el => <StyledTableCell>{el}</StyledTableCell>)}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {values.map(el => <StyledTableCell align="left">{row[el]}</StyledTableCell>
 )}
              <StyledTableCell style={hideButton ? {display:"none"}: {display:"block"}} align="left">
                <Button onClick={(e) => clickHandler(row)} variant='contained'>Edit</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      
    </TableContainer>
    </TableWrapper>
  );
}

export default BasicTable;