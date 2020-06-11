import React, { useState } from 'react';

// MUI Components
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';


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
        
    },
    hintColorCodeKey: {
        border: 'solid red 1px',
    },
    keyItem: {
        border: 'solid blue 1px',
        width: '100%',
        height: '5vh',
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
                        <h2 id="transition-modal-title">How To Play</h2>
                        <p id="transition-modal-description" >
                            X and O take turns clicking on squares to claim them.
                            The first player to claim all 3 squares in a single row, column, or diagonal wins!
                        </p>
                        <h2 id="transition-modal-title">Coach's Commentary</h2>
                        <p id="transition-modal-description" >
                            The commentary is on by default and may be turned off in the Settings.
                            It provides a verbal description of the current position and in certain
                            positions offers advice to help you find your best move.  
                        </p>
                        <h2 id="transition-modal-title">Winning and Losing Moves</h2>
                        <p id="transition-modal-description" >
                            Color-coded hints shown on the board that warn of all possible mistakes and highlight all winning opportunities.
                            These are hidden by default and may be turned on in the Settings.
                        </p>
                        <Box className={classes.hintColorCodeKey} >
                            <Box className={classes.keyItem} >

                            </Box>
                            <Box className={classes.keyItem} >

                            </Box>
                            <Box className={classes.keyItem} >

                            </Box>
                            <Box className={classes.keyItem} >

                            </Box>
                            <Box className={classes.keyItem} >

                            </Box>
                            <Box className={classes.keyItem} >

                            </Box>
                        </Box>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
