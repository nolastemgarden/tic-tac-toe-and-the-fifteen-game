import React from 'react';

// My Components

// MUI  components
import Paper from '@material-ui/core/Paper';
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

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
    iconX: {
        fontSize: '13vmin',
    },
    iconO: {
        fontSize: '10vmin',
    },
});

export default function Square(props) {
    const classes = useStyles();
    const id = props.id
    const value = props.value
    // function handleSquareClick(id) = props.handleSquareClick


    let icon;
    switch (value) {
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
            onClick={() => props.handleClick(id)}
        >
            {icon}
        </Paper>
    )
}