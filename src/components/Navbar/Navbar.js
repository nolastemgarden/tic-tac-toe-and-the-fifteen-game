import React from 'react';

// MY COMPONENTS
import MobileMenu from "./MobileMenu";

// Image Imports
import logo from "../../images/nsgLogoSnipped.png";


// MATERIAL-UI COMPONENTS
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';


import { makeStyles } from '@material-ui/core/styles';


const heightInRem = 3.6;
const height = `${heightInRem}rem`;
const halfHeight = `${heightInRem/2}rem`;

const useStyles = makeStyles((theme) => ({
    navbarRoot: {
        // border: 'solid blue 1px',
        width: '100vw',
        height: height,

        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,

        zIndex: '1200',
        display: 'flex',

    },
    navbarContainer: {
        // border: 'solid blue 1px',
        height: height,
        backgroundColor: 'inherit',
        display: 'flex',
        flexDirection: 'row',
    },
    spacerBox: {
        // border: 'solid blue 1px',
        // padding: halfHeight,
        padding: height,
    },
    logo: {
        height: height,
        width: height,
        backgroundImage: `
            url(${logo})  
        `,
        backgroundPosition: 'left bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 95%',
    },
    pageTitle: {
        // border: 'solid red 1px',
        height: '100%',
        flex: '2 1 80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    icon: {
        width: '45px',
        color: theme.palette.common.white,
        alignContent: 'center',
        justifyContent: 'center',
    },
    
}));


export default function Navbar(props) {
    const classes = useStyles();
    return (
        <Box className={classes.navbarRoot} >
            <OneSizeNavbar pageTitle={props.pageTitle} />
            <Box className={classes.spacerBox} />
        </Box>
        
    )
}

function OneSizeNavbar(props) {
    const classes = useStyles();
    const pageTitle = props.pageTitle;

    return (
        <Box  >
            <AppBar
                className={classes.navbar}
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

