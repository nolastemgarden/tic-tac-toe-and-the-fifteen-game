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
    // let [showMoves, setShowMoves] = useState(false); 
    let [showMoves, setShowMoves] = useState(true); 
    // let [showCommentary, setShowCommentary] = useState(false);  
    let [showCommentary, setShowCommentary] = useState(true);  

    return (
        <div className={classes.root} >
            <div className={classes.boardArea} >
                <Board 
                    boardSymbols={getBoardSymbols()} 
                    boardColors={getBoardColors()}
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
    function getBoardSymbols() {
        let data = Array(9).fill('');  // Start with an array representing a board of NINE empty squares
        squaresClaimedByPlayer('x').forEach(squareId => {
            data[squareId] = 'x';
        });
        squaresClaimedByPlayer('o').forEach(squareId => {
            data[squareId] = 'o';
        });
        return data;
    }

    function getBoardColors() {
        // If the game is won highlight the winning line(s), whether hints are turned on or off.
        if (wins('x') || wins('o')) {
            return highlightWins();
        }
        // If hints are turned off return colors [] filled with empty strings.
        if (showMoves === false) {
            return Array(9).fill('');
        }
        // If hints are turned on return colors [] filled with empty strings.
        if (showMoves === true) {
            return getBoardHints();
        }
    }

    
    
    
    // TODO
    function getBoardHints() {
        const player = myTurn();
        console.log(`Getting board hints for player: ${player}...`)
        
        // Start with an array representing a board of NINE squares which all lead to an undetermined outcome.
        let hints = Array(9).fill('');  
        
        // PRIORITIES
        // 1) complete a 3 in a line to win.
        // 2) block opponent's 2 in a line.
        // 3) create a double attack.
        // ?) prevent opponent from creating a double attack.
        // 5) make a forcing move that does not force opponent to create a double attack.
        // Mark all claimed squares as 'claimed' (no hint) If a move is not diffinitively winning or losing or claimed after all checks have run then default it to 'draw' 

        // (1)
        // List the lines where I have 2 and the last square is empty. Mark these as winning.
        immediateWins().forEach(winningSquare => {
            hints[winningSquare] = 'win';
        });
        
        // (2) Check if enemy has an unblocked 2 in a row and if so Block it from becoming 3.
        urgentDefensiveMoves().forEach(keySquare => {
            if (hints[keySquare] === '') {                     // ONLY modify a square to say "draw" or "lose" if it has not already been labeled "win"
                if (urgentDefensiveMoves().length === 1) {
                    hints[keySquare] = 'draw';  
                }
                if (urgentDefensiveMoves().length > 1) {
                    hints[keySquare] = 'lose';
                    return hints;
                }
            }
        });


        // urgentDefensiveMoves() could potentially find a move that also happens to be an immediateWin or doubleAttackCreatingMove and in this case they should be labeled as 'winning' moves even though they are also urgentDefensiveMoves



        // console.log(`Opponent's unblocked two in a lines: ${listTwos(other(player))}`)
        // const list = listTwos(other(player));
        // //  If enemy has multiple unblocked 2 in a rows then all moves NOT YET MARKED mark as losing
        // if (list.length > 1) {
        //     console.log(`Opponent has multiple unblocked two in a lines!`)
        //     hints.forEach((hint, lineId) => {
        //         if (hint === '') {
        //             hints[lineId] = 'lose';
        //         }
        //     }); 
        // }



        //  If enemy has one unblocked 2 in a row then the last square in that line all moves NOT YET MARKED mark as losing, 
        // if (list.length === 1) {
        //     const keyLine = list[0];
        //     const keySquares = squaresInLine(keyLine);
        //     keySquares.forEach(square => {
        //         if (squareIsEmpty(square)) {
        //             hints[square] = 'draw'
        //         }
        //     })

        // }


        // listTwos(notMyTurn()).forEach((line) => {


        //     squaresInLine(line).forEach((square) => {
        //         if (squareIsEmpty(square)) {
        //             hints[square] = 'draw' // ????????????????? SOMETIMES THIS BLOCK ALSO WINS
        //         }
        //     })
        // })
        
        
        // 3) Try to make a double attack ... this would let you ignore an opponent attack
        //          this involves listing all of your 1-in-a-rows where the enemy has 0
        //          if there is a square in two lists then it is winning as it creates a double attack and we only reach this point if enemy has no 2 in a rows
        // 4) ??? otherwise make a single threat, a forcing (but not necessarily winning move)
        // is this enough to draw?? i'm going to build it this way then play with it to see if it is correct. 
        
        
        



        
       

        // List the lines where opponent has 2 and the last square is empty. 
        // If this list has 2 unique squares in it then all yet-unmarked moves are losing.
        // If this list has 1 unique square in it then 
        // -- that square may lead to a draw or a win.
        // -- all other yet-unmarked squares are losing.
        
        

        // Set all claimed squares to white bg.  Not necessary as they now default to white bg.
        // history.forEach(squareId => {
        //     hints[squareId] = '';
        // });

        return hints;
    }


    // MID-LEVEL HELPERS for getBoardColors()
    function highlightWins() {
        let highlightedSquares = Array(9).fill('')
        if (!gameOver) {  // Assert: we only reach this point if either x or o has won.
            console.error(`highlightWins() was called but found that the game is not over`);
        }
        let winner = (wins('x')) ? 'x' : 'o';
        // let lines = lines(winner);
        listThrees(winner).forEach(line => {
            squaresInLine(line).forEach(square => {
                highlightedSquares[square] = 'win';
            });
        });
        return highlightedSquares;
    } 
    
    // MID-LEVEL HELPERS for getBoardHints()
    function immediateWins(){
        let winningSquares = [];
        const player = myTurn();
        listTwos(player).forEach((line) => {
            squaresInLine(line).forEach((square) => {
                if (squareIsEmpty(square)) {
                    winningSquares.push(square);
                    // hints[square] = 'win'; This code used to be part of a bloated getBoardHints() method and at that time it had responsibility for actually assigning colors in the hints array that the method finally returned.
                }
            })
        })
        return winningSquares;
    }

    function urgentDefensiveMoves() {
        let keySquares = [];
        const player = myTurn();
        listTwos(other(player)).forEach((line) => {
            squaresInLine(line).forEach((square) => {
                if (squareIsEmpty(square)) {
                    keySquares.push(square);
                }
            })
        })
        return keySquares;
    }




    
    // HIGH-LEVEL PANEL HELPERS no params

    function getStatus() {
        if (wins('x')) {
            return (`X wins!`)
        }
        else if (wins('o')) {
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
        if (!squareIsEmpty(squareClicked)) {
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
        console.log(`handleUndoButtonClick() removed ${history[history.length - 1]} . New Shortened history: ${shortenedHistory}`);
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
    
    
    // TURN HELPERS
    // High-Level Methods that need to know whose turn it is can deduce that info by using these helpers to look at the history directly, rather than having to be invoked with a player param. 
    function myTurn() {
        return (history.length % 2 === 0) ? 'x' : 'o' ;
    }
    function notMyTurn() {
        return (history.length % 2 === 0) ? 'o' : 'x';
    }
    function other(player) {
        if (player !== 'o' && player !== 'x') { console.error(`other(player) called with invalid player: ${player}`)}
        return (player === 'o') ? 'x' : 'o';
    }


    // LOW-LEVEL HELPERS
    // need to be told which player you care about b/c they may be used on EITHER the player whose turn it is or the other player.
    function squaresClaimedByPlayer(player) {
        if (player === 'x') {
            return history.filter((squareId, index) => index % 2 === 0);
        }
        else if (player === 'o') {
            return history.filter((squareId, index) => index % 2 === 1);
        }
        else {
            console.error(`Method squaresClaimedByPlayer() called with invalid player: ${player}`)
            return undefined;
        }
    }
    function lineCounts(player) {
        // Based on the history state, return an array of 8 ints 0-3 indicating the number of X's or O's in each row, col, and diagonal
        let lines = Array(8).fill(0);

        squaresClaimedByPlayer(player).forEach(square => {
            // Update Row
            const row = Math.floor(square / 3)    // number 0, 1, or 2
            lines[row]++;

            // Update Col
            const col = (square % 3)            // number 0, 1, or 2  +3 to account for the three indexes set asside for rows
            lines[col + 3]++;

            // UpSlash ?
            if (square === 2 || square === 4 || square === 6) {
                lines[6]++
            }

            // DownSlash ?
            if (square === 0 || square === 4 || square === 8) {
                lines[7]++
            }
        });
        // console.log(`Status: ${status}`)
        return lines;
    }

    function wins(player) {
        return (lineCounts(player).includes(3));
    }
    function listThrees(player) {
        let list = [];
        // console.log(`lineCounts : ${lineCounts(player)}`)
        lineCounts(player).forEach((count, line) => {
            if (count === 3) {
                list.push(line)
            }
        })
        // console.log(`listThrees() called for player '${player}'. List: ${list}`)
        return list;
    }
    function listTwos(player) {
        let list = [];
        // console.log(`lineCounts : ${lineCounts(player)}`)
        lineCounts(player).forEach((count, line) => {
            if (count === 2) {  // && lineCounts(!player)[line] === 0
                list.push(line)
            }
        })
        console.log(`List Twos for player '${player}': ${list}`)
        return list;
    }


    function listOnes(player) {
        let list = [];
        // console.log(`lineCounts : ${lineCounts(player)}`)
        lineCounts(player).forEach((count, line) => {
            if (count === 2) {
                list.push(line)
            }
        })
        // console.log(`listOnes() called for player '${player}'. List: ${list}`)
        return list;
    }
    
    
    
    

    
    
    
    

    // list the squareIds that fall in a given lineId
    function squaresInLine(lineId) {
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
    function squareIsEmpty(square) {
        return (!history.includes(square))
    }
    

    
    function gameDrawn() {
        return (history.length >= 9 && !wins('x') && !wins('o'));  // Board full and neither player has a win
    }
    function gameOver() {
        return (history.length >= 9 || wins('x') || wins('o'));  // Board full or there's a 3-in-a-row
    }

}
