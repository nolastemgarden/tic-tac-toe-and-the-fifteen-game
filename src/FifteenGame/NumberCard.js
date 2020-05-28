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
    },
    red: {
        width: 'inherit',
        height: 'inherit',
        backgroundColor: 'F55D3E',
    },
    yellow: {
        backgroundColor: 'F7CB15',
    },
    
});

export default function NumberCard(props) {
    const classes = useStyles();
    const status = props.status
    console.log(`NumCard called with status = ${status}`)
    
    const num = props.num
    // function handleSquareClick(id) = props.handleSquareClick


    // switch (status) {
    //     case 'red':
    //         className = "classes.circle"
    //         break;
    //     case 'yellow':
    //         className = "classes.circle"
    //         break;
    //     case 'available':
    //         className = "classes.circle"
    //         break;
    //     default:
    //         throw console.error("Square passed value not 'x' 'o' or ''");
    //         break;
    // }

    return (
        <Box className={classes.square}>
            <Paper
                className={classes.red}
                onClick={() => props.handleClick(num)}
            >
                {num}
            </Paper>
        </Box>
    )
}