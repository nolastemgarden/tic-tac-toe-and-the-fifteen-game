import React, { useState } from 'react';

// My Components
import Board from "./FifteenBoard";
import Panel from "./Panel";


// MUI  components

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: '#4AC9FD'

    },
    boardArea: {
        backgroundColor: '#bbffff',
        height: '60%',
        width: '95%',
        display: 'flex',
        justifyContent: 'center',
    },
    panelArea: {
        // border: 'solid blue 1px',
        // backgroundColor: '#4AC9FD',
        boxSizing: 'border-box',
        width: '95%',
        height: '40%',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'

    },
}));


export default function FifteenGame() {
    const classes = useStyles();

    let [history, setHistory] = useState([]);
    // let [showMoves, setShowMoves] = useState(false); 
    let [showMoves, setShowMoves] = useState(true);
    // let [showCommentary, setShowCommentary] = useState(false);  
    let [showCommentary, setShowCommentary] = useState(true);

    // return (
    //     <div className={classes.root} >
    //         <div className={classes.boardArea} >
    //             <Board
    //                 boardSymbols={getBoardSymbols()}
    //                 boardColors={getBoardColors()}
    //                 handleSquareClick={handleSquareClick}
    //             />
    //         </div>
    //         <div className={classes.panelArea}>
    //             <Panel
    //                 // data={getPanelData(history)} 
    //                 status={getStatus()}
    //                 commentary={getCommentary()}
    //                 showMoves={showMoves}
    //                 showCommentary={showCommentary}
    //                 handleUndoButtonClick={handleUndoButtonClick}
    //                 handleNewGameButtonClick={handleNewGameButtonClick}
    //                 toggleShowMovesSwitch={toggleShowMovesSwitch}
    //                 toggleShowCommentarySwitch={toggleShowCommentarySwitch}
    //             />
    //         </div>
    //     </div>
    // );

    // The <Game> holds all state and most helper and handler function definitions.
    // It passes what it needs to to the board to render and to the panel.

    // The board data to render is a the latest entry in history.  We will have an 'undo' but not a 'redo' button.  May add a Make Computer Move
    // function getBoardSymbols(moveList = history) {
    // function getBoardColors() 
    // function getBoardHints() 
    


    // // MID-LEVEL HELPERS for getBoardColors() and getBoardHints()
    // function highlightWins()
    // function thereIsAnImmediateWin(moveList = history) 
    // function immediateWins(moveList = history) 
    // function thereIsAnUrgentDefensiveMove(moveList = history) 
    // function urgentDefensiveMoves(moveList = history) 
    // function threatCreatingMoves(moveList = history) 
    // function singleAttackCreatingMoves(moveList = history)
    // function doubleAttackCreatingMoves(moveList = history) 
    // function thereIsAWinningDoubleAttack(moveList = history)
    // function winningDoubleAttackCreatingMoves(moveList = history) 
    // function forcedWinCreatingMoves(moveList = history) 
    // function gameLosingMoves(moveList = history) 


    // // HIGH-LEVEL PANEL HELPERS no params
    // function getStatus() {
    // function getCommentary() 


    // // CLICK HANDLERS
    // function handleSquareClick(squareClicked) {
    // function handleUndoButtonClick() 
    // function handleNewGameButtonClick()
    // function toggleShowMovesSwitch() 
    // function toggleShowCommentarySwitch() 

    // // TURN HELPERS
    // // High-Level Methods that need to know whose turn it is can deduce that info by using these helpers to look at the history directly, rather than having to be invoked with a player param. 
    // function myTurn(moveList = history) {
    //     return (moveList.length % 2 === 0) ? 'x' : 'o';
    // }
    // function notMyTurn(moveList = history) {
    //     return (moveList.length % 2 === 0) ? 'o' : 'x';
    // }
    // function other(player) {
    //     if (player !== 'o' && player !== 'x') { console.error(`other(player) called with invalid player: ${player}`) }
    //     return (player === 'o') ? 'x' : 'o';
    // }

    // // LOW-LEVEL HELPERS
    // // need to be told which player you care about b/c they may be used on EITHER the player whose turn it is or the other player.
    // function squaresClaimedByPlayer(player, moveList = history) 
    // function lineCountsFor(player, moveList = history) 
    // function wins(player, moveList = history)
    // function thereIsAForcedWin(moveList = history)
    // function linesWithThree(player, moveList = history) 
    // function linesWithOnlyTwo(player, moveList = history) 
    // function linesWithOnlyOne(moveList = history) 
    // function emptyLines(moveList = history)
    // function blockedLines(moveList = history) 
    // function allLines() 
    // function emptySquares(moveList = history)
    // function squaresInLine(lineId) 

    // // BOOLEAN helpers for getStatus() and handleSquareClick()
    // function squareIsEmpty(square, moveList = history)
    // function gameDrawn() 
    // function gameOver(moveList = history) 




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


    function gameOver() {
        return false;
        // return (history.length >= 9 || xWins() || oWins());  // Board full or there's a 3-in-a-row
    }

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

    
}


