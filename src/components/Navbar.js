import React from 'react';
import {
    BrowserRouter as Router,
    Link as RouterLink,
    Route,
    Switch
} from "react-router-dom";


// My Components


// MUI  components
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'




import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    appBar: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#4AC9FD',
        height: '5vmin',
        width: '101%'


    },
    title: {
        color: 'navy',
        flexGrow: '1',
        marginLeft: '1rem',
        fontSize: '3vmin',
    },
    menuButton: {
        
    },
    icon: {
        color: 'navy',
        fontSize: '3.5vmin',
        marginRight: '1vmin',
    },
})


export default function Navbar(props) {
    const classes = useStyles();

    return (
        <Box className={classes.appBar} >
            <Typography className={classes.title} variant="h6" noWrap >
                {props.pageTitle}
            </Typography>

            <SimpleMenu />
        </Box>
    );
}

// Adapted from MUI Docs
function SimpleMenu(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const [pageTitle, setPageTitle] = React.useState("Welcome");

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (newPageTitle) => {
        // alert('closing menu');
        // alert(`You clicked: ${newPageTitle}`);
        // const newPageTitle = 
        setAnchorEl(null);
    };

    return (
        <div>
            <MenuIcon 
                className={classes.icon} 
                onClick={handleClick} 
                aria-controls="simple-menu" 
                aria-haspopup="true"
            />
            
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem
                    component={RouterLink}
                    to='/'
                    onClick={handleClose}>
                    Home
                </MenuItem>
                <MenuItem
                    component={RouterLink}
                    to='/tic-tac-toe'
                    onClick={handleClose}>
                    Play Tic Tac Toe
                </MenuItem>
                <MenuItem
                    component={RouterLink}
                    to='/fifteen-game'
                    onClick={handleClose}>
                    Play the Fifteen Game
                </MenuItem>
                <MenuItem
                    component={RouterLink}
                    to='/magic-squares'
                    onClick={handleClose}>
                    Learn about Magic Squares
                </MenuItem>
                <MenuItem
                    component={RouterLink}
                    to='/strategy'
                    onClick={handleClose}>
                    Learn Tic Tac toe Strategy
                </MenuItem>
                <MenuItem
                    component={Link}
                    to='https://www.nolastemgarden.com'
                    onClick={handleClose}>
                    Nola Stem Garden Home
                </MenuItem>
            </Menu>
        </div>
    );
}