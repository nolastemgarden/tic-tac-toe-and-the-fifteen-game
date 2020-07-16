import React from 'react';

// My Components
import NumberCard from "../../FifteenGame/NumberCard";

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
    
    const history = props.history;
    console.log(`Board recieved history: ${history}`)
    const handleCardClick = props.handleCardClick;
    
    // Is a given number card claimed? If so by who?
    // function getStatus(num){
    //     // console.log(`Get Status called on Num: ${num}`)
        
    //     // const key = history.indexOf(num);
    //     console.log(`Key: ${key}`)
    //     if (key === -1){
    //         return 'available';
    //     }
    //     else if (key % 2 === 0) {
    //         return 'red';
    //     }
    //     else if (key % 2 === 1) {
    //         return 'yellow';
    //     }
    //     else {
    //         console.error(`getStatus(num) is returning undefined`)
    //         return undefined;
    //     }
    // }

    
    let board = [];
    for (let num = 1; num <= 9; num++) {
        let newNumberCard =
            <NumberCard
                key={num}
                num={num}
                // status={getStatus(num)} 
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

