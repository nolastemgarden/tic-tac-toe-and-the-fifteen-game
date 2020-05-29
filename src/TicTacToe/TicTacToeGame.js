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


export default function TicTacToeGame() {
    const classes = useStyles();

    let [history, setHistory] = useState([]); 
    let [showMoves, setShowMoves] = useState(false); 
    let [showCommentary, setShowCommentary] = useState(false);  

    return (
        <div className={classes.root} >
            <div className={classes.boardArea} >
                <Board 
                    data={getBoardValues()} 
                    handleSquareClick={handleSquareClick}

                />
            </div>
            <div className={classes.panelArea}>
                <Panel 
                    // data={getPanelData(history)} 
                    status={getStatus()}
                    commentary={getCommentary()}
                    showMoves={showMoves}
                    showCommentary={showCommentary}
                    handleUndoButtonClick={handleUndoButtonClick}
                    handleNewGameButtonClick={handleNewGameButtonClick}
                    toggleShowMovesSwitch={toggleShowMovesSwitch}
                    toggleShowCommentarySwitch={toggleShowCommentarySwitch}
                />
            </div>
        </div>
    );

    // The <Game> holds all state and most helper and handler function definitions.
    // It passes what it needs to to the board to render and to the panel.
    
    // The board data to render is a the latest entry in history.  We will have an 'undo' but not a 'redo' button
    function getBoardValues() {
        let data = Array(9).fill('');  // Start with an array representing a board of NINE empty squares
        xSquares().forEach(squareId => {
            data[squareId] = 'x';
        });
        oSquares().forEach(squareId => {
            data[squareId] = 'o';
        });
        emptySquares().forEach(squareId => {
            data[squareId] = '';
        });
        return data;
    }
    function getStatus() {
        if (xWins()) {
            const winningLine = getLines(history.filter((squareId, index) => index % 2 === 0)).indexOf(3);
            return (`X wins on line ${winningLine}`)
        }
        else if (oWins()) {
            return (`O wins!`)
        }
        else if (gameDrawn()) {
            return (`Draw.`)
        }
        else if (history.length % 2 === 0) {
            return (`X's turn.`)
        }
        else if (history.length % 2 === 1) {
            return (`O's turn.`)
        }
        else {
            console.error("getStatus() is broken!");
            return
        }
    }
    function getCommentary() {
        console.log(`getCommentary() called while showCommentary = ${showCommentary}`)
        if (gameOver()) {
            return `Game Over`
        }
        if (!showCommentary) {
            return `Coach's commentary would appear here if turned on in the settings.`
        }
        // If no moves have been made
        if (history.length === 0) {
            return `X goes first. It may look like there are 9 different options but when you
            consider symmetry there are really only 3 options: Center, Edge, or Corner.`
        }
    }


    // CLICK HANDLERS
    function handleSquareClick(squareClicked) {
        if (gameOver()) {
            console.log("return without effects from handleSquareClick(). The Game is already over.")
            return;
        }
        if (history.indexOf(squareClicked) !== -1) {
            console.log("return without effects from handleSquareClick(). That square has already been claimed.")
            return;
        }
        // If we reach this point the clicked square is open and the game is not over yet ... 
        console.log(`History: ${history.concat(squareClicked)}`)
        setHistory(history.concat(squareClicked));
        // This function does not pass along any of its results, it acts thru side-effects. It calls setHistory and use of that hook tells React it needs to re-render all components that depend on the state "history".
    }
    function handleUndoButtonClick() {
        const shortenedHistory = history.slice(0, history.length - 1)
        console.log(`${history[history.length-1]} removed. Shortened history: ${shortenedHistory}`);
        setHistory(shortenedHistory);
    }
    function handleNewGameButtonClick() {
        const empty = [];
        console.log(`History reset to: ${empty}`);
        setHistory(empty);
    }
    function toggleShowMovesSwitch() {
        setShowMoves(!showMoves)
    }
    function toggleShowCommentarySwitch() {
        setShowCommentary(!showCommentary)
    }
    
    

    // Filter the history into squareIds claimed by X and by O.
    function xSquares() {
        return history.filter((squareId, index) => index % 2 === 0);
    }
    function oSquares() {
        return history.filter((squareId, index) => index % 2 === 1);
    }
    function emptySquares() {
        const squares = [0, 1, 2, 3, 4, 5, 6, 7, 8]
        const empty = squares.filter((squareId) => (!history.includes(squareId)));
        console.log(`Empty Squares: ${empty}`)
        return empty;
    }

    // Based on the history state, return an array of 8 ints 0-3 indicating the number of X's or O's in each row, col, and diagonal
    function xLines() {
        const xLines = getLines(xSquares());
        console.log(`Number of X in each line: ${xLines}`)
        return xLines;
    }
    function oLines(){
        const oLines = getLines(oSquares());
        console.log(`Number of O in each line: ${oLines}`)
        return oLines;
    }
    function getLines(claimedSquares) {
        let status = Array(8).fill(0);
        // For each square this player has claimed make 2, 3, or 4 updates
        claimedSquares.forEach(squareId => {
            // Update Row
            const row = Math.floor(squareId / 3)    // number 0, 1, or 2
            status[row]++;

            // Update Col
            const col = (squareId % 3)            // number 0, 1, or 2  +3 to account for the three indexes set asside for rows
            status[col + 3]++;

            // UpSlash ?
            if (squareId === 2 || squareId === 4 || squareId === 6) {
                status[6]++
            }

            // DownSlash ?
            if (squareId === 0 || squareId === 4 || squareId === 8) {
                status[7]++
            }
        });
        // console.log(`Status: ${status}`)
        return status;
    }
    
    
    // BOOLEAN helpers for getStatus() and handleSquareClick()
    function xWins() {
        return (xLines().includes(3));
    }
    function oWins() {
        return (oLines().includes(3));
    }
    function gameDrawn() {
        return (history.length >= 9 && !xWins() && !oWins());  // Board full and neither player has a win
    }
    function gameOver() {
        return (history.length >= 9 || xWins() || oWins());  // Board full or there's a 3-in-a-row
    }

}
