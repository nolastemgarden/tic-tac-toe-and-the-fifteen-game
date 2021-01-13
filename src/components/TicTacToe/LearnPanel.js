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
        // flex: '1 0 65%',
        height: 'calc(100% - 4.0rem)',
        display: 'flex',
        flexDirection: 'column',
        padding: '0.0rem 1rem',
        overflow: 'scroll'
    },
    controls: {
        // border: 'solid green 1px',
        // flex: '1 0 35%',
        height: '4.0rem',
        display: 'flex',
        // flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    button: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        // margin: '0.5rem 1.0rem',
        width: '45%',
        height: '3.0rem',
        lineHeight: '1.4rem',
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

    return (
        <Box className={classes.panel}>
            <Box className={classes.infoArea} >
                {/* <Typography align='center' component='h1' variant='h4' noWrap gutterBottom>
                {gameStatus}
                </Typography> */}
                <Typography align='justify' variant='body1' >
                    {commentary}
                </Typography>
            </Box>
            <Box className={classes.controls} >
                <UndoButton 
                    handleUndoClick={handleUndoClick}
                />
                <ShowHintsButton
                    toggleShowHints={toggleShowHints}
                />
            </Box>
        </Box>
    )

    
    function UndoButton(props) {
        const classes = useStyles();
        const handleUndoClick = props.handleUndoClick
        return (
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={() => handleUndoClick()}
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