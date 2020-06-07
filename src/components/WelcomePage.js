import React from 'react';

// My Components


// MUI  components
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    panel: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    // root: {
    //     width: '100%',
    // },
    // heading: {
    //     fontSize: theme.typography.pxToRem(15),
    //     flexBasis: '33.33%',
    //     flexShrink: 0,
    // },
    // secondaryHeading: {
    //     fontSize: theme.typography.pxToRem(15),
    //     color: theme.palette.text.secondary,
    // },

    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: '#4AC9FD',
        // overflow: 'scroll',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        backgroundColor: '#ffffff',
        height: '50vmin',
        width: 'calc(100% - 3vmin)',
        boxSizing: 'border-box',
        padding: '0vmin',
        // overflow: 'scroll',
    },
    title: {
        fontSize: '3.0vmin',
    },
    header: {
        fontSize: '2.6vmin',
        fontWeight: 'bold'
    },
    body: {
        fontSize: '2vmin',
        paddingTop: '1rem',
    },

}));


export default function WelcomePage() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    
    // What distinguishes Math from Science?
    //    sci... Math...
    //  Bottom Line: Proof vs evidence. 
    // What does Tic Tac Toe have to do with this?
    // --play now button
    // What is the Fifteen Game?
    
    return (
        <div className={classes.root} >
            <Paper className={classes.paper} >
               
                {/* What distinguishes Math from Science? */}
               <ExpansionPanel 
                    className={classes.panel} 
                    expanded={expanded === 'panel1'} 
                    onChange={handleChange('panel1')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.title} >
                            What distinguishes Math from Science?
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                <Typography className={classes.header} >
                                    In Science:
                                </Typography>
                                <Typography className={classes.body} >
                                    We start by observing the natural world, counting things and taking measurements. 
                                    Then, we (use math to) look for patterns in the data. We imagine possible explanations
                                    for what we we observe and call these <em>theories</em>.
                                </Typography>
                                <Typography className={classes.body} >
                                    We look for evidence to both support and to disproove our theories, but new tools 
                                    for observing the world occasionally provide us with new evidence that forces 
                                    dramatic changes in scientific theory.
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.header} >
                                    In Mathematics:
                                </Typography>
                                <Typography className={classes.body}>
                                    We start with abstract ideas like number and shape and we look for things 
                                    that we can <em>prove must always be true</em> about them. 
                                    We try to see beneath-the-surface similarities between 
                                    parts of the real-world that seem unrelated at first.                                
                                </Typography>
                                <Typography className={classes.body} >
                                    Mathematical proof relies on <em>pure logic, not evidence,</em> 
                                    so once a theorem is mathematically prooven there is no chance of 
                                    it later being disproven.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={classes.body} >
                                    <strong>Bottom Line:</strong> Proof is the heart of Mathematics. <br />
                                    It relies on reason only, not supporting evidence.
                                </Typography>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>



                {/* Why does being proof-based increase the value of Math? */}
                <ExpansionPanel
                    className={classes.panel}
                    expanded={expanded === 'panel3'}
                    onChange={handleChange('panel3')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography className={classes.title} >
                            How is Proof introduced in school?
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Typography className={classes.header} >
                                    "No Credit if you don't Show Your Work!!!"
                                </Typography>
                                <Typography className={classes.body} >
                                    The first stage of learning math is based around memorization of basic arithmetic facts.
                                    Once a student has mastery of the basic facts, they move on to applying those facts in 
                                    multi-step computational processes such as long-division. At this point they are required to show in 
                                    writing how they arrived at answers that presumably could not have been "just seen".
                                </Typography>
                                <Typography className={classes.body} >
                                    "Show your work" generally means "include your scratch work so I know you didn't just copy the final 
                                    answers from a classmate."
                                    Using this requirement as an anti-cheating mechanism totally misses the point and gives young kids the wrong
                                    idea about what math is all about. 
                                </Typography>
                                <Typography className={classes.body} >
                                    The computational skills that students learn as they go through a K-12 math curriculum can
                                    be put to many great uses. Still, the most important skill we should aim for students 
                                    to take away from their math class experience isn't a computational skill at all.  
                                    What's most important is that kids learn to explain thier reasoning in a way that is thorough,
                                    clear, and that can be understood by their peers.
                                </Typography>
                                <Typography className={classes.body} >
                                    Math is a human endeavor, based on human communication. Mathematical ideas only
                                    have value if we can share them with other people. Too often, school sends the message that 
                                    you only need to show your work with just enough clarity for your teacher be able to read it.
                                    There is no real-world value in that. If you are a student who wants to learn a skill with real-world
                                    value and you feel like you aren't getting that from your current math class, start by raising your hand more!
                                    Don't just ask questions to get answers, ask questions because through practice you will get better at asking questions,
                                    and when you get better at asking questions the world is a more interesting place to live. 
                                    Really good questions sometimes have more to teach us more than the answers do. 
                                </Typography>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>



                {/* What does Tic-Tac-Toe have to do with this? */}
                <ExpansionPanel 
                    className={classes.panel} 
                    expanded={expanded === 'panel4'} 
                    onChange={handleChange('panel4')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography className={classes.title} >
                            What does Tic-Tac-Toe have to do with this?
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Typography className={classes.header} >
                                    I will never lose at Tic Tac Toe, and I can Proove it.
                                </Typography>
                                <Typography className={classes.body} >
                                    This is a fun challenge and something that I have used with many in-person math classes.
                                    After facing off against many student-challengers (who had the option to go first or second) 
                                    the chalk board will be full of games I drew and won. But that doesn't proove anything!
                                    No matter how many examples games we play, it will never be a proof that there isn't a 
                                    strategy that we have overlooked.  To proove that I will never lose I have to Organize my
                                    exploration of the possible strategies. 
                                </Typography>
                                <Typography className={classes.body} >
                                    Well-written proofs always start by giving precice defininitions of the key terms that are
                                    used in them.  I model that practice for students by writing on teh board the definition of the term "mistake".
                                    It is helpful that this is a familiar word with an every day meaning that we are borrowing and fine-tuning
                                    for our current purpose rather than introducing a totally new idea. Though we are going to use the word to mean 
                                    something very close to its every-day usage, since we are trying to formally proove that the best outcome either 
                                    player in in a game of Tic Tac Toe can guarantee is a Draw
                                    
                                </Typography>
                            </Grid>
                            
                            
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel> 
                    


                {/* What is the Fifteen Game? */}
                <ExpansionPanel 
                    className={classes.panel} 
                    expanded={expanded === 'panel6'} 
                    onChange={handleChange('panel6')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel6bh-content"
                        id="panel6bh-header"
                    >
                        <Typography className={classes.title} >
                            What is the Fifteen Game?
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Typography className={classes.header} >
                                    What is the Fifteen Game?
                                </Typography>
                                <Typography className={classes.body} >
                                    The Fifteen Game is a two player simple strategy game that can be played with pencil and paper.
                                    To start, write down the numbers 1 through 9. Players take turns circling one of the numbers
                                    to claim it as theirs. Both player have the same goal: Get a set of <em>exactly</em> three numbers
                                    that add up to <em>exactly</em> fifteen. If you end up circling four or five numbers that's fine, 
                                    but you can only combine three of your claimed numbers to make a fifteen and win. 
                                </Typography>
                                <Typography className={classes.body} >
                                    The game is a great tool for making practice of mental addition more fun. The classic version is 
                                    played with the numbers 1 through 9 but the rules can be easily adapted to let kids practice with
                                    other number sets. Players are challenged to think both offensively and defensively.
                                </Typography>
                                <Typography className={classes.header} >
                                    Why teach Tic Tac Toe and the Fifteen Game together?
                                </Typography>
                                <Typography className={classes.body} >
                                    I could just tell you why right here, but it would really be better for you to just explore the rest
                                    of this web app to experience the answer for yourself. I recommend these steps: 
                                    1) Play a few rounds of Tic Tac Toe 
                                    2) Play a few rounds of the Fifteen Game 
                                    3) Describe thoroughly the apparent similiarities and differences between these two games.
                                    4) Read the lesson on Magic Squares
                                    
                                </Typography>
                                <Typography className={classes.body} >
                                    One of the most amazing things about math is its ability to show us how things that seem
                                    different on the surface are actually the same deep down.  By completing the above 
                                    steps you will get to experience two games that feel very different to play even though 
                                    beneath the surfaces, they are exactly the same game.
                                    
                                </Typography>       
                            </Grid>
                            
                            
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel> 

                {/* What does it mean to Master Tic Tac Toe? */}
                <ExpansionPanel 
                    className={classes.panel} 
                    expanded={expanded === 'panel7'} 
                    onChange={handleChange('panel7')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel7bh-content"
                        id="panel7bh-header"
                    >
                        <Typography className={classes.title} >
                            What does it mean to Master Tic Tac Toe?
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Typography className={classes.header} >
                                    It is true that the best outcome either player can <em>force</em> is a draw.
                                    Many people assume that if they can go second and force a draw that they know 
                                    all there is to know about Tic Tac Toe. Not true! 
                                </Typography>
                                <Typography className={classes.body} >
                                    
                                </Typography>
                                     
                            </Grid>
                            
                            
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel> 
                
            </Paper>
        </div>
    );
}
