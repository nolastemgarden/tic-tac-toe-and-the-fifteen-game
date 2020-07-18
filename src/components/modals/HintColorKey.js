import React, { useState } from 'react';

import '../games/TicTacToe.css';

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


// How do I get this CSS var 
const immediateWin = `var(--immediate-win-bg-color)`;
console.log(`immediateWin: ${immediateWin}`)



const useStyles = makeStyles((theme) => ({
    root: {
        border: 'solid #bbb 0.2px',
        boxSizing: 'border-box',
        marginTop: '1rem',
        width: '100%',
    },
    
    keyItem: {
        border: 'solid #bbb 0.2px',
        boxSizing: 'border-box',
        // width: '40%',
        flexGrow: '2',
        display: 'flex',
        alignItems: 'center',
        
    },

    colorTile: {
        // border: 'solid blue 1px',
        margin: '1%',
        marginRight: '1rem',
        borderRadius: '15%',

        width: '4vmin',
        height: '4vmin',
    },

    immediateWin: {
        borderRadius: '20%',
        width: '100%',
        height: '100%',
        backgroundColor: '#00BB00',
        // backgroundColor: immediateWin
    },
    
    doubleAttackCreatingMove: {
        borderRadius: '20%',
        width: '100%',
        height: '100%',
        backgroundColor: '#55bb00'
    },
    forcedWinCreatingMove: {
        borderRadius: '20%',
        width: '100%',
        height: '100%',
        backgroundColor: '#88ee33'
    },

    urgentDefensiveMove: {
        borderRadius: '20%',
        width: '100%',
        height: '100%',
        backgroundColor: '#ff6600'
    },
    unavoidableDefeat: {
        borderRadius: '20%',
        backgroundColor: '#ff4433',
        width: '100%',
        height: '100%',
    },
    gameLosingMove: {
        borderRadius: '20%',
        backgroundColor: '#EEDD11',
        width: '100%',
        height: '100%',
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
                <Box className={classes.colorTile}  >
                    <Box className={classes.unavoidableDefeat}  >

                    </Box>
                </Box>
                <Typography variant="h5">
                    Unavoidable Defeat
                </Typography>
            </Grid>

            <Grid item xs={6} className={classes.keyItem} >
                <Box className={classes.colorTile}  >
                    <Box className={classes.doubleAttackCreatingMove}  >

                    </Box>
                </Box>
                <Typography variant="h5">
                    Double Attack
                </Typography>
            </Grid>

            <Grid item xs={6} className={classes.keyItem} >
                <Box className={classes.colorTile}  >
                    <Box className={classes.urgentDefensiveMove}  >

                    </Box>
                </Box>
                <Typography variant="h5">
                    Urgent Defensive Move
                </Typography>
            </Grid>
            
            
            <Grid item xs={6} className={classes.keyItem} >
                <Box className={classes.colorTile}  >
                    <Box className={classes.forcedWinCreatingMove}  >

                    </Box>
                </Box>
                <Typography variant="h5">
                    Winning Attack
                </Typography>
            </Grid>
            
            <Grid item xs={6} className={classes.keyItem} >
                <Box className={classes.colorTile}  >
                    <Box className={classes.gameLosingMove}  >

                    </Box>
                </Box>
                <Typography variant="h5">
                    Game Losing Mistake
                </Typography>
            </Grid>
        </Grid>

        
    );
}
