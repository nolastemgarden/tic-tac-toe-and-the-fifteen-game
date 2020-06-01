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
        margin: '2%',
        width: '27%',
        height: '27%',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconX: {
        width: '100%',
        height: '100%',
    },
    iconO: {
        width: '80%',
        height: '80%',
    },
    win: {
        backgroundColor: '#00DD00'
        // backgroundColor: 'green'
    },
    lose: {
        backgroundColor: '#ff6354'
    },
    draw: {
        backgroundColor: '#f9ff52'
        // backgroundColor: 'var(--logo-bg-color)'
    }
});

export default function Square(props) {
    const classes = useStyles();
    const id = props.id
    const symbol = props.symbol
    const color = props.color
    const handleClick = props.handleClick


    let icon;
    switch (symbol) {
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
            throw console.error("Square passed symbol not 'x' 'o' or ''");
            break;
    }

    let className;
    switch (color) {
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
            elevation={4}
            className={className}
            onClick={() => handleClick(id)}
        >
            {icon}
        </Paper>
    )
}