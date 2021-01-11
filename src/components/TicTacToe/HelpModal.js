import React from 'react';

// My Components


// MUI Components
import Container from '@material-ui/core/Container';
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
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        margin: '0.5rem 1.0rem',
        width: '50%',
        height:  '3.0rem',
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
                            Two players take turns claiming one of the nine squares. <br />
                            To win, a player must claim all 3 squares that make up any row, column, or diagonal.
                        </Typography>
                        <Typography variant='h3' id="transition-modal-title" >
                            Difficulty Modes
                        </Typography>
                        <Typography variant='body1' id="transition-modal-title" gutterBottom >
                            On this page you can play againt my Bot to test your own mastery of the game.
                            You will go first in game one, and from that point on will 
                            alternate going first with the bot. <br /> 
                            <strong>Easy:</strong> the bot will decide its strategy by looking only one move into the future. <br />
                            <strong>Medium:</strong> the bot will look for oportunities to create double attacks. <br />
                            <strong>Hard:</strong> the bot plays perfectly and should never lose a game. <br />
                        </Typography>
                        <Typography variant='h3' id="transition-modal-title" >
                            Practice Mode
                        </Typography>
                        <Typography variant='body1' id="transition-modal-title" gutterBottom >
                            If you want to practice and study the game by picking moves for both X and O yourself,
                            rather than competing with the bot, check out the "Learn Tic Tac Toe" page.  There you can 
                            explore various strategies, get coach's commentary, and even see which continuations lead to 
                            a win, loss, or draw with color-coded hints on the board. 

                        </Typography>

                    </Container>

                </Fade>
            </Modal>
        </div>
    );
}

// export default function HowToPlayModal() {
//     const classes = useStyles();
//     const [open, setOpen] = React.useState(false);

//     const handleOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     return (
//         <div className={classes.helpModal}>
//             <Button
//                 className={classes.button}
//                 variant="contained"
//                 color="primary"
//                 onClick={handleOpen}
//                 aria-controls="simple-menu"
//                 aria-haspopup="true"
//             >
//                 <HelpOutlineIcon className={classes.buttonIcon} />
//                 Help
//             </Button>


//             <Modal
//                 aria-labelledby="transition-modal-title"
//                 aria-describedby="transition-modal-description"
//                 className={classes.modal}
//                 open={open}
//                 onClose={handleClose}
//                 closeAfterTransition
//                 BackdropComponent={Backdrop}
//                 BackdropProps={{
//                     timeout: 500,
//                 }}
//             >
//                 <Fade in={open}>
//                     <div className={classes.paper}   >
//                         <Typography id="transition-modal-title" className={classes.heading} >
//                         How To Play
//                         </Typography>
//                         <p id="transition-modal-description" className={classes.body} >
//                             X and O take turns clicking on squares to claim them.
//                             The first player to claim all 3 squares in a single row, column, or diagonal wins!
//                         </p>
//                         <Typography id="transition-modal-title" className={classes.heading} >
//                         Coach's Commentary
//                         </Typography>
//                         <p id="transition-modal-description" className={classes.body} >
//                             The commentary is on by default and may be turned off in the Settings.
//                             It provides a verbal description of the current position and in certain
//                             positions offers advice to help you find your best move.  
//                         </p>
//                         <Typography id="transition-modal-title" className={classes.heading} >
//                         Winning and Losing Moves
//                         </Typography>
//                         <p id="transition-modal-description" className={classes.body} >
//                             Color-coded hints shown on the board that warn of all possible mistakes and highlight all winning opportunities.
//                             These are hidden by default and may be turned on in the Settings.
//                         </p>
//                         <p id="transition-modal-description" className={classes.body} >
//                             Squares that are white lead to a Draw. This is the outcome of every game of Tic Tac Toe <em> unless </em>
//                             one of the players makes a <strong>mistake</strong>. After a mistake, the other player will be able to win immediately or force their opponent's hand in a way that guarantees a them a win in one or two more turns.
//                             It isn't necesarily a problem to have to make an <strong>urgent defensive move</strong>, but if you have two or more of them at once then the game is lost.
//                         </p>
//                         <HintColorKey />
//                     </div>
//                 </Fade>
//             </Modal>
//         </div>
//     );
// }
