import React from 'react';

// My Components


// MUI  components
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';



// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({

    root: {
        // border: 'solid navy 1px',

        width: '100%',
        height: '100%',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        backgroundColor: '#ffffff',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        padding: '1rem',

        borderRadius: 'inherit',
        overflowY: 'scroll',
    },
    // title: {
    //     fontSize: '1.3rem',
    // },
    // paragraph: {
    //     // textIndent: '2rem',
    //     paddingBottom: '0.7rem',
    // },
    // buttonArea: {
    //     // border: 'solid red 1px',
    //     display: 'flex',
    //     marginBottom: '0.5rem',
    //     width: '100%',

    // },
    // button: {
    //     margin: 'auto',
    //     width: '37%',
    //     backgroundColor: theme.palette.primary.dark,
    //     textAlign: 'center'
    // },

}));


export default function StrategyPage() {
    const classes = useStyles();

    return (
        <Box className={classes.root} >
            The Strategy Page
        </Box>
    );
}
