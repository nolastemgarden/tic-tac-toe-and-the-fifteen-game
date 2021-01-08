import React, { useState } from 'react';

// Custom Components
import HelpModal from "./HelpModal";
// import FifteenGameSettingsModal from "./FifteenGameSettingsModal";

// MUI Components
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';


import ReplayIcon from '@material-ui/icons/Replay';
import UndoIcon from '@material-ui/icons/Undo';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    panel: {
        width: '100%',
        height: '100%',

    },
    infoArea: {
        // border: 'solid green 1px',
        // padding: '1.0rem 0.0rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

        height: '50%',

    },
    // gameStatus: {
    //     fontSize: '2rem',
    //     fontWeight: 'bold'
    // },
    // commentary: {
    //     overflow: 'hidden',
    //     textOverflow: 'ellipsis',
    //     flex: '1 0 55%'
    // },
    controls: {
        height: '50%',
    },
    difficultyModeBox: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    otherButtonsBox: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'flex-start'
    },

    button: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        margin: '0.5rem 1.0rem',
        width: '70%',
        height: '30%',
        maxHeight: '3.0rem',
        fontSize: '1.2rem',
    },
    selectedButton: {
        color: theme.palette.common.white,
        backgroundColor: 'rgba(46, 107, 18, 1.0)',
        margin: '0.5rem 1.0rem',
        width: '70%',
        height: '30%',
        maxHeight: '3.0rem',
        fontSize: '1.2rem',
    },
    unselectedButton: {
        color: '#999999',
        backgroundColor: 'rgba(46, 107, 18, 0.5)',
        margin: '0.5rem 1.0rem',
        width: '70%',
        height: '30%',
        maxHeight: '3.0rem',
        fontSize: '1.2rem',
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

    const gameNumber = props.gameNumber;
    const gameStatus = props.gameStatus;
    const moveNumber = props.moveNumber;
    // const handleUndoButtonClick = props.handleUndoButtonClick
    const handleNewGameClick = props.handleNewGameClick
    
    const difficultyMode = props.difficultyMode
    // const setDifficultyMode = props.setDifficultyMode
    const handleDifficultyModeChange = props.handleDifficultyModeChange


    const showMoves = props.showMoves
    const showCommentary = props.showCommentary
    const toggleShowMovesSwitch = props.toggleShowMovesSwitch
    const toggleShowCommentarySwitch = props.toggleShowCommentarySwitch


    const newGameButton = (
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleNewGameClick()}
            disabled={!gameOver(gameStatus)}
        >
            <ReplayIcon className={classes.buttonIcon} />
            Play&nbsp;Again
        </Button>
    );

    

    let difficultyModeButtons = (
        <React.Fragment  >
            <Button
                className={difficultyMode === "easy" ? classes.selectedButton : classes.unselectedButton}
                variant={'contained'}
                onClick={() => handleDifficultyModeChange("easy")}
            >
                Easy
            </Button>
            <Button
                className={difficultyMode === "medium" ? classes.selectedButton : classes.unselectedButton }
                variant={'contained'}
                onClick={() => handleDifficultyModeChange("medium")}
            >
                Medium
            </Button>
            <Button
                className={difficultyMode === "hard" ? classes.selectedButton : classes.unselectedButton }
                variant={'contained'}
                onClick={() => handleDifficultyModeChange("hard")}
            >
                Hard
            </Button>
        </React.Fragment>
    )

    function gameOver(gs = gameStatus) {
        return (gs === `Bot Wins!` || gs === `Player Wins!` || gs === `Game Over. Draw.`)
    }




    return (
        <Grid container className={classes.panel}>
            <Grid item className={classes.infoArea} xs={12}>
                <Typography align='center' component='h1' variant='h3' noWrap gutterBottom>
                    Game {gameNumber}:&nbsp;&nbsp;{gameStatus}
                </Typography> 
                <Typography align='center' component='h3' variant='h4' noWrap >
                    Human: {props.record[0]} &emsp;  Bot: {props.record[1]} &emsp;  Draw: {props.record[2]} 
                </Typography> 
                
            </Grid>
            <Grid container item className={classes.controls} xs={12}  >
                <Grid item className={classes.difficultyModeBox} xs={6} >
                    {difficultyModeButtons}
                </Grid>
                <Grid item className={classes.otherButtonsBox} xs={6}>
                    {newGameButton}
                    <HelpModal />
                </Grid>
                
                
            </Grid>
            
        </Grid>
    )

}


