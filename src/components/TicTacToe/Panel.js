// Status Panel for the Tic-Tac-Toe Game

import React, { useState } from 'react';

// Custom Components
import HelpModal from "./HelpModal";
import TicTacToeSettingsModal from "./TicTacToeSettingsModal";

// MUI Components
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';


import ReplayIcon from '@material-ui/icons/Replay';
import UndoIcon from '@material-ui/icons/Undo';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    panel: {
        // border: 'solid orange 1px',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        
    },
    infoArea: {
        // border: 'solid red 1px',
        flex: '1 0 65%',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.0rem 2.0rem 0.0rem ',

    },
    controls: {
        // border: 'solid green 1px',
        flex: '1 0 35%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    button: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        margin: '0.5rem 1.0rem',
        width: '50%',
        height: '30%',
        maxHeight: '3.0rem',
        fontSize: '1.2rem',
    },
    buttonIcon: {
        marginRight: '1vmin',
        fontSize: 'larger'
        // fontSize: 'min(max(0.7rem, 3vmin), 22px)',
    },
    
}));

export default function Panel(props) {
    const classes = useStyles();

    const mode = props.mode
    const gameType = props.gameType;

    const gameOver = props.gameOver;
    const moveNumber = props.moveNumber;
    const gameStatus = props.gameStatus;
    const gameNumber = props.gameNumber;
    const commentary = props.commentary;

    const handleNewGameClick = props.handleNewGameClick
    const handleUndoClick = props.handleUndoClick
    
    const showHints = props.showHints
    const toggleShowHints = props.toggleShowHints


    const showCommentary = props.showCommentary
    const toggleShowCommentarySwitch = props.toggleShowCommentarySwitch

    const scoreBoard = (
        <React.Fragment>
            <Typography align='center' component='h1' variant='h3' noWrap gutterBottom>
                Game {gameNumber}:&nbsp;&nbsp;{gameStatus}
            </Typography>
            <Typography align='center' component='h3' variant='h4' noWrap >
                Human: {props.record[0]} &emsp;  Bot: {props.record[1]} &emsp;  Draw: {props.record[2]}
            </Typography>
        </React.Fragment>
    )

    const commentaryBoard = (
        <React.Fragment>
            <Typography align='center' component='h1' variant='h3' noWrap gutterBottom>
                {gameStatus}
            </Typography>
            <Typography align='justify' variant='body1' >
                {commentary}
            </Typography>
        </React.Fragment>
    )

    const learnButtons = (
        <React.Fragment>
            <UndoButton />
            <ShowHintsButton
                toggleShowHints={toggleShowHints}
            />

        </React.Fragment>
    )

    const playButtons = (
        <React.Fragment>
            <NewGameButton handleNewGameClick={handleNewGameClick} />
            <HelpModal />
        </React.Fragment>
    )
    
    return (
        <Box className={classes.panel}>
            <Box className={classes.infoArea} >
                {(mode === 'learn') ? commentaryBoard : scoreBoard}
            </Box>
            <Box className={classes.controls} >
                {(mode === 'learn') ? learnButtons : playButtons }
            </Box>
        </Box>
    )
}


function UndoButton(props) {
    const classes = useStyles();
    const gameOver = props.gameOver
    const moveNumber = props.moveNumber
    const handleUndoClick = props.handleUndoClick
    return (
        <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => handleUndoClick()}
            // disabled={gameOver || moveNumber < 1}
        >
            <UndoIcon className={classes.buttonIcon} />
            Undo
        </Button>
    )
} 

function ShowHintsButton(props) {
    const classes = useStyles();
    const toggleShowHints = props.toggleShowHints

    return (
        <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => toggleShowHints()}
        >
            <HelpOutlineIcon className={classes.buttonIcon} />
            Show Hints
        </Button>
    )
} 


function NewGameButton(props) {
    const classes = useStyles();
    const handleNewGameClick = props.handleNewGameClick;

    return (
        <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => handleNewGameClick()}
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
            <HelpModal />
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
