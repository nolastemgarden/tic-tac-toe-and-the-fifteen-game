import React, { useState } from 'react';

// MUI Components
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';


// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    helpModal: {
        width: '100%',
        height: '100%',
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
        width: '70%',
        height: '30%',
        maxHeight: '3.0rem',
        fontSize: '1.2rem',
    },
    
    
}));

export default function HelpModal() {
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
                    <Container maxWidth='md' className={classes.paper} > 
                        <Typography variant='h3' id="transition-modal-title" >
                            How To Play
                        </Typography>
                        <Typography variant='body1' id="transition-modal-title" gutterBottom >
                            Two players take turns claiming one of the nine numbered cards. <br />
                            To win, a player must collect a set of exactly 3 cards whose numbers add up to exactly 15. <br />
                            Claiming extra cards that are not included in your winning trio is ok,
                            but sets of 2, 4, or 5 cards do not win the game, even if they sum to 15.
                        </Typography>
                        <Typography variant='h3' id="transition-modal-title" >
                            Difficulty Modes
                        </Typography>
                        <Typography variant='body1' id="transition-modal-title" gutterBottom >
                            <strong>Easy:</strong> the bot will decide its strategy by looking only one move into the future. <br />
                            <strong>Medium:</strong> the bot will look for oportunities to create double attacks. <br />
                            <strong>Hard:</strong> the bot plays perfectly and should never lose a game. <br />
                            Challenge yourself further by trying to play quickly and never lose!
                        </Typography>
                        
                    </Container>
                    
                </Fade>
            </Modal>
        </div>
    );
}



// Play the 15-Game against my bot until you have mastered it! 
// You will take turns making the first move. 
// In hard mode my bot never makes a mistake and the best you 
// can do is get a draw every time.
// In easy mode my bot makes exactly one mistake each game and
// you should be able to win every single time!

