import React, { useState } from 'react';

// MUI Components
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';


// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
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
        // fontSize: 'min(max(0.7rem, 3vmin), 24px)',
        fontSize: 'min(20px, 1rem)',
        lineHeight: '0.8vmin',
    },
    buttonIcon: {
        marginRight: '0.6rem'
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
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">How To Play</h2>
                        <ul id="transition-modal-description" >
                            <li>
                                Two players take turns claiming one of the 9 numbers.
                            </li>
                            <li>
                                To win a player must collect a set of 3 numbers that add up to exactly 15.
                            </li>
                            <li>
                                By default, you go first and play against my Bot, which will never fail to get a draw.
                            </li>
                            <li>
                                In the Settings you can adjust whether you go first or second.
                            </li>
                            <li>
                                You can also adjust whether to show/hide commentary and move hints.
                            </li>
                        </ul>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
