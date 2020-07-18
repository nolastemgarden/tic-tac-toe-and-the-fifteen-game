import React, { useState } from 'react';

// Custom Components
import TicTacToeHelpModal from "./modals/TicTacToeHelpModal";
import TicTacToeSettingsModal from "./modals/TicTacToeSettingsModal";
import FifteenGameHelpModal from "./modals/FifteenGameHelpModal";
import FifteenGameSettingsModal from "./modals/FifteenGameSettingsModal";

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
        width: '100%',
        height: '100%',
        
        display: 'flex',
        flexDirection: 'row',
        
    },
    infoArea: {
        // border: 'solid red 1px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'stretch',
        // maxHeight: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        paddingRight: '5vmin',
    },
    gameStatus: {
        fontSize: '2rem',
        fontWeight: 'bold'
    },
    commentary: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        flex: '1 0 70%'
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
        // fontSize: 'min(max(0.7rem, 3vmin), 24px)',
        fontSize: 'min(20px, 1rem)',
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
    const status = props.status;
    const commentary = props.commentary;

    const handleUndoButtonClick = props.handleUndoButtonClick
    const handleNewGameButtonClick = props.handleNewGameButtonClick

    
    const showMoves = props.showMoves 
    const showCommentary = props.showCommentary 
    const toggleShowMovesSwitch = props.toggleShowMovesSwitch
    const toggleShowCommentarySwitch = props.toggleShowCommentarySwitch
    
    
    const undoButton = (
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleUndoButtonClick()}
            disabled={(status === "Player one wins!" || status === "Player two wins!" || status === "Draw.")}
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

    let helpButton = "";
    let settingsButton = "";

    if (gameType === 'TicTacToe'){
        helpButton = (
            <Box className={classes.button} >
                <TicTacToeHelpModal />
            </Box>
        );
        settingsButton = (
            <Box className={classes.button} >
                <TicTacToeSettingsModal
                    showMoves={showMoves}
                    showCommentary={showCommentary}
                    toggleShowMovesSwitch={toggleShowMovesSwitch}
                    toggleShowCommentarySwitch={toggleShowCommentarySwitch}
                />
            </Box>
        )
    }
    if (gameType === 'FifteenGame') {
        helpButton = (
            <Box className={classes.button} >
                <FifteenGameHelpModal />
            </Box>
        );
        settingsButton = (
            <Box className={classes.button} >
                <FifteenGameSettingsModal
                    showMoves={showMoves}
                    showCommentary={showCommentary}
                    toggleShowMovesSwitch={toggleShowMovesSwitch}
                    toggleShowCommentarySwitch={toggleShowCommentarySwitch}
                />
            </Box>
        )
    }
    
    

    

    
    return (
        <Grid container className={classes.root}>
            <Grid item className={classes.infoArea} xs={8}>
                <Typography className={classes.gameStatus} noWrap >
                    {status}
                </Typography>
                {/* <Typography variant='body2' className={classes.commentary}  >
                    {commentary}
                </Typography> */}
                {commentary}
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


