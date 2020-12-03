import React from 'react';
import {
    Link as RouterLink,
} from "react-router-dom";

// My Components


// MUI  components
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'


// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    
    root: {
        // border: 'solid red 1px',

        width: '100%',
        height: 'auto',
        minHeight: 'calc(100vh - 4rem)',

        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#4AC9FD',
        color: theme.palette.common.white,
        padding: '2.0rem',
        
    }, 
    title: {
        // fontSize: '1.3rem',
        // paddingLeft: '0.5rem',
    },
    // paragraph: {
    //     // textIndent: '1rem',
    //     padding: '0.5rem',
    //     paddingBottom: '0.7rem',
    //     // fontSize: '0.9rem',
    // },
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
        width: '37%',
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
        
        <Box className={classes.root} >
            <Grid container>
                <Grid item xs={12}  >
                    <Typography variant='h4' gutterBottom>
                        Teaching Math through Games
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                        The secret to math's beauty and reliability is that it is based on proof.
                        All math starts with a few simple and easy to believe assumptions, called "axioms".
                        The simple assumptions are put together in creative ways to solve increasingly complex problems.
                        Suppose you're facing a tough problem and you have an idea that seems like it is probably true and like it could be quite useful,
                        but this idea is too complex for most people to believe it without . The goal of math is to explain how we can know
                        that complex idea must be true, given only the axioms as a starting point.
                    </Typography>
                </Grid>
                
                <Grid item xs={12} md={9} >
                    <Typography variant='h4' gutterBottom>
                        Introducing Proof with Tic-Tac-Toe
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                        The classic three-in-a-row game excites young students but generally loses popularity once a grouup of kids 
                                      
                        once they discover that they 
                        can usually get a draw 
                        
                        presents 
                        
                        
                        a fun challenge for students of a variety of ages
                        
                        
                        Though math has been found to have many real world applications, this is not where it starts from.The secret to math's beauty and reliability is that it is based on proof.
                        All math starts with a few simple and easy to believe assumptions, called "axioms".
                        The simple assumptions are put together in creative ways to solve increasingly complex problems.
                        Suppose you're facing a tough problem and you have an idea that seems like it is probably true and like it could be quite useful,
                        but this idea is too complex for most people to believe it without . The goal of math is to explain how we can know
                        that complex idea must be true, given only the axioms as a starting point.
                         
                        Strategy games like Tic-Tac-Toe and the 15-Game present
                         
                         
                        Mostly when students in school math classes are required to "explain their reasoning" they 
                        are really only being asked to mimic the reasoning their 
                        teacher has already presented. It is critical for kids' development that they are also asked to explain 
                        their reasoning in situations where the reasons are genuinely theirs, and not mere mimicry.
                        Strategy games like Tic-Tac-Toe and the 15-Game present an excellent oportunity for just this.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3} >
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to='/tic-tac-toe'
                    >
                        Play<br />Tic-Tac-Toe
                    </Button>
                </Grid>
            </Grid>
            
            
            <Typography variant='h4' gutterBottom>
                Seeing Hidden Similarities The 15-Game
            </Typography>
            <Typography variant='body2' gutterBottom>
                
            </Typography>
            <Typography variant='body2' gutterBottom>
                Studying math makes us better at recognizing when two real-world situations that 
                seem unrelated at first are actually behaving according to the same underlying pattern. 
                Familiarity with math is valuable because it offers us useful insights, even in situations 
                where we seem to lack relavant experience.
            </Typography>
            <Typography variant='body2' gutterBottom>
                Here are two games that, on their surfaces, seem unrelated. Play each of them a few times.
                You would not guess that mastering the strategy of one of these games would give you any
                advantage when playing the other, but you'd be wrong.  
            </Typography>
            <Typography variant='body2' gutterBottom>
                {/* Mathematics is based on precise reasoning but it has a playful side too!   */}
                {/* Did you know that there is a whole branch of mathematics known as "game theory"?
                The formal theory of probability started with a curious gambler's question about a popular dice game.
                One of my favorite pure strategy games, Hex, was invented by the mathematician Piet Hein as he looked at the hexagonal tiles on his bathroom floor. 
                 */}
                {/* Students of math have to do a lot of tiring practice problems. 
                To avoid getting burnt out they need to maintain balance by taking breaks and keeping in 
                touch with math's playful side.   */}
                {/* Games have a way of making students hungry to learn. 
                in which simple rules open a door to complex strategic options 
                They create opportunities 
                for kids to explain their thought processes. */}
            </Typography>
            {/* <Typography variant='body2' gutterBottom>
                In the messiness of the "real-world", there are many problems that, on their surfaces', seem unrelated.
                The more math you know, the more you start to recognize familiar patterns playing out in unexpected places. 
                As you learn more math, you get more efficient at solving problems because you start seeing more 
                opportunities to reuse the solutions to problems you have encountered in the past. 

                To experience this for yourself, play Tic-Tac-Toe and then play the Fifteen Game. 
                You will see that these two games feel quite different to play.
            </Typography> */}
            {/* <Typography variant='body2' gutterBottom>
                In the introduction to his book, "How Not To Be Wrong: The power of mathematical thinking," 
                Jordan Elenberg explains, "Knowing mathematics is like wearing a pair of X-ray specs that reveal 
                hidden structures beneath the messy and chotic surface of the world."  
                The rest of the book is full of examples of 'real-world' problems that seem unrelated at first glance
                even though they behaving according to the same underlying patterns. 
            </Typography> */}
            <Box className={classes.buttonArea}>
                

                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to='/fifteen-game'
                >
                    Play the<br />15-Game
                </Button>
            </Box>
            <Typography variant='body2' className={classes.paragraph}>
                When you have played both games check out the lesson on Magic Squares. Magic Squares are a mathematical curiosity
                that were first studied in China and India thousands of years ago. Once you know more about magic squares you will be
                able to see that, beneath the surface, Tic-Tac-Toe and the Fifteen Game are actually the same game! Master one and you will have mastered both!
            </Typography>
            <Box className={classes.buttonArea}>
                <Button
                    className={classes.wideButton}
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to='/magic-squares'
                >
                    Learn About Magic Squares
                </Button>

                {/* <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to='/strategy'
                >
                    Master the Strategy
                </Button> */}
            </Box>
            <Typography variant='body2' className={classes.paragraph}>
                This lesson is built with code that is open-source and available on my <a href="https://github.com/nolastemgarden">Github account</a>,
            so if you have something to add or simply want to see how it works you are welcome to &nbsp;
            <a href="https://github.com/nolastemgarden/tic-tac-toe-and-the-fifteen-game">clone the repository</a>!
            </Typography>

            
        </Box>
    );
}
