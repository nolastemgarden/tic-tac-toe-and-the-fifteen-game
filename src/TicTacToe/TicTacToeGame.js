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
    // let [showCommentary, setShowCommentary] = useState(false);  
    let [showCommentary, setShowCommentary] = useState(true);  

    return (
        <div className={classes.root} >
            <div className={classes.boardArea} >
                <Board 
                    boardValues={getBoardValues()} 
                    boardHints={getBoardHints()}
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

    function highlightWins() {
        console.log(`highlightWins() was called`)
        let highlights = Array(9).fill('');
        
        // Assert: we only reach this point if either x or o has won.
        let lines = (xWins()) ? xLines() : oLines();
        lines.forEach((count, index) => {  // 2nd param to foreach is the current index in the array which in this case corresponds to the lineId
            if (count === 3) {
                console.log(`highlightWins() found a win in line: ${index}`)
                getSquares(index).forEach(squareId => {
                    highlights[squareId] = 'win';
                })
            }
        });
        return highlights;
    } 
    
    // TODO
    function getBoardHints() {
        // If the game is over return early, there are no hints to give. In case of a draw there are no hinst since the board is full.
        if (xWins() || oWins()) { 
            return highlightWins();
        }

        
        // Start with an array representing a board of NINE squares which all lead to a draw.
        let hints = Array(9).fill('draw');  
        
        
        history.forEach(squareId => {
            hints[squareId] = '';
        });
        
        
        // hints.forEach(squareId => {
        //     // If the square is already claimed there is no hint about it.
        //     if(history.includes(squareId)) {
        //         hints[squareId] = 'draw'
        //     }
        // });
        
        // Else put a yellow dot in each square
       
        // Whos turn is it?
        
        // For each line   
        // -- see how many X's are in it
        // -- see how many O's are in it
        
        // emptySquares().forEach(squareId => {
        //     data[squareId] = '';
        // });
        return hints;
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
            console.error("A call to getStatus() did not work!");
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
            return `X goes first. It may look like there are 9 different options but 
            when you consider symmetry there are really only 3: Center, Edge, or Corner.`
        }

        // If one move has been made
        if (history.length === 1 && history[0] === 4) {
            return `X went in the center. O has two options. One is good and lets O
            force a draw. The other is bad and gives X a chance to win.`
        }
        if (history.length === 1 && history[0] !== 4 && history[0] % 2 === 0 ) {
            return `X went in the corner. O has five non-symmetrical options. Only 
            one of them prevents X from being able to force a win.`
        }
        if (history.length === 1 && history[0] !== 4 && history[0] % 2 === 1) {
            return `X went on the edge. O has five non-symmetrical options. __ are
            good and let O force a draw. The other __ are mistakes that give X a 
            chance to win.`
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

    // list the squareIds that fall in a given lineId
    function getSquares(lineId) {
        console.log(`getSquares() was called with lineId: ${lineId}`)
        let squareIds;
        switch (lineId) {
            case 0:
                squareIds = [0, 1, 2];
                break;
            case 1:
                squareIds = [3, 4, 5];
                break;
            case 2:
                squareIds = [6, 7, 8];
                break;
            case 3:
                squareIds = [0, 3, 6];
                break;
            case 4:
                squareIds = [1, 4, 7];
                break;
            case 5:
                squareIds = [2, 5, 8];
                break;
            case 6:
                squareIds = [2, 4, 6];
                break;
            case 7:
                squareIds = [0, 4, 8];
                break;
            default:
                console.error(`getSquares() was called with an invalid lineId.`)
        }
        return squareIds;
        
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
