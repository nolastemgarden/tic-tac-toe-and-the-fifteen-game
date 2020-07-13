import React from 'react';
import {
    Link as RouterLink,
} from "react-router-dom";

// My Components


// MUI  components
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'


// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    
    root: {
        // border: 'solid navy 1px',

        width: '100%',
        height: '90%',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#4AC9FD',

        overflowY: 'scroll',
    },
    paper: {
        
        width: 'calc(100% - 4rem)',
        height: 'auto',
        minHeight: 'calc(99.5% - 2rem)',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',

        borderRadius: '1vmin',
        backgroundColor: '#ffffff',
        
        
        padding: '1rem',
        // overflow: 'scroll',
    },
    title: {
        fontSize: '1.3rem',
    },
    paragraph: {
        // textIndent: '1rem',
        paddingBottom: '0.7rem',
    },
    buttonArea: {
        // border: 'solid red 1px',
        display: 'flex',
        marginBottom: '0.7rem',
        width: '100%',

    },
    button: {
        margin: 'auto',
        width: '37%',
        backgroundColor: theme.palette.primary.dark,
        textAlign: 'center'
    }, 
    
}));


export default function WelcomePage() {
    const classes = useStyles();
    
    
    return (
        
        <Box className={classes.root} >
            <Paper className={classes.paper} elevation={5} >
                <Typography className={classes.title} gutterBottom>
                    Welcome to Tic-Tac-Toe and the 15-Game!
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    My name is Nigel, and I am a teacher with a passion for games where simple rules lead to complex
                    strategies. I love to use games as a lens through which to teach math. They serve as a reminder
                    that Math is alive! Though as it is based on disciplined reasoning, it is also based on play and exploration.
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    In "How Not To Be Wrong", Jordan Elenberg explains, "Knowing mathematics is like wearing a pair of X-ray
                    specs that reveal hidden structures beneath the messy and chotic surface of the world."  When two real-world
                    problems that seem unrelated on their surfaces' are actually behaving according
                    to the same underlying patterns, Math helps us become aware of that fact.  But don't take my word for it!
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    To see this for yourself, play Tic-Tac-Toe and then play the Fifteen Game. You will see that (on the surface) these two
                    games feel quite different to play.  You would not likely suspect that knowing the best strategies in Tic-Tac-Toe
                    would make you a stronger player at the Fifteen Game, too.
                </Typography>
                <Box className={classes.buttonArea}>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to='/tic-tac-toe'
                    >
                        Play Tic-Tac-Toe
                    </Button>

                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to='/fifteen-game'
                    >
                        Play the 15-Game
                    </Button>
                </Box>
                <Typography variant='body1' className={classes.paragraph}>
                    When you have played both games check out the lesson on Magic Squares. Magic Squares are a mathematical curiosity
                    that were first studied in China and India thousands of years ago. Once you know about magic squares you will be
                    able to see that under the hood Tic-Tac-Toe and the Fifteen Game are actually the same game! Master one and you will have mastered both!
                </Typography>
                <Box className={classes.buttonArea}>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to='/magic-squares'
                    >
                        Learn Magic Squares
                    </Button>

                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to='/strategy'
                    >
                        Master the Strategy
                    </Button>
                </Box>
                <Typography variant='body1' className={classes.paragraph}>
                    This lesson is built with code that is open-source and available on my <a href="https://github.com/nolastemgarden">Github account</a>,
                so if you have something to add or simply want to see how it works you are welcome to &nbsp;
                <a href="https://github.com/nolastemgarden/tic-tac-toe-and-the-fifteen-game">clone the repository</a>!
                </Typography>

            </Paper>
        </Box>
    );
}
