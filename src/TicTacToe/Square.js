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
    win: {
        backgroundColor: '#8ff772'
    },
    lose: {
        backgroundColor: '#ff6354'
    },
    draw: {
        backgroundColor: '#f9ff52'
    }
});

export default function Square(props) {
    const classes = useStyles();
    const id = props.id
    const value = props.value
    const hint = props.hint
    const handleClick = props.handleClick


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

    let className;
    switch (hint) {
        case 'win':
            className = `${classes.square} ${classes.win} `
            break;
        case 'lose':
            className = `${classes.square} ${classes.lose} `
            break;
        case 'draw':
            className = `${classes.square} ${classes.draw} `
            break;
        default:
            className = `${classes.square} `
    }

    return (
        <Paper
            className={className}
            onClick={() => handleClick(id)}
        >
            {icon}
        </Paper>
    )
}