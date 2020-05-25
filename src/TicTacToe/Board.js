import React from 'react';

// My Components
import Square from "./Square";

// MUI  components
import Paper from '@material-ui/core/Paper';
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    
    board: {
        width: '50vmin',
        height: '50vmin',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center',
    },
});

export default function Board(props) {
    const classes = useStyles();
    
    const squareValues = props.data;
    // const handleSquareClick = props.handleSquareClick;

    
    let board = [];
    for (let id = 0; id < 9; id++) {
        let newSquare =
            <Square
                key={id}
                id={id}
                value={squareValues[id]} 
                handleClick={props.handleSquareClick}
            />
        ;
        board = board.concat(newSquare);
    }
    
    

    return (
        <div className={classes.board}>
            {board}
        </div>
    )
}

