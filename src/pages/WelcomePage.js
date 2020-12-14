import React from 'react';
import {
    Link as RouterLink,
} from "react-router-dom";

// My Components


// MUI  components
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'


// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    
    root: {
        border: 'solid red 1px',

        width: '100%',
        height: 'auto',
        overflow: 'scroll',
        minHeight: 'calc(100vh - 4rem)',

        display: 'flex',
        flexDirection: 'column',
        color: theme.palette.common.white,
        padding: '1.0rem 0.0rem',
        
    }, 
    
    buttonArea: {
        // border: 'solid red 1px',
        flex: '1 0 10%',
        display: 'flex',
        marginBottom: '0.7rem',
        width: '100%',
        padding: '0.5rem',

    },
    button: {
        margin: 'auto',
        // width: '37%',
        backgroundColor: theme.palette.primary.main,
        textAlign: 'center'
    }, 
    wideButton: {
        margin: 'auto',
        width: '80%',
        backgroundColor: theme.palette.primary.main,
        textAlign: 'center'
    }, 
    
}));


export default function WelcomePage() {
    const classes = useStyles();
    
    
    return (
        <Container className={classes.root} >
            <Grid container>
                <Grid item xs={12} md={8} >
                    <Typography align='left' color='textPrimary' component='h4' variant='h4' gutterBottom >
                        Tic-Tac-Toe and Mathematical Proof
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4} >
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to='/tic_tac_toe'
                    >
                        Play  Tic-Tac-Toe!
                    </Button>
                </Grid>
                <Typography paragraph align='justify' color='secondary' component='body1' variant='body1' gutterBottom >
                    Math is all about things that can be proven using logic.
                    In the same way a song is an expression of a musician's creativity, a written proof is an expression of a mathematician's creativity.
                    To the trained eye, mathematical proofs can be stunningly beautiful and elegant.
                    However, they often involve a lot of abstraction and formality, making them inaccessible to beginners.
                    This lesson introduces students to the concept of proof without depending on students knowing a lot of mathematical jargon or
                    having prior experience with algebra.
                </Typography>
                <Typography paragraph align='justify' color='secondary' component='body1' variant='body1' gutterBottom >
                    If you have played Tic-Tac-Toe much, you have probably observed that the player who goes first seems to have an advantage but the game usually ends in a draw.
                    Try and take this casual observation to the next level by prooving that the game will <em>always</em> end in a draw unless one of the players makes a mistake.
                    To do this you will need to articulate a move-by-move plan that you can use when you go second that anticipates
                    every strategy that the first player might try to use against you and explains how you can respond to avoid defeat.
                    As you work to develop your plan, it may help to try and test your ideas by playing against my bot.
                    My bot will try a variety of strategies and it will never make a mistake,
                    but when you have perfected your plan you won't make any mistakes either and you will never lose to my bot.
                    When you have perfected your strategy for going second try this challenge question: Is it possible for the player who goes first
                    to make a mistake on the first move of the game?
                </Typography>
                
                <Grid item xs={12} md={8} >
                    <Typography align='left' color='textPrimary' component='h4' variant='h4' gutterBottom >
                        Similarity Beneath the Surface
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4} >
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to='/fifteen_game'
                    >
                        Play  the 15-Game!
                    </Button>
                </Grid>    
                <Typography paragraph align='justify' color='secondary' component='body1' variant='body1' >
                    Many problems can be solved with less work if you start out with the solution to a different problem in mind and adapt that 
                    solution to the problem at hand. The first step in being able to save work by reusing a solution is realizing that the two 
                    problems have something in common. Often this is quite difficult. Two real-world problems may seem totally unrelated on their 
                    surfaces even though at a deeper level they are behaving according to the same patterns.
                    Being familiar with common mathematical patterns makes you better at noticing when this is the case.
                </Typography>
                <Typography paragraph align='justify' color='secondary' component='body1' variant='body1' >
                    My second goal in creating this lesson was to get students to experience for themselves a situation where they are
                    able to adapt and reuse their own solution to another problem. Once you have mastered Tic-Tac-Toe and written a complete 
                    strategy that lets you guarantee you will never lose, try playing the Fifteen Game. 
                    At first, you will probably think that these two games feel totally unalike.
                    You would never guess that by mastering Tic-Tac-Toe you had gotten any closer to mastering the Fifteen Game, but you have!
                    Once you are familiar with the mechanics of the Fifteen Game, take a look at the lesson on Magic Squares, a mathematical 
                    curiosity first discovered in China about 4200 years ago. Equipped with this mathematical knowledge, you will soon realize 
                    that Tic-Tac-Toe and the Fifteen Game have a lot more in common that you thought!
                </Typography>

                <Grid item xs={12} md={8} / >
                <Grid item xs={12} md={4} >
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to='/magic_squares'
                    >
                        Learn About Magic Squares
                    </Button>
                </Grid>    
                
                <Typography variant='body2' className={classes.paragraph}>
                    This lesson is built with code that is open-source and available on my <a href="https://github.com/nolastemgarden">Github account</a>,
                    so if you have something to add, a bug to report, or simply want to see how it works you are welcome to open an issue or &nbsp;
                    <a href="https://github.com/nolastemgarden/tic-tac-toe-and-the-fifteen-game">clone the repository</a>!
                </Typography>
            </Grid>
            
        </Container>
    );
}
