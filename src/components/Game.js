import React from 'react';
 
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    root: {
        border: 'solid red 1px',
        height: '80vmin',
        width: '80vmin',
        backgroundColor: '#FFF',
        

    }
})

export default function Game() {
    const classes = useStyles();
    return (
        <div className={classes.root} >
            The GAME Component
        </div>
    );
}