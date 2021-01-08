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
    helpModal: {
        // border: 'solid blue 1px',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    buttonIcon: {
        marginRight: '1vmin',
        fontSize: 'larger',
    },
    modal: {
        margin: '6.0rem 3.0rem'

    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '2.0rem',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
    },
    button: {
        margin: '0.5rem 1.0rem',
        width: '50%',
        height: '3.0rem',
        maxHeight: '3.0rem',
        fontSize: '1.2rem',
    },

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
        <div className={classes.helpModal}>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
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
