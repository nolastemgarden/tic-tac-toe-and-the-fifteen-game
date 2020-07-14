import React, { useState } from 'react';

// Custom Components
import HelpModal from "../TicTacToe/HelpModal";
import SettingsModal from "../TicTacToe/SettingsModal";

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
    root: {
        // border: 'solid red 1px',
        // marginTop: '3%',
        width: '100%',
        height: '100%',
        // padding: '3%',
        
        display: 'flex',
        flexDirection: 'row',
        
    },
    infoArea: {
        maxHeight: '100%',
        overflow: 'scroll',
    },
    buttonArea: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        height: '18%',
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        fontSize: 'min(max(0.7rem, 3vmin), 24px)',
    },
    buttonIcon: {
        marginRight: '1vmin',
        fontSize: 'larger'
        // fontSize: 'min(max(0.7rem, 3vmin), 22px)',
    },
    switchLabel: {
        lineHeight: '1rem'
    },
    statusText: {
        fontSize: '5vmin',
        fontWeight: 'bold'
    },
    commentary: {
        fontSize: 'max(1rem, 2.2vmin)',
        paddingRight: '5vmin',
        overflow: 'hidden'
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
            onClick={() => handleUndoButtonClick()}
            
        >
            <UndoIcon className={classes.buttonIcon} />
            Undo
        </Button>

        
    );

    const newGameButton = (
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleNewGameButtonClick()} 
        >
            <ReplayIcon className={classes.buttonIcon} />
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
            <SettingsModal 
                showMoves={showMoves}
                showCommentary={showCommentary}
                toggleShowMovesSwitch={toggleShowMovesSwitch}
                toggleShowCommentarySwitch={toggleShowCommentarySwitch}
            />
        </div>
    );

    return (
        <Grid container className={classes.root}>
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
    )

}


