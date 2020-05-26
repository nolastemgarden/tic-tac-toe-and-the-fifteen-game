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
    console.log("History initialized to: " + history);

    // let [xLines, setXLines] = useState(Array(8).fill(0));
    // let [oLines, setOLines] = useState(Array(8).fill(0));
    
    // The board data to render is a the latest entry in history.  We will have an 'undo' but not a 'redo' button
    function getBoardValues(history) {
        // Start with an array representing a board of NINE empty squares ...
        let data = Array(9).fill('');
        // For each move in the history ...
        for ( let i = 0; i < history.length; i++ ) {
            // If it was X's turn set the index in data indicated here by history
            if ( i % 2 === 0 ) {
                data.splice(history[i], 1, 'x')
            }
            // If it was O's turn set the index in data indicated here by history
            else if (i % 2 === 1) {
                data.splice(history[i], 1, 'o')
            }
        }
        return data;
    }
    
    
    const panelData = getPanelData(history);
    function getPanelData(history) {
        // List moves according to row, col in table of moves made
        // Check for a win
        // Check for a draw
        // Panel has control buttons that must recieve clickHandlers which are defined in the <Game> and passed as props to the panel then the control section 
        // Game must genterate and pass in data for the Interactive info/hint panel
        
        return {};
    }
    

    return (
        <div className={classes.root} >
            <div className={classes.boardArea} >
                <Board 
                    data={getBoardValues(history)} 
                    handleSquareClick={handleSquareClick}

                />
            </div>
            <div className={classes.panelArea}>
                <Panel 
                    // data={getPanelData(history)} 
                    status={getStatus()}
                    handleUndoButtonClick={handleUndoButtonClick}
                />
            </div>
            
        </div>
    );

    function handleUndoButtonClick() {
        const shortenedHistory = history.slice(0, history.length - 1)
        console.log(`${history[history.length-1]} removed. Shortened history: ${shortenedHistory}`);
        setHistory(shortenedHistory);
    }


    
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
        setHistory(history.concat(squareClicked));
        // This function does not pass along any of its results, it acts thru side-effects. It calls setHistory and use of that hook tells React it needs to re-render all components that depend on the state "history".
    }


    // function historyFilteredByPlayer(history, player) {
    //     let playerNumber;
    //     if (player === 'x') {
    //         playerNumber = 0;
    //     }
    //     else if (player === 'o') {
    //         playerNumber = 1;
    //     }
    //     else {
    //         console.error(`filterHistoryByPlayer was passed an invalid player argument: ${player}`)
    //         playerNumber = undefined;
    //     }
    //     const filteredHistory = history.filter((squareId, index) => index % 2 === playerNumber);
    //     console.log(`Filtered History:  Player: ${player},  squares claimed: ${filteredHistory}`)
    //     return filteredHistory;
    // }
    

    // Based on the history state, return an array of 8 ints 0-3 indicating the number of X's or O's in each row, col, and diagonal
    function xLines() {
        const xLines = getLines(history.filter((squareId, index) => index % 2 === 0));
        console.log(`Number of X in each line: ${xLines}`)
        return xLines;
    }
    function oLines(){
        const oLines = getLines(history.filter((squareId, index) => index % 2 === 1));
        console.log(`Number of O in each line: ${oLines}`)
        return oLines;
    }
    function getLines(claimedSquares) {
        let status = Array(8).fill(0);
        // For each square this player has claimed make 2, 3, or 4 updates
        for (let i = 0; i < claimedSquares.length; i++) {
            const squareId = claimedSquares[i];

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
        }
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

    
    function getStatus() {
        if (xWins()){
            const winningLine = getLines(history.filter((squareId, index) => index % 2 === 0)).indexOf(3);
            return (`X wins on line ${winningLine}`)
        }
        else if (oWins()){
            return (`O wins!`)
        }
        else if (gameDrawn()){
            return (`Draw.`)
        }
        else if (history.length % 2 === 0){
            return (`X to move.`)
        }
        else if (history.length % 2 === 1) {
            return (`O to move.`)
        }
        else {
            console.error("getStatus() is broken!");
            return
        }
    }

}
