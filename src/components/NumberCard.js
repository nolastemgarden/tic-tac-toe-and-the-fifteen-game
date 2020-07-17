import React from 'react';

// My Components

// MUI  components
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    numCard: {
        margin: '0.5rem',
        marginBottom: '1.5rem',
        width: '18%',
        height: '75%',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '500%',
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
    
    const id = props.id
    const status = props.status;  // unclaimed, playerOne, or playerTwo
    const handleClick = props.handleClick
    
    // console.log(`NumCard Id: ${id} has status: ${status}`)
    
    const num = props.num
    // function handleSquareClick(id) = props.handleSquareClick

    let className;
    switch (status) {
        case 'playerOne':
            className = `${classes.numCard} ${classes.playerOne} `
            break;
        case 'playerTwo':
            className = `${classes.numCard} ${classes.playerTwo} `
            break;
        case 'unclaimed':
            className = `${classes.numCard} `
            break;
        default:
            throw console.error("number card passed invalid status");
    }
    //className={`${classes.square} ${classes.red} `}
    return (
        <Paper
            elevation={4}
            className={className}
            onClick={() => handleClick(id)}  // number cards start with One.
        >
            {id}
        </Paper>
        
    )
}