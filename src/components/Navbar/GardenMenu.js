import React from 'react';

// ICONS
import MenuIcon from '@material-ui/icons/Menu';

// MATERIAL-UI COMPONENTS
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Button from '@material-ui/core/Button';
import {
    Menu,
    ListSubheader,
    Divider,
} from '@material-ui/core';


import { makeStyles } from '@material-ui/core/styles';
import { findAllByPlaceholderText } from '@testing-library/react';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
    navbar: {
        // height: '3.5rem',
        width: '100vw',
        backgroundColor: theme.palette.primary.main, // Matches Logo Background
        display: 'flex',
        color: '#fff',
    },
    mobileNavbar: {
        height: '3.5rem',
        width: '100vw',
        backgroundColor: theme.palette.primary.main, // Matches Logo Background
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        color: '#fff',
    },
    desktopNavbar: {
        height: '7rem',
        width: '100vw',
        backgroundColor: theme.palette.primary.main, // Matches Logo Background
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        color: '#fff',
    },

    navbarContainer: {
        // border: 'solid red 1px',
        height: '100%',
        backgroundColor: theme.palette.primary.main, // Matches Logo Background
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'flex-end'

    },


    desktopMenuButton: {
        border: 'solid yellow 1px',

        color: theme.palette.common.white,
        textTransform: "none",
        fontSize: '1rem',
        // justifyContent: 'flex-end',
        // paddingBottom: '1rem',
        flex: '1 0 12%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
        alignItems: 'center',
        textAlign: 'center'
    },

    businessType: {
        lineHeight: '1.0'
    },
    menu: {
        // border: 'solid red 1px',
        height: '100%',
        // paddingLeft: '2rem',
        flex: '0 0 15%',
        display: 'flex',
        justifyContent: 'flex-end'

    },
    menuButton: {

        color: theme.palette.common.white
    },

}));

export default function MobileMenu() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box className={classes.menu}>
            <Button
                className={classes.menuButton}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MenuIcon className={classes.menuIcon} />
            </Button>


            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClick={handleClose}
                className={classes.menuItems}
            >
                <ListSubheader className={classes.stickySubheader}>
                    Teaching Services
                    </ListSubheader>
                <Divider />
                <ListSubheader className={classes.stickySubheader}>
                    About the Garden
                    </ListSubheader>
                <Divider />
                <ListSubheader className={classes.stickySubheader}>
                    Programs
                    </ListSubheader>
                <Divider />
                <ListSubheader className={classes.stickySubheader}>
                    Contact
                    </ListSubheader>

            </Menu>
        </Box>
    );
}