import React, { useState } from 'react';

// Custom Components
import HelpModal from "./HelpModal";
import SettingsModal from "./SettingsModal";

// MUI Components
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';


import ReplayIcon from '@material-ui/icons/Replay';
import UndoIcon from '@material-ui/icons/Undo';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    panel: {
        boxSizing: 'border-box',
        margin: '3vmin',
        width: '68vmin',
        height: '28vmin',
        padding: '2vmin',
        
        display: 'flex',
        flexDirection: 'row',
        

    },
    infoArea: {
        
    },
    buttonArea: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        // border: 'solid red 1px',
        width: '100%',
        height: '4.4vmin',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.8vmin',
        lineHeight: '1vmin',
    },
    switchLabel: {
        lineHeight: '1rem'
    },
    statusText: {
        fontSize: '5vmin',
        fontWeight: 'bold'
    },
    commentary: {
        fontSize: '1vmin',
    },
}));

export default function Panel(props) {
    const classes = useStyles();
    const status = props.status;
    const commentary = props.commentary;

    
    const showMoves = props.showMoves 
    const showCommentary = props.showCommentary 
    const handleUndoButtonClick = props.handleUndoButtonClick
    const handleNewGameButtonClick = props.handleNewGameButtonClick
    const toggleShowMovesSwitch = props.toggleShowMovesSwitch
    const toggleShowCommentarySwitch = props.toggleShowCommentarySwitch
    
    const undoButton = (
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => props.handleUndoButtonClick()}
            startIcon={< UndoIcon />}
        >
            Undo
        </Button>
    );

    const newGameButton = (
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => props.handleNewGameButtonClick()}
            startIcon={< ReplayIcon />}
        >
            New&nbsp;Game
        </Button>
    );

    const helpButton = (
        <div className={classes.button} >
            <HelpModal />
        </div>
    );


    const settingsButton = (
        <div className={classes.button} >
            <SettingsModal />
        </div>
    );

    return (
        <Paper className={classes.panel}>
            <Grid container>
                <Grid item className={classes.infoArea} xs={8}>
                    <Typography className={classes.statusText} noWrap >
                        {status}
                    </Typography>
                    <Typography className={classes.commentary}  >
                        {commentary}
                    </Typography>
                </Grid>
                <Grid item className={classes.buttonArea} xs={4}>
                    {undoButton}
                    {newGameButton}
                    {helpButton}
                    {settingsButton}
                </Grid>
            </Grid>
            
            
            
                
             
        </Paper>
    )

}


