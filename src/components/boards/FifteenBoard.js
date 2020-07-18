import React from 'react';

// My Components
import NumberCard from "../NumberCard";

// MUI  components
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';


// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    board: {
        // border: 'solid red 1px',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        
        // alignContent: 'center',
        // justifyContent: 'center',
    },
    row1: {
        // border: 'solid red 1px',
        width: '100%',
        height: '50%',
        
        display: 'flex',
        flexDirection: 'row',

        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    row2: {
        // border: 'solid red 1px',
        width: '100%',
        height: '50%',

        display: 'flex',
        flexDirection: 'row',

        alignItems: 'start',
        justifyContent: 'center',
    },
});

// .circle - container {
//     position: relative;
//     width: 24em;
//     height: 24em;
//     padding: 2.8em;
//     /*2.8em = 2em*1.4 (2em = half the width of a link with img, 1.4 = sqrt(2))*/
//     border: dashed 1px;
//     border - radius: 50 %;
//     margin: 1.75em auto 0;
// }
    // .circle - container a {
    // display: block;
    // position: absolute;
    // top: 50 %; left: 50 %;
    // width: 4em; height: 4em;
    // margin: -2em;
// }
    // .circle - container img { display: block; width: 100 %; }
    // .deg0 { transform: translate(12em); } /* 12em = half the width of the wrapper */
    // .deg45 { transform: rotate(45deg) translate(12em) rotate(-45deg); }
    // .deg135 { transform: rotate(135deg) translate(12em) rotate(-135deg); }
    // .deg180 { transform: translate(-12em); }
    // .deg225 { transform: rotate(225deg) translate(12em) rotate(-225deg); }
    // .deg315 { transform: rotate(315deg) translate(12em) rotate(-315deg); }

export default function Board(props) {
    const classes = useStyles();
    
    // const history = props.history;
    // console.log(`Board recieved history: ${history}`)

    const boardStatus = props.boardStatus;
    const handleCardClick = props.handleCardClick;
    
    let board = [];
    for (let num = 1; num <= 9; num++) {
        let newNumberCard =
            <NumberCard
                key={num}
                id={num}
                status={boardStatus[num]}     // number cards start with One.
                handleClick={handleCardClick}
            />
        ;
        board = board.concat(newNumberCard);
    }
    
    

    return (
        <Box className={classes.board}>
            <Box className={classes.row1}>
                {board.slice(0, 5)}
            </Box>
            <Box className={classes.row2}>
                {board.slice(5)}
            </Box>
        </Box>
    )
}

