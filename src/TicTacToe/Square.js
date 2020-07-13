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
        backgroundColor: '#FE3'
    },
    iconX: {
        width: '100%',
        height: '100%',
    },
    iconO: {
        width: '80%',
        height: '80%',
    },

    immediateWin: {
        backgroundColor: '#00bb00'
    },
    doubleAttackCreatingMove: {
        // backgroundColor: '#55bb00',
        backgroundColor: '#00bb00'
    },
    forcedWinCreatingMove: {
        // backgroundColor: '#88ee33'
        backgroundColor: '#00bb00'
    },

    urgentDefensiveMove: {
        backgroundColor: '#ff6600'
    },
    unavoidableDefeat: {
        backgroundColor: '#ff4433'
    },
    gameLosingMove: {
        // backgroundColor: '#EEDD11'
    },
    
});

export default function Square(props) {
    const classes = useStyles();
    const id = props.id
    const symbol = props.symbol
    const color = props.color  // String '', 'immediateWin', 'unavoidableDefeat', 'doubleAttackCreatingMove', 'urgentDefensiveMove', 'forcedWinCreatingMove'
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
        case 'immediateWin':
            className = `${classes.square} ${classes.immediateWin} `
            break;
        case 'unavoidableDefeat':
            className = `${classes.square} ${classes.unavoidableDefeat} `
            break;
        case 'urgentDefensiveMove':
            className = `${classes.square} ${classes.urgentDefensiveMove} `
            break;
        case 'doubleAttackCreatingMove':
            className = `${classes.square} ${classes.doubleAttackCreatingMove} `
            break;
        case 'forcedWinCreatingMove':
            className = `${classes.square} ${classes.forcedWinCreatingMove} `
            break;
        case 'gameLosingMove':
            className = `${classes.square} ${classes.gameLosingMove} `
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