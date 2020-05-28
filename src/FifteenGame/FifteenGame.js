import React, { useState } from 'react';

// My Components
import Board from "./Board";
import Panel from "./Panel";


// MUI  components
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'



// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: '#4AC9FD'
    },
    boardArea: {
        backgroundColor: '#bbffff',
        height: '50vmin',
        width: 'calc(100% - 3vmin)',
        display: 'flex',
        justifyContent: 'center',
    },
    panelArea: {
        // border: 'solid blue 1px',
        // backgroundColor: '#4AC9FD',
        boxSizing: 'border-box',
        width: '100%',
        height: '32vmin',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'

    },
}));


export default function FifteenGame() {
    const classes = useStyles();

    let [history, setHistory] = useState(Array());
    // let [showMoves, setShowMoves] = useState(false);
    // let [showCommentary, setShowCommentary] = useState(false);

    console.log(`FifteenGame has history as: ${history}`)
    
    return (
        <div className={classes.root} >
            <div className={classes.boardArea} >
                <Board
                    history={history}
                    handleCardClick={handleCardClick}

                />
            </div>
            <div className={classes.panelArea}>
                <Panel
                    // data={getPanelData(history)} 
                    // status={getStatus()}
                    // showMoves={showMoves}
                    // showCommentary={showCommentary}
                    // handleUndoButtonClick={handleUndoButtonClick}
                    // toggleShowMovesSwitch={toggleShowMovesSwitch}
                    // toggleShowCommentarySwitch={toggleShowCommentarySwitch}
                />
            </div>

        </div>
    );

    // The board data to render is a the latest entry in history.  We will have an 'undo' but not a 'redo' button
    function getBoardValues() {
        // Start with an array representing a board of NINE empty squares
        let data = Array(9).fill('');
        // For each move in the history ...
        for (let i = 0; i < history.length; i++) {
            // If it was X's turn set the index in data indicated here by history
            if (i % 2 === 0) {
                data.splice(history[i], 1, 'x')
            }
            // If it was O's turn set the index in data indicated here by history
            else if (i % 2 === 1) {
                data.splice(history[i], 1, 'o')
            }
        }
        return data;
    }



    // function handleUndoButtonClick() {
    //     const shortenedHistory = history.slice(0, history.length - 1)
    //     console.log(`${history[history.length - 1]} removed. Shortened history: ${shortenedHistory}`);
    //     setHistory(shortenedHistory);
    // }
    // function toggleShowMovesSwitch() {
    //     setShowMoves(!showMoves)
    // }
    // function toggleShowCommentarySwitch() {
    //     setShowCommentary(!showCommentary)
    // }


    function handleCardClick(numberClicked) {
        if (gameOver()) {
            console.log("return without effects from handleCardClick(). The Game is already over.")
            return;
        }
        if (history.indexOf(numberClicked) !== -1) {
            console.log("return without effects from handleCardClick(). That number has already been claimed.")
            return;
        }
        // If we reach this point the clicked square is open and the game is not over yet ... 
        setHistory(history.concat(numberClicked));
        // This function does not pass along any of its results, it acts thru side-effects. It calls setHistory and use of that hook tells React it needs to re-render all components that depend on the state "history".
    }


    // Based on the history state, return an array of 8 ints 0-3 indicating the number of X's or O's in each row, col, and diagonal
    // function xLines() {
    //     const xLines = getLines(history.filter((squareId, index) => index % 2 === 0));
    //     console.log(`Number of X in each line: ${xLines}`)
    //     return xLines;
    // }
    // function oLines() {
    //     const oLines = getLines(history.filter((squareId, index) => index % 2 === 1));
    //     console.log(`Number of O in each line: ${oLines}`)
    //     return oLines;
    // }
    // function getLines(claimedSquares) {
    //     let status = Array(8).fill(0);
    //     // For each square this player has claimed make 2, 3, or 4 updates
    //     for (let i = 0; i < claimedSquares.length; i++) {
    //         const squareId = claimedSquares[i];

    //         // Update Row
    //         const row = Math.floor(squareId / 3)    // number 0, 1, or 2
    //         status[row]++;

    //         // Update Col
    //         const col = (squareId % 3)            // number 0, 1, or 2  +3 to account for the three indexes set asside for rows
    //         status[col + 3]++;

    //         // UpSlash ?
    //         if (squareId === 2 || squareId === 4 || squareId === 6) {
    //             status[6]++
    //         }

    //         // DownSlash ?
    //         if (squareId === 0 || squareId === 4 || squareId === 8) {
    //             status[7]++
    //         }
    //     }
    //     // console.log(`Status: ${status}`)
    //     return status;
    // }


    // BOOLEAN helpers for getStatus() and handleSquareClick()
    // function xWins() {
    //     return (xLines().includes(3));
    // }
    // function oWins() {
    //     return (oLines().includes(3));
    // }
    // function gameDrawn() {
    //     return (history.length >= 9 && !xWins() && !oWins());  // Board full and neither player has a win
    // }
    function gameOver() {
        return false;
        // return (history.length >= 9 || xWins() || oWins());  // Board full or there's a 3-in-a-row
    }


    // function getStatus() {
    //     if (xWins()) {
    //         const winningLine = getLines(history.filter((squareId, index) => index % 2 === 0)).indexOf(3);
    //         return (`X wins on line ${winningLine}`)
    //     }
    //     else if (oWins()) {
    //         return (`O wins!`)
    //     }
    //     else if (gameDrawn()) {
    //         return (`Draw.`)
    //     }
    //     else if (history.length % 2 === 0) {
    //         return (`X to move.`)
    //     }
    //     else if (history.length % 2 === 1) {
    //         return (`O to move.`)
    //     }
    //     else {
    //         console.error("getStatus() is broken!");
    //         return
    //     }
    // }

}


