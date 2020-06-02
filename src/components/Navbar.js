import React from 'react';
import {
    Link as RouterLink,
} from "react-router-dom";


// My Components


// MUI  components
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography'



import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    // modal: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // paper: {
    //     backgroundColor: theme.palette.background.paper,
    //     border: '2px solid #000',
    //     boxShadow: theme.shadows[5],
    //     padding: theme.spacing(2, 4, 3),
    // },

    appBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'end',
        // backgroundColor: '#4AC9FD',
        height: '5%',
        width: '100%',
        margin: '0',
        fontSize: 'min(max(1rem, 4vmin), 30px)',

    },
    title: {
        color: 'navy',
        flexGrow: '1',
        marginLeft: '1rem',
        // fontSize: '3vmin',
        fontSize: 'inherit',
        fontWeight: 'bold'
    },
    menuButton: {
        
    },
    icon: {
        color: 'navy',
        fontSize: 'larger',
        marginRight: '1.5vmin',
        marginTop: '0.5vmin'
    },
}));


export default function Navbar(props) {
    const classes = useStyles();
    const pageTitle = props.pageTitle;

    return (
        <div className={classes.appBar} >
            <Typography className={classes.title} variant="h6" noWrap >
                {pageTitle}
            </Typography>

            
            <SimpleMenu />
        </div>
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
                // anchorOrigin={{
                //     vertical: 'bottom',
                //     horizontal: 'right',
                // }}
                // transformOrigin={{
                //     vertical: 'top',
                //     horizontal: 'right',
                // }}
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



