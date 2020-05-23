import React from 'react';

// My Components


// MUI  components
import Paper from '@material-ui/core/Paper';
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    boardArea: {
        backgroundColor: '#bbffff',
        height: '50vmin',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    board: {
        width: '50vmin',
        height: '50vmin',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center',
    },
    square: {
        margin: '1vmin',
        width: '13vmin',
        height: '13vmin',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',


    },
    iconX: {
        fontSize: '13vmin',
        
    },
    iconO: {
        fontSize: '10vmin',
        
    }
});

export default function Board(props) {
    const classes = useStyles();


    const squares = props.data.map((squareValue) =>
        <Square key={squareValue} value={squareValue} />
    );

    return (
        <div className={classes.boardArea}>
            <div className={classes.board}>
                {squares}
            </div>
        </div>
    )
}

function Square(props) {
    const classes = useStyles();
    let icon;
    switch (props.value) {
        case 'x':
            icon = <ClearIcon className={classes.iconX} />          
            break;
        case 'o':
            icon = <RadioButtonUncheckedIcon className={classes.iconO} />
            break;
        case '':
            icon = null;
            break;    
        default:
            throw console.error("Square passed value not 'x' 'o' or ''");
            break;
    }
    
    return (
        <Paper 
            className={classes.square}

        >
            {icon}
        </Paper>
    )
}