import React from 'react';

// My Components
import Board from "./Board";


// MUI  components
import Link from '@material-ui/core/Link';
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
        alignItems: 'center'
    },
    
    panel: {
        border: 'solid blue 1px',
        boxSizing: 'border-box',
        // width: '100%',
        flex: '1 1 10rem'
    },
    status: {

    },
    history: {

    },
    controls: {

    },
    info: {

    }
})


export default function TicTacToeGame() {
    const classes = useStyles();


// Eventually we will pass <board> a list of 9 values to render into 9 squares. 
// for now we will pass it a hard-coded array of 9 values
    const boardData = Array(9).fill('');
    const panelData = {};

    return (
        <div className={classes.root} >
            <Board data={boardData} />
            <Panel data={panelData} />
        </div>
    );
}







function Panel(props) {
    const classes = useStyles();
    return (
        <div className={classes.panel}>

        </div>
    )
}

