import React from 'react';

// My Components
// import Square from "./Square";

// MUI  components
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    board: {
        // border: 'solid blue 1px',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',  // The lesser of full and the height of the board area. 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '0.3rem',
        // margin: '1rem 0.0rem',
    },
    row: {
        // border: 'solid blue 1px',
        width: '100%',
        height: '30%',
        margin: '0.3rem 0.0rem',

        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    square: {
        width: 'min(30%, 15vh)',
        height: '100%',
        margin: '0.0rem 0.3rem',
        backgroundColor: '#fff',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    iconX: {
        width: '100%',
        height: '100%',
        color: theme.palette.common.black
    },
    iconO: {
        width: '80%',
        height: '80%',
        color: theme.palette.common.black
    },


    unknown: {
        backgroundColor: '#bbf',
    },
    noColor: {
        // backgroundColor: '#FFF',  // This is used for Hints turned off mode.
        backgroundColor: '#ddd',
    },
    claimed: {
        backgroundColor: '#eee',
    },
    unclaimed: {
        backgroundColor: '#ddd',
    },
    win: {
        backgroundColor: '#3B3'
    },
    draw: {
        // backgroundColor: '#55bb00',
        backgroundColor: '#FF3'
    },
    lose: {
        // backgroundColor: '#88ee33'
        backgroundColor: '#F44'
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

    drawingMove: {
        backgroundColor: '#EEDD11'
    }

}));

export default function Board(props) {
    const classes = useStyles();
    const handleSquareClick = props.handleSquareClick
    const boardIcons = props.boardIcons;
    const boardColors = props.boardColors; // Array of 9 strings 'noColor', 'unclaimed', 'claimed', 'win', 'draw', 'lose'.
            // Formerly and Array of 9 strings '', 'immediateWin', 'unavoidableDefeat', 'doubleAttackCreatingMove', 'urgentDefensiveMove', 'forcedWinCreatingMove', 'drawingMove'
    
    let rows = [];
    for (let row = 0; row < 3; row++) {
        let newRow =
            <Row
                key={row}
                rowId={row}
                rowIcons={boardIcons.slice(3*row, 3*(row+1))}
                rowColors={boardColors.slice(3*(row), 3*(row + 1))}
                handleSquareClick={handleSquareClick}  
            />
        ;
        rows = rows.concat(newRow);
    }
    return (
        <Box className={classes.board}>
            {rows}
        </Box>
    )
}

function Row(props) {
    const classes = useStyles();
    const rowId = props.rowId;
    const rowIcons = props.rowIcons;
    const rowColors = props.rowColors;
    const handleSquareClick = props.handleSquareClick

    let squares = [];
    for (let col = 0; col < 3; col++) {
        let squareId = 3 * rowId + col;
        let newSquare =
            <Square
                key={squareId}
                id={squareId}
                symbol={rowIcons[col]}
                color={rowColors[col]}
                handleClick={handleSquareClick}
            />;
        squares = squares.concat(newSquare);
    }
    return (
        <Box className={classes.row}>
            {squares}
        </Box>
    )
}

function Square(props) {
    const classes = useStyles();
    const id = props.id
    const symbol = props.symbol
    const color = props.color  // String 'win', 'draw', 'lose', 'unknown', 'claimed',  
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
        case 'unknown':
            className = `${classes.square} ${classes.unknown} `
            break;
        case 'claimed':
            className = `${classes.square} ${classes.claimed} `
            break;
        case 'unclaimed':
            className = `${classes.square} ${classes.unclaimed} `
            break;
        case 'noColor':
            className = `${classes.square} ${classes.noColor} `
            break;
        case 'draw':
            className = `${classes.square} ${classes.draw} `
            break;
        case 'win':
            className = `${classes.square} ${classes.win} `
            break;
        case 'lose':
            className = `${classes.square} ${classes.lose} `
            break;
        default:
            className = `${classes.square} `
    }
    // switch (color) {
    //     case 'noColor':
    //         className = `${classes.square} ${classes.noColor} `
    //         break;
    //     case 'drawingMove':
    //         className = `${classes.square} ${classes.drawingMove} `
    //         break;
    //     case 'immediateWin':
    //         className = `${classes.square} ${classes.immediateWin} `
    //         break;
    //     case 'unavoidableDefeat':
    //         className = `${classes.square} ${classes.unavoidableDefeat} `
    //         break;
    //     case 'urgentDefensiveMove':
    //         className = `${classes.square} ${classes.urgentDefensiveMove} `
    //         break;
    //     case 'doubleAttackCreatingMove':
    //         className = `${classes.square} ${classes.doubleAttackCreatingMove} `
    //         break;
    //     case 'forcedWinCreatingMove':
    //         className = `${classes.square} ${classes.forcedWinCreatingMove} `
    //         break;
    //     case 'gameLosingMove':
    //         className = `${classes.square} ${classes.gameLosingMove} `
    //         break;    
    //     default:
    //         className = `${classes.square} `
    // }

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