import React, { useState } from 'react';

// My Components
// import Square from "./Square";
import HintColorKey from "./HintColorKey";

// MUI Components
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Typography from '@material-ui/core/Typography';


// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    button: {
        // border: 'solid red 1px',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 'min(max(0.7rem, 3vmin), 24px)',
        lineHeight: '0.8vmin',
    },
    buttonIcon: {
        marginRight: '1vmin',
        fontSize: 'larger'
        // fontSize: 'min(max(0.7rem, 3vmin), 22px)',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        height: 'min(100vw, 80vh)',
        maxHeight: '950px',
        width: 'min(60vh, 75vw)',
        maxWidth: '675px',
        display: 'flex',
        flexDirection: 'column'
    },
    heading: {
        fontSize: 'min(max(1rem, 4vmin), 30px)',
        fontWeight: 'bold',
        marginBlockEnd: '0',
        marginBlockStart: '1rem',
    },
    body: {
        fontSize: 'theme.typography.pxToRem(20)',
        fontWeight: 'regular',
        marginBlockEnd: '0',
        marginBlockStart: '0',
    }
}));

export default function HowToPlayModal() {
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
                    <div className={classes.paper}   >
                        <Typography id="transition-modal-title" className={classes.heading} >
                        How To Play
                        </Typography>
                        <p id="transition-modal-description" className={classes.body} >
                            X and O take turns clicking on squares to claim them.
                            The first player to claim all 3 squares in a single row, column, or diagonal wins!
                        </p>
                        <Typography id="transition-modal-title" className={classes.heading} >
                        Coach's Commentary
                        </Typography>
                        <p id="transition-modal-description" className={classes.body} >
                            The commentary is on by default and may be turned off in the Settings.
                            It provides a verbal description of the current position and in certain
                            positions offers advice to help you find your best move.  
                        </p>
                        <Typography id="transition-modal-title" className={classes.heading} >
                        Winning and Losing Moves
                        </Typography>
                        <p id="transition-modal-description" className={classes.body} >
                            Color-coded hints shown on the board that warn of all possible mistakes and highlight all winning opportunities.
                            These are hidden by default and may be turned on in the Settings.
                        </p>
                        <p id="transition-modal-description" className={classes.body} >
                            Squares that are white lead to a Draw. This is the outcome of every game of Tic Tac Toe <em> unless </em>
                            one of the players makes a <strong>mistake</strong>. After a mistake, the other player will be able to win immediately or force their opponent's hand in a way that guarantees a them a win in one or two more turns.
                            It isn't necesarily a problem to have to make an <strong>urgent defensive move</strong>, but if you have two or more of them at once then the game is lost.
                        </p>
                        <HintColorKey />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
