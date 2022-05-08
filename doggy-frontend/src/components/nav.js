import React from 'react';
import { Box, Button } from '@mui/material'
import { styled } from '@mui/system'
import logo from '../assets/logo.png'
import {Link} from 'react-router-dom'

const NavBar = styled(Box)({
    maxWidth: "100%",
    colet: "blue",
    height: "50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "20px 20px"
})

const Left = styled(Box)({
    maxWidth: "100%",
    colet: "blue",
    height: "50px"
})

const Logo = styled("img")({
    width: '40px'
})

const Right = styled(Box)({
    maxWidth: "100%",
    colet: "blue",
    height: "50px"
})

const HomeBtn = styled(Button)({
    color:'black'
})


const Nav = () => {
    return (
        <NavBar>
        <Left >
            <Logo src = {logo}/> 
        </Left > 
        <Right>
            <Link to='/login/manager'>
            <HomeBtn>Manager</HomeBtn>
            </Link>
            <Link to='/login/user'>
            <HomeBtn>User</HomeBtn>
            </Link>

            
            
        </Right> 
    </NavBar>
    )
}

export default Nav