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
    root: {
        width: '100vw',
        height: '100vh',
    },
    buttonIcon: {
        marginRight: '1vmin',
        fontSize: 'larger',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        width: '70%',
        height: '70%',
        // border: '2px solid #000',
        boxShadow: theme.shadows[5],
        // padding: theme.spacing(2, 4, 3),
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
                            <Typography variant='h5' id="transition-modal-title" >
                                How To Play
                            </Typography>
                            <Typography variant='body1' id="transition-modal-title" gutterBottom >
                                Two players take turns claiming one of the 9 numbered cards. <br />
                                To win, a player must collect a set of exactly 3 cards that add up to exactly 15.
                                Getting a set of 2 or 4 cards that sum to 15 does not win the game.
                            </Typography>
                            <Typography variant='body1' id="transition-modal-title" >
                                You will play against my bot, taking turns going first.
                                My bot will never make a mistake, so don't get discouraged if you never beat it.
                                If you play well you will never lose to it either.
                            </Typography>

                            
                        </Box>
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

