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
        squaresClaimedByPlayer('x', history).forEach(squareId => {
            data[squareId] = 'x';
        });
        squaresClaimedByPlayer('o', history).forEach(squareId => {
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
        // 4) make a move that gives the opponent an urgentDefensiveMove and sets you up to create a double attack after the opponent makes thier forced reply.
        // Mark all claimed squares as 'claimed' (no hint) If a move is not diffinitively winning or losing or claimed after all checks have run then default it to White Back Ground 

        // (1)
        // List the lines where I have 2 and the last square is empty. Mark these as winning.
        immediateWins().forEach(winningSquare => {
            hints[winningSquare] = 'win';
        });
        
        // (2) Check if enemy has an unblocked 2 in a row and if so Block it from becoming 3.
        // If there are multiple urgent defensive moves they both are Losing. If there is one it is set here to Draw but that may be over-written if the following call to doubleAttackCreatingMoves() finds that an urgent defensive move is simultanoeusly a winning attacking move.
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
        
        // (3) This is third priority because a doubleAttack is only winning if there were NO urgentDefensiveMoves() or if there was One urgentDefensiveMoves() and it was the same square as found by doubleAttackCreatingMoves().
        doubleAttackCreatingMoves().forEach(keyAttackingMove => {
            if (urgentDefensiveMoves().length === 0 ) {
                hints[keyAttackingMove] = 'win';
            }
            if (urgentDefensiveMoves().length === 1) {
                const keyDefensiveMove = urgentDefensiveMoves()[0] 
                if (keyAttackingMove === keyDefensiveMove) {  // I believe an equivalent test would be to check if hints[keySquare] has already been set to 'draw' by the code block above that starts with a call to urgentDefensiveMoves().
                    hints[keyAttackingMove] = 'win';
                }
            }
            if (urgentDefensiveMoves().length > 1) {
                // Then it doesn't matter if you can create a double attack or not, because your opponent already has their own double attack.
                console.log(`doubleAttackCreatingMoves() found a double attack but it was irrelevant because opponent already had a double attack.`)
                return hints;
            }
        });

        // (4) forcedWinCreatingMoves() are irrelevant if there the opponent has a doubleAttack but not so if opponent has only a single attack
        forcedWinCreatingMoves()


        return hints;
    }


    // MID-LEVEL HELPERS for getBoardColors() and getBoardHints()
    function highlightWins() {
        let highlightedSquares = Array(9).fill('')
        if (!gameOver) {  // Assert: we only reach this point if either x or o has won.
            console.error(`highlightWins() was called but found that the game is not over`);
        }
        let winner = (wins('x')) ? 'x' : 'o';
        // let lines = lines(winner);
        linesWithThree(winner).forEach(line => {
            squaresInLine(line).forEach(square => {
                highlightedSquares[square] = 'win';
            });
        });
        return highlightedSquares;
    } 
     
    function immediateWins(){
        let winningSquares = [];
        const player = myTurn();
        linesWithOnlyTwo(player).forEach((line) => {
            squaresInLine(line).forEach((square) => {
                if (squareIsEmpty(square)) {
                    winningSquares.push(square);
                    // hints[square] = 'win'; This code used to be part of a bloated getBoardHints() method and at that time it had responsibility for actually assigning colors in the hints array that the method finally returned.
                }
            })
        })
        return winningSquares;
    }

    function urgentDefensiveMoves(player = myTurn()) {
        let keySquares = [];
        linesWithOnlyTwo(other(player)).forEach((line) => {
            squaresInLine(line).forEach((square) => {
                if (squareIsEmpty(square)) {
                    keySquares.push(square);
                }
            })
        })
        return keySquares;
    }

    function threatCreatingMoves(player = myTurn()) {
        // if (player === undefined){
        //     player = myTurn();
        // }
        const threatCreatingMoves = []; // A squareId that appears here once creates a two-in-a-line threat.  A squareId that appears here twice creates two separate two-in-a-line threats.
        linesWithOnlyOne(player).forEach((line) => {
            squaresInLine(line).forEach((square) => {
                if (squareIsEmpty(square)) {                 // Don't add an already claimed square to the list of therat creating moves!
                    threatCreatingMoves.push(square);
                }
            })
        })
        console.log(`threatCreatingMoves() found the following empty squares make threats for player '${player}': ${threatCreatingMoves}`)
        return threatCreatingMoves;
    }

    function doubleAttackCreatingMoves() {
        return threatCreatingMoves().filter((square, index) => threatCreatingMoves().indexOf(square) !== index );
    }

    function forcedWinCreatingMoves() {
        let list = [];
        
        const player = myTurn();
        // In order for X to have a forced win O's second move must be forced, an urgentDefensiveMove.
        // Simply that O is making an urgentDefensiveMove does not mean O is on track to lose...
        // But since O's send move is forced we can take the resulting modified history and pass it to doubleAttackCreatingMoves()
        // this lets us know one move sooner that X is on track to win. 
        
        // emptySquares(history).forEach(square => {

        // })
        threatCreatingMoves().forEach(square => {
            let hypotheticalHistory = history.concat(square).concat(urgentDefensiveMoves(other(player)));
            
            
            
            console.log(`hypotheticalHistories to check for double attacks: ${hypotheticalHistory}`)
            // if hypotheticalHistory.
        })
        
        
        // if (urgentDefensiveMoves(player).length === 1) {

        //     // CURRENTLY BROKEN B/C it does not check if o's defensive move creates a threat
        //     return true;
        // }
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

        // If two moves has been made
        if (history.length === 2) {
            const player = myTurn();
            const ones = linesWithOnlyOne(player).length
            
            return `Each player has gone once and now X has ${ones} lines with a 1-0 advantage. Look for a forcing move that will set you up to make a double attack next turn!`
        }

        // If three moves have been made
        if (history.length === 3 && forcedWinCreatingMoves()) {
            return `O's first move was a mistake and now X has set up a forced win in two moves!`
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
    function squaresClaimedByPlayer(player, history) {
        // let history = (alteredHistory === undefined) ? history : alteredHistory
        
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
    function lineCountsFor(player) {
        // Based on the history state, return an array of 8 ints 0-3 indicating the number of X's or O's in each row, col, and diagonal
        let lines = Array(8).fill(0);

        squaresClaimedByPlayer(player, history).forEach(square => {
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
        return (lineCountsFor(player).includes(3));
    }
    function linesWithThree(player) {
        let list = [];
        // console.log(`lineCountsFor : ${lineCountsFor(player)}`)
        lineCountsFor(player).forEach((count, line) => {
            if (count === 3) {
                list.push(line)
            }
        })
        // console.log(`linesWithThree() called for player '${player}'. List: ${list}`)
        return list;
    }
    function linesWithOnlyTwo(player) {
        let list = [];
        lineCountsFor(player).forEach((count, line) => {
            if (count === 2 && lineCountsFor(other(player))[line] === 0 ) {  
                list.push(line)
            }
        })
        // console.log(`List Unblocked Twos for player '${player}': ${list}`)
        return list;
    }
    function linesWithOnlyOne(player) {
        let list = [];
        lineCountsFor(player).forEach((count, line) => {
            if (count === 1 && lineCountsFor(other(player))[line] === 0) {
                list.push(line)
            }
        })
        // console.log(`List Unblocked Ones for player '${player}': ${list}`)
        return list;
    }
    function emptyLines() {
        let list = [];
        lineCountsFor('x').forEach((count, line) => {
            if (count === 0 && lineCountsFor('o')[line] === 0) {
                list.push(line)
            }
        })
        console.log(`List Empty Lines: ${list}`)
        return list;
    }
    function blockedLines() {
        let list = [];
        lineCountsFor('x').forEach((count, line) => {
            if (count > 0 && lineCountsFor('o')[line] > 0) {
                list.push(line)
            }
        })
        console.log(`List Blocked Lines: ${list}`)
        return list;
    }
    function allLines() {
        // Top Row, Middle Row, Bottom Row, 
        // Left Column, Middle Column, Right Column,
        // Upslash Diagonal, Downslash Diagonal
        return [0, 1, 2, 3, 4, 5, 6, 7]
    }
    
    
    
    

    
    // list all squareIds not appearing in the history or an 
    function emptySquares(history) {
        let list = [];
        history.forEach((square) => {
            if (!history.includes(square)) {
                list.push(square)
            }
        })
        console.log(`List Empty Squares: ${list}`)
        return list;
    }
    

    // list the squareIds that fall in a given lineId
    function squaresInLine(lineId) {
        // console.log(`getSquares() was called with lineId: ${lineId}`)
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
    

    
    // function gameDrawn() {
    //     return (history.length >= 9 && !wins('x') && !wins('o'));  // Board full and neither player has a win
    // }
    function gameDrawn() {
        return (blockedLines().length >= 8 && !wins('x') && !wins('o'));  // Board full and neither player has a win
    }
    
    
    
    function gameOver() {
        return (history.length >= 9 || wins('x') || wins('o'));  // Board full or there's a 3-in-a-row
    }

}
