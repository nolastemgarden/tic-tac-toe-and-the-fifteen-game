import React from 'react';

// My Components

// MUI  components
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    square: {
        margin: '1vmin',
        width: '13vmin',
        height: '13vmin',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '10vmin',
        fontWeight: 'bold',
    },
    playerOne: {
        backgroundColor: '#3f51b5',
        color: 'white',
        
    },
    playerTwo: {
        backgroundColor: '#4AC9FD',
        
    },
    
});

export default function NumberCard(props) {
    const classes = useStyles();
    const status = props.status
    console.log(`NumCard called with status = ${status}`)
    
    const num = props.num
    // function handleSquareClick(id) = props.handleSquareClick

    let className;
    switch (status) {
        case 'red':
            className = `${classes.square} ${classes.playerOne} `
            break;
        case 'yellow':
            className = `${classes.square} ${classes.playerTwo} `
            break;
        case 'available':
            className = `${classes.square} `
            break;
        default:
            throw console.error("number card passed invalid status");
    }
    //className={`${classes.square} ${classes.red} `}
    return (
        <Paper
            className={className}
            onClick={() => props.handleClick(num)}
        >
            {num}
        </Paper>
        
    )
}