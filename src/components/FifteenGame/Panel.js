import React, { useState } from 'react';

// Custom Components
// import FifteenGameHelpModal from "./FifteenGameHelpModal";
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
        padding: '1.0rem 0.0rem',

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
    buttonArea: {
        // border: 'solid red 1px',
        padding: '0.0rem 20%',
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'space-between',
        
    },
    button: {
        width: '100%',
        height: '3.0rem',
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


    root: {
        width: '100%',
        height: '100%',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        // width: 'md',
        height: '600px',
        // border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

}));

export default function Panel(props) {
    const classes = useStyles();

    const gameNumber = props.gameNumber;
    const gameStatus = props.gameStatus;
    const moveNumber = props.moveNumber;
    // const handleUndoButtonClick = props.handleUndoButtonClick
    const handleNewGameClick = props.handleNewGameClick
    // const commentary = props.commentary;


    const showMoves = props.showMoves
    const showCommentary = props.showCommentary
    const toggleShowMovesSwitch = props.toggleShowMovesSwitch
    const toggleShowCommentarySwitch = props.toggleShowCommentarySwitch


    // const undoButton = (
    //     <Button
    //         variant="contained"
    //         color="primary"
    //         className={classes.button}
    //         onClick={() => handleUndoButtonClick()}
    //         disabled={gameOver() || moveNumber < 1}
    //     >
    //         <UndoIcon className={classes.buttonIcon} />
    //         Undo
    //     </Button>
    // );

    const newGameButton = (
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleNewGameClick()}
            disabled={!gameOver}
        >
            <ReplayIcon className={classes.buttonIcon} />
            Play&nbsp;Again
        </Button>
    );

    let helpButton = (
        <Box className={classes.button} >
            <HelpModal />
        </Box>
    )

    // let settingsButton = (
    //     <Box className={classes.button} >
    //         <FifteenGameSettingsModal
    //             showMoves={showMoves}
    //             showCommentary={showCommentary}
    //             toggleShowMovesSwitch={toggleShowMovesSwitch}
    //             toggleShowCommentarySwitch={toggleShowCommentarySwitch}
    //         />
    //     </Box>
    // )

    function gameOver(gs = gameStatus) {
        return (gs === `Bot Wins!` || gs === `Player Wins!` )
    }




    return (
        <Grid container className={classes.panel}>
            <Grid item className={classes.infoArea} xs={12}>
                <Typography align='center' component='h1' variant='h3' noWrap gutterBottom>
                    Game {gameNumber}:&nbsp;&nbsp;{gameStatus}
                </Typography> 
                {/* <Typography align='center' component='h2' variant='h4' noWrap >
                    Record:
                </Typography>  */}
                <Typography align='center' component='h3' variant='h5' noWrap >
                    Human: {props.record[0]} &emsp;&emsp; Bot: {props.record[1]} &emsp;&emsp; Draw: {props.record[2]} 
                </Typography> 
                
            </Grid>
            <Grid container item className={classes.buttonArea} xs={12}  >
                <Grid item className={classes.button} xs={12} md={6}>
                    {newGameButton}
                </Grid>
                <Grid item className={classes.button} xs={12} md={6}>
                    {helpButton}
                </Grid>
                {/* <Grid item xs={12} md={4}>
                    {settingsButton}
                </Grid> */}
            </Grid>
            
        </Grid>
    )

}


function HelpModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleOpen}
                aria-controls="simple-menu"
                aria-haspopup="true"
            >
                <HelpOutlineIcon className={classes.buttonIcon} />
                Help
            </Button>


            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Container maxWidth='md'>
                        <Box className={classes.paper} >
                            <Typography variant='h5' id="transition-modal-title" className={classes.heading} >
                                How To Play
                        </Typography>
                            <Typography variant='body1' id="transition-modal-title" className={classes.heading} gutterBottom >
                                Two players take turns claiming one of the 9 numbered cards. <br />
                            To win, a player must collect a set of exactly 3 cards that add up to exactly 15.
                        </Typography>
                            <Typography variant='body1' id="transition-modal-title" className={classes.heading} >
                                By default, you play against my bot but, if you wish, you can disable it in the settings.
                                can change this to play against my bot.
                            Two players take turns claiming one of the 9 numbered cards. <br />
                            To win, a player must collect a set of exactly 3 cards that add up to exactly 15.
                        </Typography>
                        </Box>
                    </Container>

                </Fade>
            </Modal>
        </div>
    );
}

