import React from 'react';
import { Box, Button, Typography} from '@mui/material'
import { styled } from '@mui/system'
import logo from '../assets/logo.png'
import {Link} from 'react-router-dom'
import {useRecoilValue} from 'recoil'
import {loggedUser} from '../recoil/userAtom'
import {useNavigate, useParams} from 'react-router-dom'

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
    height: "50px",
    display:'flex',
    alignItems:'center',
    flexFlow:'row-reverse'
})

const HomeBtn = styled(Button)({
    color:'black'
})


const Nav = () => {

    const navigate = useNavigate()
    const {user} = useParams()

    const clickHandler = (e) => {
        e.preventDefault()
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('token');
        navigate('/login/user')

    }

    return (
        <NavBar>
        <Left >
            <Logo src = {logo}/> 
        </Left > 
        <Right>
            <Link to='/login/user'>
            <HomeBtn onClick={ clickHandler}>Sign Out </HomeBtn>
            </Link>   
            <Typography variant='p'> Welcome,{user} </Typography>
        </Right> 
    </NavBar>
    )
}

export default Nav