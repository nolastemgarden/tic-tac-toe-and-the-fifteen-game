// Status Panel for the Tic-Tac-Toe Game

import React from 'react';

// Custom Components
import HelpModal from "./HelpModal";

// MUI Components
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';


import ReplayIcon from '@material-ui/icons/Replay';

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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '40%',
        // padding: '1.0rem 2.0rem 0.0rem ',

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
        height: '3.0rem',
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

    // const mode = props.mode

    const gameStatus = props.gameStatus;
    const gameNumber = props.gameNumber;
    const commentary = props.commentary;

    const handleNewGameClick = props.handleNewGameClick


    // let difficultyModeButtons = (
    //     <React.Fragment  >
    //         <Button
    //             className={difficultyMode === "easy" ? classes.selectedButton : classes.unselectedButton}
    //             variant={'contained'}
    //             onClick={() => handleDifficultyModeChange("easy")}
    //         >
    //             Easy
    //         </Button>
    //         <Button
    //             className={difficultyMode === "medium" ? classes.selectedButton : classes.unselectedButton}
    //             variant={'contained'}
    //             onClick={() => handleDifficultyModeChange("medium")}
    //         >
    //             Medium
    //         </Button>
    //         <Button
    //             className={difficultyMode === "hard" ? classes.selectedButton : classes.unselectedButton}
    //             variant={'contained'}
    //             onClick={() => handleDifficultyModeChange("hard")}
    //         >
    //             Hard
    //         </Button>
    //     </React.Fragment>
    // )

    const scoreBoard = (
        <React.Fragment>
            <Typography align='center' component='h1' variant='h4' noWrap gutterBottom>
                Game {gameNumber}:&nbsp;&nbsp;{gameStatus}
            </Typography>
            <Typography align='center' component='h3' variant='h5' noWrap >
                Human: {props.record[0]} &emsp;  Bot: {props.record[1]} &emsp;  Draw: {props.record[2]}
            </Typography>
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
                {scoreBoard}
            </Box>
            <Box className={classes.controls} >
                {playButtons}
            </Box>
        </Box>
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

// function SettingsButton(props) {
//     const classes = useStyles();
//     const handleUndoButtonClick = props.handleUndoButtonClick


//     return (
//         <Box className={classes.button} >
//             <TicTacToeSettingsModal
//                 showMoves={props.showMoves}
//                 showCommentary={props.showCommentary}
//                 toggleShowMovesSwitch={props.toggleShowMovesSwitch}
//                 toggleShowCommentarySwitch={props.toggleShowCommentarySwitch}
//             />
//         </Box>
//     )
// } 