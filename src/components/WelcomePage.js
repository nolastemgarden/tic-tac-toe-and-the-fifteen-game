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
        fontSize: '3.2vmin',
    },
    header: {
        fontSize: '2.8vmin',
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

    return (
        <div className={classes.root} >
            <Paper className={classes.paper} >
               
                <ExpansionPanel className={classes.panel} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
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
                                    We observe the natural world and collect data. We use math to look for 
                                    patterns in the data and try to come up with <em>theories</em> that explain 
                                    what we observe.
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
                                    We start with abstract ideas like number and shape. 
                                    We look for things that we can proove <em>must always be true</em>.
                                    We try to see beneath-the-surface similarities between 
                                    parts of the real-world that seem unrelated at first.                                
                                </Typography>
                                <Typography className={classes.body} >
                                    Mathematical proof relies on <em>pure logic, not evidence,</em> 
                                    so once a theorem is mathematically prooven there is no chance of 
                                    it later being disproven.
                                </Typography>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className={classes.panel} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
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
                                    We observe the natural world and collect data. We use math to look for
                                    patterns in the data and try to come up with <em>theories</em> that explain
                                    what we observe.
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
                                    We start with abstract ideas like number and shape.
                                    We look for things that we can proove <em>must always be true</em>.
                                    We try to see beneath-the-surface similarities between
                                    parts of the real-world that seem unrelated at first.
                                </Typography>
                                <Typography className={classes.body} >
                                    Mathematical proof relies on <em>pure logic, not evidence,</em>
                                    so once a theorem is mathematically prooven there is no chance of
                                    it later being disproven.
                                </Typography>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Paper>
        </div>
    );
}
