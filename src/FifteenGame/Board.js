import React from 'react';

// My Components
import NumberCard from "./NumberCard";

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
    
    const history = props.history;
    console.log(`Board recieved history: ${history}`)
    const handleCardClick = props.handleCardClick;
    
    // Is a given number card claimed? If so by who?
    function getStatus(num){
        // console.log(`Get Status called on Num: ${num}`)
        
        const key = history.indexOf(num);
        console.log(`Key: ${key}`)
        if (key === -1){
            return 'available';
        }
        else if (key % 2 === 0) {
            return 'red';
        }
        else if (key % 2 === 1) {
            return 'yellow';
        }
        else {
            console.error(`getStatus(num) is returning undefined`)
            return undefined;
        }
    }

    
    let board = [];
    for (let num = 0; num < 9; num++) {
        let newNumberCard =
            <NumberCard
                key={num}
                num={num}
                status={getStatus(num)} 
                handleClick={handleCardClick}
            />
        ;
        board = board.concat(newNumberCard);
    }
    
    

    return (
        <div className={classes.board}>
            {board}
        </div>
    )
}

