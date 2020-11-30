// Status Panel for the Tic-Tac-Toe Game

import React, { useState } from 'react';

// Custom Components
import TicTacToeHelpModal from "./TicTacToeHelpModal";
import TicTacToeSettingsModal from "./TicTacToeSettingsModal";

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
        // border: 'solid red 1px',
        width: '100%',
        height: '100%',
        // flex: '1 0 30%',


        display: 'flex',
        flexDirection: 'column',
        


    },
    infoArea: {
        // border: 'solid red 1px',
        // height: '100%',
        flex: '1 0 40%',
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'stretch',
        // maxHeight: '100%',
        overflow: 'hidden',
        textOverflow: 'hidden',
        padding: '0.8rem 0.5rem 0.0rem 0.5rem',
    },
    commentary: {
        // border: 'solid red 1px',
        height: '5rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        flex: '1 0 25%'
    },
    buttonArea: {
        // border: 'solid red 1px',
        padding: '0.5rem 0.5rem',
        // marginBottom: '0',
        // flex: '1 0 45%',
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'space-around',
        // alignItems: 'center',
    },
    button: {
        width: '100%',
        height: '2.5rem',
        // display: 'flex',  // MUI Buttons have display flex by default.
        justifyContent: 'center',
        alignItems: 'center',
        // fontSize: 'min(max(0.7rem, 3vmin), 24px)',
        fontSize: 'min(18px, 1.0rem)',
    },
    buttonIcon: {
        marginRight: '1vmin',
        fontSize: 'larger'
        // fontSize: 'min(max(0.7rem, 3vmin), 22px)',
    },
    switchLabel: {
        lineHeight: '1rem'
    },

}));

export default function Panel(props) {
    const classes = useStyles();

    const gameType = props.gameType;

    const gameOver = props.gameOver;
    const moveNumber = props.moveNumber;
    const status = props.status;
    const commentary = props.commentary;

    const handleNewGameButtonClick = props.handleNewGameButtonClick


    const showMoves = props.showMoves
    const showCommentary = props.showCommentary
    const toggleShowMovesSwitch = props.toggleShowMovesSwitch
    const toggleShowCommentarySwitch = props.toggleShowCommentarySwitch

    return (
        <Box className={classes.panel}>
            <Box className={classes.infoArea} >
                <Typography variant='h3' noWrap >
                    {status}
                </Typography>
                <Typography variant='body2' className={classes.commentary}  >
                    {commentary}
                </Typography>
            </Box>
            <Grid container spacing={1} className={classes.buttonArea} >
                <Grid item xs={6} >
                    <UndoButton />
                </Grid>
                <Grid item xs={6} >
                    <NewGameButton />
                </Grid>
                <Grid item xs={6} >
                    <HelpButton />
                </Grid>
                <Grid item xs={6} >
                    <SettingsButton />
                </Grid>
            </Grid>
        </Box>
    )

}


function UndoButton(props) {
    const classes = useStyles();
    const handleUndoButtonClick = props.handleUndoButtonClick


    return (
        <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => handleUndoButtonClick()}
            disabled={props.gameOver || props.moveNumber < 1}
        >
            <UndoIcon className={classes.buttonIcon} />
            Undo
        </Button>
    )
} 

function NewGameButton(props) {
    const classes = useStyles();
    const handleNewGameButtonClick = props.handleNewGameButtonClick;

    return (
        <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => handleNewGameButtonClick()}
            // disabled={!props.gameOver}
        >
            <ReplayIcon className={classes.buttonIcon} />
            New&nbsp;Game
        </Button>
    )
}

function HelpButton(props) {
    const classes = useStyles();
    const handleUndoButtonClick = props.handleUndoButtonClick


    return (
        <Box className={classes.button} >
            <TicTacToeHelpModal />
        </Box>
    )
} 

function SettingsButton(props) {
    const classes = useStyles();
    const handleUndoButtonClick = props.handleUndoButtonClick


    return (
        <Box className={classes.button} >
            <TicTacToeSettingsModal
                showMoves={props.showMoves}
                showCommentary={props.showCommentary}
                toggleShowMovesSwitch={props.toggleShowMovesSwitch}
                toggleShowCommentarySwitch={props.toggleShowCommentarySwitch}
            />
        </Box>
    )
} 
