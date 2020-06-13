import React, { useState } from 'react';

import './TicTacToe.css';

// My Components
// import Square from "./Square";

// MUI Components
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';


// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '1rem',
        flexGrow: '2',
        width: '100%',
        // height: '100%',
        border: 'solid red 1px',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
    },
    
    keyItem: {
        border: 'solid blue 1px',
        width: '40%',
        flexGrow: '2',
        display: 'flex',
        alignItems: 'center',
        
    },

    colorTile: {
        border: 'solid blue 1px',
        margin: '1%',
        borderRadius: '15%',

        width: '3.5vmin',
        height: '3.5vmin',
    },

    immediateWin: {
        width: '100%',
        height: '100%',
        backgroundColor: '#00bb00'
    },
    
    doubleAttackCreatingMove: {
        backgroundColor: '#55bb00'
    },
    forcedWinCreatingMove: {
        backgroundColor: '#88ee33'
    },

    urgentDefensiveMove: {
        backgroundColor: '#ff6600'
    },
    unavoidableDefeat: {
        backgroundColor: '#ff4433'
    },
    gameLosingMove: {
        backgroundColor: '#EEDD11'
    }
}));

export default function HintColorKey() {
    const classes = useStyles();
    
    
    
    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={6} className={classes.keyItem} >
                <Box className={classes.colorTile}  >
                    <Box className={classes.immediateWin}  >

                    </Box>
                </Box>
                <Typography variant="h5">
                    Immediate Win
                </Typography>
            </Grid>
            <Grid item xs={6} className={classes.keyItem} >

            </Grid>
            <Grid item xs={6} className={classes.keyItem} >

            </Grid>
            <Grid item xs={6} className={classes.keyItem} >

            </Grid>
            <Grid item xs={6} className={classes.keyItem} >

            </Grid>
            <Grid item xs={6} className={classes.keyItem} >

            </Grid>
        </Grid>

        
    );
}
