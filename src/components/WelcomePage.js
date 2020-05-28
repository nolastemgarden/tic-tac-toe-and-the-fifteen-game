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



// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
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
        
    },
})


export default function WelcomePage() {
    const classes = useStyles();

    return (
        <div className={classes.root} >
            <Paper className={classes.paper} >
                <Typography>
                    What distinguishes Math from Science? 
                </Typography>
                <Typography>
                    In Science, we observe the natural world and come up with "theories" based on <em>evidence</em>.
                    In Mathematics, we start with abstract ideas and 
                    
                    Science uses Mathematics to look for patterns in data to support theories.
                </Typography>
            </Paper>
        </div>
    );
}
