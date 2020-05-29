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
        // backgroundColor: '#4AC9FD'
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
                                    We start by observing the natural world and taking measurements. 
                                    We then use math to look for patterns in the data and we try to come 
                                    up with <em>theories</em> that explain what we observe and help us 
                                    predict nature.
                                </Typography>
                                <Typography className={classes.body} >
                                    We use evidence to support our theories, but new tools for observing the world 
                                    can provide us with new evidence that forces dramatic changes in scientific theory.
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
                                    <strong>Bottom Line:</strong> Proof is the heart of Mathematics.
                                </Typography>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>


                {/* What does Tic-Tac-Toe have to do with this? */}
                <ExpansionPanel 
                    className={classes.panel} 
                    expanded={expanded === 'panel2'} 
                    onChange={handleChange('panel2')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography className={classes.title} >
                            What does Tic-Tac-Toe have to do with this?
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={4}>
                            <Grid item xs={8}>
                                {/* <Typography className={classes.header} >
                                    Tic-Tac-Toe has been "solved".
                                </Typography> */}
                                <Typography className={classes.body} >
                                    Proof is one of the most important concepts in mathematics,
                                    but it is often introduced in an uninspiring way and much later than it should be. 
                                    
                                </Typography>
                                <Typography className={classes.body} >
                                    We require kids to <em>show their work</em> from an early age but only with enough
                                    clarity for the teacher to understand. The more important skill is being able to 
                                    <em>explain your reasoning</em> in a way that can be understood by your peers.
                                    
                                </Typography>
                                <Typography className={classes.body} >
                                    Well-writtenProofs is one of the most important foundation concepts in all of mathematics.
                                    Unfortunately, many math students of math don't write their first full proof
                                    until they have reached univeristy. Most are introduced to proof as part of 
                                    a geometry class, in a unit that really is more about congruent triangles than
                                    it is about proof. 
                                    
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={classes.header} >
                                     
                             
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={classes.body} >
                                    <strong>Bottom Line:</strong> Proof is the heart of Mathematics.
                            </Typography>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel> 
                    





                <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography className={classes.heading}>Advanced settings</Typography>
                        <Typography className={classes.secondaryHeading}>
                            Filtering has been entirely disabled for whole web server
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                            vitae egestas augue. Duis vel est augue.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography className={classes.heading}>Personal data</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                            vitae egestas augue. Duis vel est augue.
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Paper>
        </div>
    );
}
