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
        // borderRight: 'solid black 1rem',
        width: '100%',
        minHeight: 'calc(100vh - 4rem)',

        display: 'flex',
        flexDirection: 'column',
        color: theme.palette.common.white,
        padding: '1.0rem',
        
    }, 
    
    button: {
        // margin: 'auto',
        backgroundColor: theme.palette.primary.main,
        textAlign: 'center',
        marginRight: '1.0rem',
    }, 
    
    
}));


export default function WelcomePage() {
    const classes = useStyles();
    
    
    return (
        <Container className={classes.root} maxWidth='md' >
            <Typography align='center' color='textPrimary' component='h1' variant='h2' gutterBottom >
                Tic-Tac-Toe and the Fifteen Game
            </Typography>
            {/* <Typography align='center' color='textPrimary' component='h2' variant='h5' gutterBottom >
                A math lesson taught through two classic games
            </Typography> */}
            <Grid container>
                <Typography align='left' color='textPrimary' component='h4' variant='h4' gutterBottom >
                    Intro to Proof
                </Typography>
                {/* <Typography paragraph align='justify' color='textPrimary' component='body1' variant='body1' gutterBottom >
                    Math is all about things that can be proven using logic.
                    In the same way a song is an expression of a musician's creativity, a written proof is an expression of a mathematician's creativity.
                    To the trained eye, mathematical proofs can be profoundly beautiful and elegant,
                    however, they often involve a lot of abstraction and formality, making them inaccessible to beginners.
                    The first goal of this lesson is to break that barrier and introduce the concept of proof in a way 
                    that is accessible to young students and to beginners with little formal math training.
                    In this lesson you will prove some interseting things about Tic-Tac-Toe,
                    without relying on any mathematical jargon or algebra.
                </Typography> */}
                <Typography paragraph align='justify' color='textPrimary' component='body1' variant='body1' gutterBottom >
                    Math is all about things that can be proven using logic.
                    Mathematical proofs can be profoundly beautiful, but they often deal with very abstract concepts and 
                    involve a lot of technical jargon, making them inaccessible to beginners. 
                    Let's break that barrier by writing a proof about something familiar and concrete. 
                    Can you proove that the player who goes first can always win at Tic-Tac-Toe?
                    If not, can you proove that the ends in a draw every time if neither player makes a mistake? 
                    Extra Challenge: What exactly does the word "mistake" mean as used above? Don't settle for an intuitive 
                    grasp of the meaning of that word, write as precise a definition as you can!  
                    Is it possible to make a mistake on the first move of the game? How about the second move?
                </Typography>
                <Box width="100%" mb={3} > 
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to='/play_tic_tac_toe'
                    >
                        Play Tic-Tac-Toe!
                    </Button>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to='/learn_tic_tac_toe'
                    >
                        Learn Tic-Tac-Toe
                    </Button>
                </Box>
                
                {/* <Typography paragraph align='justify' color='secondary' component='body1' variant='body1' gutterBottom >
                    If you have played Tic-Tac-Toe much, you have probably observed that the player who goes first seems to have an advantage but the game usually ends in a draw.
                    Try and take this casual observation to the next level by prooving that the game will <em>always</em> end in a draw unless one of the players makes a mistake.
                    To do this you will need to articulate a move-by-move plan that you can use when you go second that anticipates
                    every strategy that the first player might try to use against you and explains how you can respond to avoid defeat.
                    As you work to develop your plan, it may help to try and test your ideas by playing against my bot.
                    My bot will try a variety of strategies and it will never make a mistake,
                    but when you have perfected your plan you won't make any mistakes either and you will never lose to my bot.
                    When you have perfected your strategy for going second try this challenge question: Is it possible for the player who goes first
                    to make a mistake on the first move of the game?
                </Typography> */}
                
                <Typography align='left' color='textPrimary' component='h4' variant='h4' gutterBottom >

                    Similarity Beneath the Surface
                </Typography>
                   
                <Typography paragraph align='justify' color='textPrimary' component='body1' variant='body1' >
                    Many problems can be solved with less work if, instead of starting from scratch, you start
                    with the solution to a different problem in mind and adapt that solution to the problem at hand. 
                    The first, and most difficult, step in this process is realizing that the two problems have 
                    something in common. Often, two real-world problems will seem unrelated on their surfaces' 
                    even though at a deeper level they are behaving according to the same patterns. Being familiar 
                    with mathematics makes you better at noticing when this is the case.
                </Typography>
                <Typography paragraph align='justify' color='textPrimary' component='body1' variant='body1' >
                    Experience this adaptive process for yourself!  Once you have mastered Tic-Tac-Toe and written up 
                    a strategic plan that lets you guarantee you cannot be beaten, 
                    try playing the Fifteen Game against my bot. 
                    At first, you will probably think that these two games feel nothing alike.
                    You would not guess that by mastering Tic-Tac-Toe you had taken a big step toward mastering the 
                    Fifteen Game too, but you have! Once you are familiar with the mechanics of the Fifteen Game, 
                    take a look at the lesson on Magic Squares, a mathematical curiosity first discovered in China 
                    about 4200 years ago. Equipped with this mathematical knowledge, you will soon realize 
                    that Tic-Tac-Toe and the Fifteen Game have a lot more in common that you thought at first!
                </Typography>
                <Box mb={2} >
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to='/fifteen_game'
                    >
                        Play  the 15-Game!
                    </Button>

                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to='/magic_squares'
                    >
                        Learn About Magic Squares
                    </Button>
                </Box>
                
                
                <Typography variant='body2' color='textPrimary' className={classes.paragraph}>
                    This lesson is built with code that is open-source and available on my <a href="https://github.com/nolastemgarden">Github account</a>,
                    so if you have something to add, a bug to report, or simply want to see how it works you are welcome to open an issue or &nbsp;
                    <a href="https://github.com/nolastemgarden/tic-tac-toe-and-the-fifteen-game">clone the repository</a>!
                </Typography>
            </Grid>
            <Box p={5} />
        </Container>
    );
}
