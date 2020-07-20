import React from 'react';

// My Components
import Square from "../Square";

// MUI  components
import Box from '@material-ui/core/Box';
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    board: {
        // border: 'solid blue 1px',
        width: '76.4%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center',
    },
});

export default function Board(props) {
    const classes = useStyles();
    const handleSquareClick = props.handleSquareClick
    const boardSymbols = props.boardSymbols;
    const boardColors = props.boardColors; // Array of 9 strings 'noColor', 'unclaimed', 'claimed', 'win', 'draw', 'lose'.
            // Formerly and Array of 9 strings '', 'immediateWin', 'unavoidableDefeat', 'doubleAttackCreatingMove', 'urgentDefensiveMove', 'forcedWinCreatingMove', 'drawingMove'
    
    let board = [];
    for (let id = 0; id < 9; id++) {
        let newSquare =
            <Square
                key={id}
                id={id}
                symbol={boardSymbols[id]}
                color={boardColors[id]}
                handleClick={handleSquareClick}  
            />
        ;
        board = board.concat(newSquare);
    }
    
    

    return (
        <Box className={classes.board}>
            {board}
        </Box>
    )
}
