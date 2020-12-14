import React from 'react';

// React ROUTER
import { Link as RouterLink } from "react-router-dom";


// MY COMPONENTS
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
// import SpacerBox from "./SpacerBox";

// Image Imports
import logo from "../../images/nsgLogoSnipped.png";
import logo2 from "../../images/nsgLogo100px.png";


// MATERIAL-UI COMPONENTS
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Grow from '@material-ui/core/Grow';
// import Paper from '@material-ui/core/Paper';
// import Popper from '@material-ui/core/Popper';
// import MenuList from '@material-ui/core/MenuList';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuIcon from '@material-ui/icons/Menu';
// import Link from '@material-ui/core/Link';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Icon from '@material-ui/core/Icon';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: theme.palette.primary.main,
        zIndex: '1200',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
    navbar: {
        width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.main, 
        display: 'flex',
        color: theme.palette.common.white,
    },
    oneSizeNavbar: {
        height: '4.0rem',
    },
    

    navbarContainer: {
        height: '100%',
        backgroundColor: theme.palette.primary.main, 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'flex-end'

    },

    logo: {
        // border: 'solid red 1px',
        height: '100%',
        backgroundImage: `
            url(${logo})  
        `,
        backgroundPosition: 'left bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 95%',
    },
    // mobileBrand: {
    //     height: '100%',

    //     // border: 'solid blue 1px',
    //     // paddingTop: '0.4rem',
    //     // paddingBottom: '0.1rem',
    //     flex: '2 0 60%',
    //     display: 'flex',
    //     // flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    pageTitle: {
        // border: 'solid red 1px',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    
    desktopMenuButton: {
        color: theme.palette.common.white,
        textTransform: "none",
        textAlign: 'center',
        paddingBottom: '0.5rem',
    },
    desktopMenuDropDown: {
        border: 'solid white 0.1px',
        backgroundColor: theme.palette.primary.main, // Matches Logo Background
    },

    listItem: {
        color: theme.palette.common.white,
    },
    icon: {
        width: '45px',
        color: theme.palette.common.white,
        alignContent: 'center',
        justifyContent: 'center',
    },
    spacerBox: {
        // border: 'solid red 1px',
        padding: '1.90rem'
    },
}));




export default function Navbar(props) {
    const classes = useStyles();
    return (
        <Box className={classes.root}  >
            <OneSizeNavbar pageTitle={props.pageTitle} />
            <Box className={classes.spacerBox}
                display={{ xs: 'block' }}
            />
        </Box>
        // <Box className={classes.root}  >
        //     <MobileNavbar pageTitle={props.pageTitle} />
        //     <DesktopNavbar pageTitle={props.pageTitle} />
        //     <SpacerBox />
        // </Box>
    )
}

function OneSizeNavbar(props) {
    const classes = useStyles();
    const pageTitle = props.pageTitle;

    return (
        <Box  >
            <AppBar
                className={classes.navbar, classes.oneSizeNavbar}
                position="fixed"
                elevation={3}
            >
                <Container
                    className={classes.navbarContainer}
                    maxWidth='md'
                    disableGutters
                >
                    <Grid container>
                        <Grid item xs={2} >
                            <Box className={classes.logo} />
                        </Grid>
                        <Grid item xs={8} >
                            <Typography className={classes.pageTitle} align='center' variant='h4' >
                                {pageTitle}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} >
                            <MobileMenu />
                        </Grid>
                    </Grid>
                </Container>
            </AppBar>

            {/* <AppBar
                className={classes.navbar, classes.mobileNavbar}
                
            ></AppBar> */}


        </Box>
    );
}


function MobileNavbar(props) {
    const classes = useStyles();
    const pageTitle = props.pageTitle;

    return (
        <Box display={{ xs: 'block', md: 'none' }} >
            <AppBar
                className={classes.navbar, classes.mobileNavbar}
                position="fixed"
                elevation={3}
            >
                <Container
                    className={classes.navbarContainer}
                    maxWidth='md'
                    disableGutters
                >
                    <Grid container>
                        <Grid item xs={2} >
                            <Box className={classes.logo} />
                        </Grid>
                        <Grid item xs={8} >
                            <Typography className={classes.pageTitle} align='center' variant='h4' >
                                {pageTitle}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} >
                            <MobileMenu />
                        </Grid>
                    </Grid>
                </Container>
            </AppBar>
        </Box>
    );
}




function DesktopNavbar(props) {
    const classes = useStyles();
    const pageTitle = props.pageTitle;

    return (
        <Box display={{ xs: 'none', md: 'block' }} >
            <AppBar
                className={classes.navbar, classes.desktopNavbar}
                position="fixed"
                elevation={3}
            >
                <Container
                    className={classes.navbarContainer}
                    maxWidth='md'
                    disableGutters
                >
                    <Grid container>
                        <Grid item xs={2} >
                            <Box className={classes.logo} />
                        </Grid>
                        <Grid item xs={8} >
                            <Typography className={classes.pageTitle} align='center' variant='h4' >
                                {pageTitle}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} >
                            <DesktopMenu />
                        </Grid>
                    </Grid>
                    {/* <Box className={classes.logo} />
                    <Box className={classes.desktopBrand} >
                        STEM <br />Garden
                    </Box>

                    <Box className={classes.desktopMenuButtons} >
                        
                        <Button
                            className={classes.button}
                            variant="outlined"
                            color="primary"
                            component={RouterLink}
                            to='/tic-tac-toe'
                        >
                            Play<br />Tic-Tac-Toe
                        </Button>

                        <Button
                            className={classes.button}
                            variant="outlined"
                            color="primary"
                            component={RouterLink}
                            to='/fifteen-game'
                        >
                            Play the<br />15-Game
                        </Button> */}
                    {/* </Box> */}
                    
                    
                </Container>
            </AppBar>
            
        </Box>
    );
}




