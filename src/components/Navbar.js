import React from 'react';
import {
    Link as RouterLink,
} from "react-router-dom";


// My Components
import logo from "../images/nsgLogo100px.png";


// MUI  components
import Box from '@material-ui/core/Box';
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

    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '5%',
        width: '100%',
        margin: '0',
        fontSize: 'min(max(1rem, 4vmin), 30px)',

    },
    title: {
        // border: 'solid red 1px',
        color: 'navy',
        marginLeft: '1rem',
        fontSize: 'inherit',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    menuListItem: {
        fontSize: 'min(max(0.7rem, 3vmin), 24px)',
    },
    icon: {
        color: 'navy',
        fontSize: 'larger',
        marginRight: '1rem',
        marginTop: '0.5vmin'
    },



    logo: {
        // border: 'solid red 1px',
        marginLeft: '1rem',
        width: '7%',
        paddingTop: '7%',

        backgroundImage: `
            url(${logo})  
        `,
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '90%',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
}));


export default function Navbar(props) {
    const classes = useStyles();
    const pageTitle = props.pageTitle;

    return (
        <Box className={classes.root} >
            <Box className={classes.logo}  >
            </Box>

            
            <Typography className={classes.title} variant="h6" noWrap >
                {pageTitle}
            </Typography>
              
            <Box className={classes.Menu}  >
                <SimpleMenu />
            </Box>
        </Box>
    );
}

// Adapted from MUI Docs
function SimpleMenu(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    
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
                    onClick={handleClose}
                    className={classes.menuListItem}
                >
                    Welcome
                </MenuItem>
                <MenuItem
                    component={RouterLink}
                    to='/tic-tac-toe'
                    onClick={handleClose}
                    className={classes.menuListItem}
                >
                    Play Tic Tac Toe
                </MenuItem>
                <MenuItem
                    component={RouterLink}
                    to='/fifteen-game'
                    onClick={handleClose}
                    className={classes.menuListItem}
                >
                    Play the Fifteen Game
                </MenuItem>
                <MenuItem
                    component={RouterLink}
                    to='/magic-squares'
                    onClick={handleClose}
                    className={classes.menuListItem}
                >
                    Learn about Magic Squares
                </MenuItem>
                <MenuItem
                    component={RouterLink}
                    to='/strategy'
                    onClick={handleClose}
                    className={classes.menuListItem}
                >
                    Learn Tic Tac Toe Strategy
                </MenuItem>
                <MenuItem
                    component={Link}
                    to='https://www.nolastemgarden.com'
                    onClick={handleClose}
                    className={classes.menuListItem}
                >
                    Nola Stem Garden Home
                </MenuItem>
            </Menu>
        </div>
    );
}



