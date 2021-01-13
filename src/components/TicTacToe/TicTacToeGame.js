import React, { useState } from 'react';

import './TicTacToe.css';

// My Components
import Board from "./Board";
import Panel from "./Panel";
import PlayPanel from "./PlayPanel";
import LearnPanel from "./LearnPanel";


// MUI  components
import Box from '@material-ui/core/Box';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({

    root: {
        // border: 'solid purple 1px',
        width: '100%',
        height: 'calc(100% - 3.8rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'space-between',
    },
    boardContainer: {
        // border: 'solid orange 1px',
        width: '100%',
        paddingTop: 'min(100%, 50vh)',
        height: '0',
        position: 'relative',
    },
    boardArea: {
        // border: 'solid yellow 1px',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',

    },
    panelArea: {
        // border: 'solid yellow 1px',
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.black,
        width: '100%',
        // width: '50vh',
        padding: '1.0rem',
        flex: '2 1 35vh',
        margin: '0rem auto',
        
    },
}));


export default function TicTacToeGame(props) {
    const classes = useStyles();
    const mode = props.mode;
    
    // State used in BOTH modes    
    let [moveList, setMoveList] = useState([]); 

    // State used ONLY in PLAY mode    
    let [gameNumber, setGameNumber] = useState(1);
    let [record, setRecord] = useState([0, 0, 0]);     // 3 element counter for humanWins, botWins, and tieGames.
    
    // State used ONLY in LEARN mode    
    let [showHints, setShowHints] = useState(false); 


    return (
        <Box className={classes.root} >
            <Box className={classes.boardContainer}>
                <Box className={classes.boardArea} >
                    <Board
                        boardIcons={getBoardIcons()}
                        boardColors={getBoardColors()}
                        handleSquareClick={handleSquareClick}
                    />
                </Box>
            </Box>
            <Box className={classes.panelArea}>
                {(mode === 'play') ? 
                    <PlayPanel
                        gameNumber={gameNumber}
                        record={record}
                        gameStatus={getStatus()}
                        handleNewGameClick={handleNewGameClick}
                    />  : 
                    <LearnPanel
                        gameStatus={getStatus()}
                        commentary={getCommentary()}
                        handleUndoClick={handleUndoClick}
                        toggleShowHints={toggleShowHints}
                    />
                }
            </Box>
        </Box>
    );

    // The <Game> holds all state and most helper and handler function definitions.
    // It passes what it needs to to the board to render and to the panel.
    
    // The board data to render is always the latest entry in history.  We will have an 'undo' but not a 'redo' button.  May add a Make Computer Move
    function getBoardIcons(ml = moveList) {
        let data = Array(9).fill('');  // Start with an array representing a board of NINE empty squares
        
        ml.forEach((squareId, turn) => {
            if (turn % 2 === 0) {
                data[squareId] = 'x';
            }
            else {
                data[squareId] = 'o';
            }
        })
        return data;  // this method only deals with current board position, not hypotheticals.  Thus, it wants to use a version of helper squaresClaimedByPlayer() that does not require a moveList be explicitly passed in. 
    }

    
    function getBoardColors(ml = moveList) {
        // If the game is won highlight the winning line(s), whether hints are turned on or off.
        console.log(`getBoardData checking if there is a win to highlight`)
        // if (gameOver() && !gameDrawn()) {
        if (gameOver(ml)) {
            return highlightWins();
        }
        console.log(`getBoardData DID NOT find a win to highlight`)

        // If hints are turned off return colors [] filled with 'noColor' strings.
        if (mode === 'play') {
            return Array(9).fill('noColor');
        }
        // If hints are turned on return colors [] filled by getBoardHints().
        if (mode === 'learn') {
            // console.log(`Board Hints: ${getBoardHints()}`)
            return (showHints === true) ? getBoardHints() : Array(9).fill('noColor');
        }
    }

    
    // list all squareIds not appearing in the history or an 
    function emptySquares(ml = moveList) {
        let emptySquaresList = [];
        for (let i = 0; i < 9; i++) {
            if (!ml.includes(i)) {
                emptySquaresList.push(i)
            }
        }
        // console.log(`List Empty Squares: ${emptySquaresList}`)
        return emptySquaresList;
    }

    
    //  Squares for which the value of the Hint is yet to be determined. 
    function unknownSquares(hints) {
        let unknownSquares = [];
        hints.forEach((value, index) => {
            if (value === 'unknown'){
                unknownSquares.push(index)
            }
        })
        return unknownSquares;
    }

    // WON GAME defined: the player specified has all three squares in at least one line.
    function wins(player, ml = moveList) {
        return (lineCountsFor(player, ml).includes(3));
    }
    // function wins(player, ml = moveList) {
    //     return (lineCountsFor(player, ml).includes(3));
    // }


    function xWins(ml = moveList) {
        lineCounts(ml).forEach(lineTuple => {
            if (lineTuple[0] === 3) {
                return true
            }
        })
        return false
    }
    function oWins(ml = moveList) {
        lineCounts(ml).forEach(lineTuple => {
            if (lineTuple[1] === 3) {
                return true
            }
        })
        return false
    }
    function gameDrawn(ml = moveList) {
        lineCounts(ml).forEach(lineTuple => {
            if (lineTuple[0] === 0 && lineTuple[1] === 0) {
                return false
            }
        })
        return true
    }
    
    // IMMEDIATE WIN defined: the player whose turn it is has an un-blocked two-in-a-line
    function immediateWins(ml = moveList) {
        const player = myTurn(ml);
        let winningMoves = [];
        linesWithOnlyTwo(player, ml).forEach((line) => { // console.log(`urgentDefensiveMoves found line ${line} has only two ${other(player)}`)
            squaresInLine(line).forEach((square) => {
                if (squareIsEmpty(square, ml) && !winningMoves.includes(square)) {
                    winningMoves = winningMoves.concat(square);
                }
            })
        })
        return winningMoves;
    }
    function thereIsAnImmediateWin(ml = moveList) {
        return (immediateWins(ml).length > 0)
    }


    // IMMEDIATELY LOSING MOVES: moves that make it so the opponent has an immediateWin.
    function immediatelyLosingMoves(ml = moveList) {
        let immediatelyLosingMoves = [];
        emptySquares(ml).forEach(testSquare => {
            let hypotheticalHistory = moveList.concat(testSquare);
            if (thereIsAnImmediateWin(hypotheticalHistory)) {  
                immediatelyLosingMoves = immediatelyLosingMoves.concat(testSquare);
            }
        })
        return immediatelyLosingMoves;
    }


    // URGENT DEFENSIVE MOVES are moves that claim the last square in a line where the opponent has a two-to-zero advantage.
    function urgentDefensiveMoves(ml = moveList) {
        const player = myTurn(ml);
        let urgentDefensiveMoves = [];
        linesWithOnlyTwo(other(player), ml).forEach((line) => { // console.log(`urgentDefensiveMoves found line ${line} has only two ${other(player)}`)
            squaresInLine(line).forEach((square) => {
                if (squareIsEmpty(square, ml) && !urgentDefensiveMoves.includes(square)) {
                    urgentDefensiveMoves = urgentDefensiveMoves.concat(square);
                }
            })
        })
        // console.log(`urgentDefensiveMoves() found the following moves for ${player}: ${urgentDefensiveMovesList}`);
        return urgentDefensiveMoves;
    }
    function thereIsAnUrgentDefensiveMove(ml = moveList) {
        return (urgentDefensiveMoves(ml).length === 1)
    }


    // DEFINITION: a DoubleAttack position is created when the player whose turn it is has no immediateWins() && has 2 distinct urgentDefensiveMoves(). 
    function thisIsADoubleAttack(ml = moveList) {
        return (!thereIsAnImmediateWin(ml) && urgentDefensiveMoves(ml).length > 1);
    }
    function doubleAttackCreatingMoves(ml = moveList) {
        let doubleAttackCreatingMoves = [];
        emptySquares(ml).forEach(testSquare => {
            let hypotheticalHistory = ml.concat(testSquare);
            if (thisIsADoubleAttack(hypotheticalHistory)) {
                doubleAttackCreatingMoves = doubleAttackCreatingMoves.concat(testSquare)
            }
        })
        // console.log(`doubleAttackCreatingMoves in position: ${moveList} found these attacks: ${doubleAttackCreatingMoves}`);
        return doubleAttackCreatingMoves;
    }
    function thereIsADoubleAttackCreatingMove(ml = moveList) {
        return (doubleAttackCreatingMoves(ml).length > 0)
    }

    function doubleAttackGrantingMoves(ml = moveList) {
        let doubleAttackGrantingMoves = [];
        emptySquares(ml).forEach(testSquare => {
            let hypotheticalHistory = ml.concat(testSquare);
            if (thereIsADoubleAttackCreatingMove(hypotheticalHistory)) {  // If there are any wins for Opponent in this hypotheticalHistory then the testSquare is a losing move. 
                doubleAttackGrantingMoves = doubleAttackGrantingMoves.concat(testSquare);
            }
        })
        return doubleAttackGrantingMoves;
    }

    


    // TODO
    function getBoardHints() {
        // PRIORITIES  
        // (0)
        const player = myTurn(moveList);
        let hints = Array(9).fill('unknown');  // Start with an array representing a board of NINE squares.
        
        // // (1)
        // claimedSquares().forEach(squareId => {
        //     hints[squareId] = 'claimed';
        // });
        // (1)
        moveList.forEach(squareId => {
            hints[squareId] = 'claimed';
        });

        //  (2) Mark my immediate wins.   GREEN
        immediateWins(moveList).forEach(winningSquare => {
            hints[winningSquare] = 'win';
        });

        // (3) Mark immediate losses.  yet unknown squares that grant opponent an immediate win. yet unknown implies unclaimed and not an immediate win.  RED
        immediatelyLosingMoves(moveList).forEach(losingSquare => {
            if (hints[losingSquare] === 'unknown') {
                hints[losingSquare] = 'lose';
            }
        });
        
        
        // (4) Mark double attacking wins.  yet unknown squares that create a double attack.  GREEN
        doubleAttackCreatingMoves(moveList).forEach(keyAttackingMove => {
            if (hints[keyAttackingMove] === 'unknown'){
                hints[keyAttackingMove] = 'win';
            }
        });
        
        // (5) Mark moves that grant the opponent a double attacking win. Only apply to yet unknown squares.  RED
        doubleAttackGrantingMoves(moveList).forEach(losingSquare => {
            if (hints[losingSquare] === 'unknown') {
                hints[losingSquare] = 'lose';
            }
        });
        
        // (6) Mark distant win forcing moves.  yet unknown squares that initiate a 3 move win sequence.  GREEN
        distantForcedWinCreatingMoves(moveList).forEach(keyAttackingMove => {
            if (hints[keyAttackingMove] === 'unknown') {
                hints[keyAttackingMove] = 'win';
            }
        });

        // (7) Mark moves that grant the opponent a distant win forcing moves. Only apply to yet unknown squares.  RED
        console.log(`Yet UNKNOWN squares in the hints: ${unknownSquares(hints)}`)
        unknownSquares(hints).forEach(testSquare => {
            let hypotheticalHistory = moveList.concat(testSquare);
            if (thereIsADistantForcedWinCreatingMove(hypotheticalHistory)) {  // If there are any distant forced wins for Opponent in this hypotheticalHistory then the testSquare is a losing move. 
                hints[testSquare] = 'lose';
            }  // else {  The test square does not create an immediate loss, leave it as 'unknown' for now.}
        });

        // (8) Mark yet unknown squares as leading to a draw.
        unknownSquares(hints).forEach(square => {
            hints[square] = 'draw';
        });
        
        // console.log(`getBoardHints() made this list: ${hints}`)
        return hints;
    }

    
    // HIGH-LEVEL PANEL HELPERS no params
    // function getStatus(ml = moveList) {
    //     if (wins('x')) {
    //         return (`X wins!`)
    //     }
    //     else if (wins('o')) {
    //         return (`O wins!`)
    //     }
    //     else if (gameDrawn()) {
    //         return (`Draw.`)
    //     }
    //     else if (history.length % 2 === 0) {
    //         return (`X's turn.`)
    //     }
    //     else if (history.length % 2 === 1) {
    //         return (`O's turn.`)
    //     }
    //     else {
    //         console.error("A call to getStatus() did not work!");
    //         return
    //     }
    // }
    // HIGH-LEVEL PANEL HELPERS no params
    function getStatus(ml = moveList) {
        if (xWins(ml)) {
            return (`X wins!`)
        }
        else if (oWins(ml)) {
            return (`O wins!`)
        }
        else if (gameDrawn(ml)) {
            return (`Draw.`)
        }
        else if (ml.length % 2 === 0) {
            return (`X's turn.`)
        }
        else if (ml.length % 2 === 1) {
            return (`O's turn.`)
        }
        else {
            console.error("A call to getStatus() did not work!");
            return
        }
    }


    function getCommentary(ml = moveList) {
        // console.log(`getCommentary() called while showCommentary = ${showCommentary}`)
        if (gameOver()) {
            return `Game Over`
        }
        if (mode === 'play') {
            return `Coach's commentary would appear here in learn mode. TODO w-l-d record`
        }

        // If no moves have been made
        if (ml.length === 0) {
            return `It may look like X has  9 different options but 
            when you consider symmetry there are really only 3: Center, Edge, or Corner.
            None of X's current options would be mistakes, but nor do any of them lead to a forced win.`
        }

        // If one move has been made
        if (ml.length === 1 && ml[0] === 4) {
            return `The center opening is the most popular because there are more three-in-a-rows that 
            include the center square than any other square.  Though it is sound for X, the center opening 
            is also the easiest for O to defend against.
            Considering symmetry, O really only has two options, edge or corner. 
            One is good and keeps O on track for a draw. The other is bad and opens the door for X to force a win.`
        }
        if (ml.length === 1 && ml[0] !== 4 && ml[0] % 2 === 0 ) {
            return `The corner opening can lead X to a winning double attack if O makes a mistake on their first move.
            Unfortunately for X, the only sound move that O has in this position is also the most intuitive one.
            Proove this to yourself by going through each of O's losing options and finding a plan for X that guarantees a win.`
        }
        if (ml.length === 1 && ml[0] % 2 === 1) {
            return `The Edge opening is the least commonly played and is the most complex to analyze.
            There are tricks and traps in this position that both players can take advantage of! 
            O has five non-symmetrical options. Don't settle for just finding one move that lets O force a draw, 
            dig into each of the five options and find the ones that maximize the chances X will make a mistake.`
        }

        // If two moves has been made
        if (ml.length === 2) {
            let message = '';
            if (thereIsADistantForcedWinCreatingMove()) {
                message = `O's first move was a mistake and now X can ensure victory! But how?`
            }
            else {
                let answer = (gameLosingMoves().length > 0) ? 'Yes! So be careful.' : 'No! You\'re safe no matter what.';
                message = `O's first move was sound. None of X's current options ensure victory, but do any actually lose?  ${answer}`
            }
            return message;
        }

        // If three moves have been made
        if (ml.length >= 3 ) {
            let message = '';
            if (thereIsAnImmediateWin()) {
                message = `You have a winning move! Defensive moves are irrelevant.`
            }
            else if (thisIsADoubleAttack()) {
                message = `You cannot win right now and cannot block all of your opponent's threats. Which move led you to from a draw to defeat?`
            }
            else if (thereIsADoubleAttackCreatingMove()) {
                message = `You can set up a winning double attack! Don't settle for empty threats, 
                think hard and be sure that you are setting yourself up to win no matter what!`
            }
            else if (thereIsAnUrgentDefensiveMove()) {
                message = `You cannot win right now so you must defend the one key square.`
            }
            
            else {
                let answer = (gameLosingMoves().length > 0) ? 
                    'Nonetheless, it is possible for you to make a mistake and lose right now. Play carefully!' : 
                    'You\'re on track for a draw no matter what move you play in this position.';
                message = `You have neither a winning attack nor an urgent defensive move. ${answer}`
            }
            return message;
        }

    }







    // MID-LEVEL HELPERS for getBoardColors() and getBoardHints()
    function highlightWins() {
        console.assert(!gameOver(), `highlightWins() was called but found that the game is not over`);
        
        let highlightedSquares = Array(9).fill('noColor')
        let data = lineData() 

        
        if (data.xSquares.length === 3) {
            let squaresToHighlight = data.xSquares
            squaresToHighlight.forEach(square => {
                highlightedSquares[square] = 'win';
            });
        }

        
        return highlightedSquares;
    } 

    // function highlightWins() {
    //     console.assert(!gameOver(), `highlightWins() was called but found that the game is not over`);

    //     let highlightedSquares = Array(9).fill('noColor')

    //     let winner = (wins('x')) ? 'x' : 'o';
    //     // let lines = lines(winner);
    //     linesWithThree(winner).forEach(line => {
    //         squaresInLine(line).forEach(square => {
    //             highlightedSquares[square] = 'win';
    //         });
    //     });
    //     return highlightedSquares;
    // } 
     
    

    function threatCreatingMoves(ml = moveList) {
        // This list may contain duplicates. A squareId that appears twice creates two separate two-in-a-line threats.
        const player = myTurn(ml);
        const threatCreatingMoves = []; 
        linesWithOnlyOne(ml).forEach((line) => {
            squaresInLine(line).forEach((square) => {
                if (squareIsEmpty(square, ml)) {                 // Don't add an already claimed square to the list of therat creating moves!
                    threatCreatingMoves.push(square);
                }
            })
        })
        // console.log(`Player '${player}' can create threats on the following squares: ${threatCreatingMoves}`)
        return threatCreatingMoves;
    }

    


    // DEFINITION: thisMoveIsForced IFF player who moved last has one unblocked threat and player whose turn it is has none.
    function thisMoveIsForced(ml = moveList) {
        let isForced = (!thereIsAnImmediateWin(ml) && thereIsAnUrgentDefensiveMove(ml))
        // console.log(`In position: ${moveList} The next move is forced: ${isForced}`)
        return (isForced);
    }
    
    // DEFINITION: ForcingMoves are the moves that give the opponent an urgentDefensiveMove and no immediateWin to take presidence over it.
    function forcingMoves(ml = moveList) {
        let forcingMoves = [];
        emptySquares(ml).forEach(testSquare => {
            let hypotheticalHistory = ml.concat(testSquare);
            if (thisMoveIsForced(hypotheticalHistory)) {
                forcingMoves = forcingMoves.concat(testSquare)
            }
        })
        // console.log(`forcingMoves found these: ${forcingMoves}`)
        return forcingMoves;
    }
    
    
    // DEFINITION: A move that creates a position where you have one threat and your opponent has none &&
    //             once your opponent responds with their one urgentDefensiveMove you are left with the ability to create a double attack. 
    function distantForcedWinCreatingMoves(ml = moveList) {
        let distantForcedWinCreatingMovesList = [];
        // There cannot be a distantForcedWinCreatingMove unless there are at least 5 empty squares and playerTwo has has a chance to make an error on their first move.
        if (ml.length < 2 || ml.length > 4){
            return distantForcedWinCreatingMovesList;
        }
        // To force a win you must force the first reply ... 
        forcingMoves(ml).forEach(forcingMove => {
            // ... and ensure the forced reply leaves you able to create a double attack.
            let hypotheticalHistory = ml.concat(forcingMove);
            if (urgentDefensiveMoves(hypotheticalHistory).length !== 1){
                console.error(`There are ${urgentDefensiveMoves(hypotheticalHistory).length} urgentDefensiveMoves in the hypotheticalHistory being examined by distantForcedWinCreatingMoves.`)
            }
            let urgentDefensiveMove = urgentDefensiveMoves(hypotheticalHistory)[0];
            hypotheticalHistory = hypotheticalHistory.concat(urgentDefensiveMove);
            // console.log(`The one urgent defensive move is ${urgentDefensiveMove} leading to position: ${hypotheticalHistory}`);
            if (thereIsADoubleAttackCreatingMove(hypotheticalHistory)){
                distantForcedWinCreatingMovesList = distantForcedWinCreatingMovesList.concat(forcingMove);
            }
        })
        console.log(`distantForcedWinCreatingMoves() found the following list: ${distantForcedWinCreatingMovesList}`)
        return distantForcedWinCreatingMovesList;
    }
    function thereIsADistantForcedWinCreatingMove(ml = moveList) {
        // There cannot be a distantForcedWinCreatingMove unless there are at least 5 empty squares and playerTwo has has a chance to make an error on their first move.
        // return (moveList.length > 2 && moveList.length < 5 && distantForcedWinCreatingMoves(moveList).length > 0)
        return (distantForcedWinCreatingMoves(ml).length > 0)
    }


    
    // Check if each of the squares that is is still empty is a losing Move
    function gameLosingMoves(ml = moveList) {  // This function should ONLY be called by getBoardHints when there are no forced Win Creating Moves
        let gameLosingMoves = [];
        emptySquares().forEach(square => {
            let hypotheticalHistory = ml.concat(square);
            if (thereIsAForcedWin(hypotheticalHistory)) {
                console.log(`I think I found a forced win after the moves: ${hypotheticalHistory}`)
                gameLosingMoves = gameLosingMoves.concat(square)
            }
        })
        console.log(`gameLosingMoves() found the following list: ${gameLosingMoves}`)
        return gameLosingMoves;
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
        let updatedMoveList = moveList.concat(squareClicked)
        console.log(`MoveList: ${updatedMoveList}`)
        
        setMoveList(updatedMoveList);
        // This function does not pass along any of its results, it acts thru side-effects. It calls setHistory and use of that hook tells React it needs to re-render all components that depend on the state "history".
    }
    function handleUndoClick() {
        const shortenedMoveList = moveList.slice(0, moveList.length - 1)
        console.log(`handleUndoClick() removed ${moveList[moveList.length - 1]} . New Shortened history: ${shortenedMoveList}`);
        setMoveList(shortenedMoveList);
    }
    function handleNewGameClick() {
        setMoveList([]);
    }
    function toggleShowHints() {
        // console.log(`toggleShowHintsSwitch called, setting  to ${!showHints}`);
        setShowHints(!showHints)
    }
    // function toggleShowCommentarySwitch() {
    //     setShowCommentary(!showCommentary)
    // }
    
    
    // TURN HELPERS
    // High-Level Methods that need to know whose turn it is can deduce that info by using these helpers to look at the history directly, rather than having to be invoked with a player param. 
    function myTurn(ml = moveList) {
        return (moveList.length % 2 === 0) ? 'x' : 'o' ;
    }
    function notMyTurn(ml = moveList) {
        return (ml.length % 2 === 0) ? 'o' : 'x';
    }
    function other(player) {
        if (player !== 'o' && player !== 'x') { console.error(`other(player) called with invalid player: ${player}`)}
        return (player === 'o') ? 'x' : 'o';
    }


    // LOW-LEVEL HELPERS
    // need to be told which player you care about b/c they may be used on EITHER the player whose turn it is or the other player.
    function squaresClaimedByPlayer(player, ml = moveList) {
        // let history = (alteredHistory === undefined) ? history : alteredHistory
        
        if (player === 'x') {
            return ml.filter((squareId, index) => index % 2 === 0);
        }
        else if (player === 'o') {
            return ml.filter((squareId, index) => index % 2 === 1);
        }
        else {
            console.error(`Method squaresClaimedByPlayer() called with invalid player: ${player}`)
            return undefined;
        }
    }

    
    
    
    function lineCountsFor(player, ml = moveList) {
        // Based on the history state, return an array of 8 ints 0-3 indicating the number of X's or O's in each row, col, and diagonal
        // const player = myTurn(moveList); 
        let lines = Array(8).fill(0);

        squaresClaimedByPlayer(player, ml).forEach(square => {
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

    function lineCounts(ml = moveList) {
        // Line Indices 0,1,2 represent the three rows top to bottom.
        // Line Indices 3,4,5 represent the three columns left to right.
        // Line Indices 6,7 represent the upslash and downslash diagonals respectivly.
        // The 3-element array in each represents the number of X's and O's in that line, respectively.
        let lines = Array(8).fill([0, 0, 0]);

        ml.forEach((squareId, turn) => {
            let player = (turn % 2 === 0) ? 'x' : 'o'
            
            let row = Math.floor(squareId / 3)    // number 0, 1, or 2
            let col = (squareId % 3) + 3           // number 0, 1, or 2  +3 to account for the three indexes set aside for rows

            if (player === 'x') {
                lines[row][0]++
                lines[col][0]++
                if (squareId === 2 || squareId === 4 || squareId === 6) {  // upslash
                    lines[6][0]++
                }
                if (squareId === 0 || squareId === 4 || squareId === 8) {  // downslash
                    lines[7][0]++
                }
            } 
            else {
                lines[row][1]++
                lines[col][1]++
                if (squareId === 2 || squareId === 4 || squareId === 6) {  // upslash
                    lines[6][1]++
                }
                if (squareId === 0 || squareId === 4 || squareId === 8) {  // downslash
                    lines[7][1]++
                }
            }
        });
        // console.log(`Status: ${status}`)
        return lines;
    }

    function intersect(listOne, listTwo) {
        let intersection = listOne.filter(number => listTwo.includes(number))
        return intersection;
    }

    function unclaimed(ml = moveList) {
        let unclaimed = [];
        for (let i = 0; i < 9; i++) {
            if (!ml.includes(i)) {
                unclaimed = unclaimed.concat(i)
            }
        }
        return unclaimed;
    }

    function lineData(ml = moveList) {
        let lineData = []
        
        let xSquares = ml.filter((square, turn) => turn % 2 === 0)
        let oSquares = ml.filter((square, turn) => turn % 2 === 1)
        // let unclaimed = unclaimed(ml)

        for (let lineId = 0; lineId < 8; lineId++) {
            let mySquares = squaresInLine(lineId)
            let thisLinesData = {
                'lineId': lineId,
                'xSquares': intersect(mySquares, xSquares),
                'oSquares': intersect(mySquares, oSquares),
                'unclaimed': intersect(mySquares, unclaimed(ml))
            }
            lineData[lineId] = thisLinesData
        }
        console.log(`LINE DATA: ${lineData}`)
        return lineData
    }
    

    function thereIsAForcedWin(ml = moveList) {
        const thereIsAForcedWin = (thereIsAnImmediateWin(ml)
            || thereIsADoubleAttackCreatingMove(ml)
            || thereIsADistantForcedWinCreatingMove(ml))
        // console.log(`immediateWins(moveList).length: ${immediateWins(moveList).length}`)
        // console.log(`thereIsADistantForcedWinCreatingMove(moveList).length: ${distantForcedWinCreatingMoves(moveList)ngth}`)
        console.log(`forcedWinCreatingMoves based on the moveList: ${ml} ==>  ${distantForcedWinCreatingMoves(ml)}`)
        console.log(`thereIsAForcedWin for the current player: ${thereIsAForcedWin}`)
        return thereIsAForcedWin;
    }



    function linesWithThree(player, ml = moveList) {
        let linesList = [];
        // console.log(`lineCountsFor : ${lineCountsFor(player)}`)
        lineCountsFor(player, ml).forEach((count, line) => {
            if (count === 3) {
                linesList.push(line)
            }
        })
        // console.log(`linesWithThree() called for player '${player}'. List: ${linesList}`)
        return linesList;
    }

    function linesWithOnlyTwo(player, ml = moveList) {
        let linesList = [];
        lineCountsFor(player, ml).forEach((count, line) => {
            if (count === 2 && lineCountsFor(other(player), ml)[line] === 0 ) {  
                linesList.push(line)
            }
        })
        // console.log(`List Unblocked Twos for player '${player}': ${list}`)
        return linesList;
    }

    function linesWithOnlyOne(ml = moveList) {
        const player = myTurn(ml);
        let linesList = [];
        lineCountsFor(player, ml).forEach((count, line) => {
            if (count === 1 && lineCountsFor(other(player), ml)[line] === 0) {
                linesList.push(line)
            }
        })
        // console.log(`List Unblocked Ones for player '${player}' based on moveList ${moveList} ==> ${linesList}`)
        return linesList;
    }
    // function emptyLines(ml = moveList) {
    //     let linesList = [];
    //     lineCountsFor('x', ml).forEach((count, line) => {
    //         if (count === 0 && lineCountsFor('o', ml)[line] === 0) {
    //             linesList.push(line)
    //         }
    //     })
    //     console.log(`List Empty Lines: ${linesList}`)
    //     return linesList;
    // }
    function blockedLines(ml = moveList) {
        let linesList = [];
        lineCountsFor('x', ml).forEach((count, line) => {
            if (count > 0 && lineCountsFor('o', ml)[line] > 0) {
                linesList.push(line)
            }
        })
        console.log(`List Blocked Lines: ${linesList}`)
        return linesList;
    }
    function allLines() {
        // Top Row, Middle Row, Bottom Row, 
        // Left Column, Middle Column, Right Column,
        // Upslash Diagonal, Downslash Diagonal
        return [0, 1, 2, 3, 4, 5, 6, 7]
    }
    
    
    

    // list the squareIds that fall in a given lineId
    function squaresInLine(lineId) {
        // console.log(`getSquares() was called with lineId: ${lineId}`)
        let squareIds;
        switch (lineId) {
            case 0:
                squareIds = [0, 1, 2];  // x / 3 < 1
                break;
            case 1:
                squareIds = [3, 4, 5];  // (x / 3).floor() === 1
                break;
            case 2:
                squareIds = [6, 7, 8]; // (x / 3) > 1
                break;
            case 3:
                squareIds = [0, 3, 6];  // congruent to 0 mod 3
                break;
            case 4:
                squareIds = [1, 4, 7];  // congruent to 1 mod 3
                break;
            case 5:
                squareIds = [2, 5, 8];  // congruent to 2 mod 3
                break;
            case 6:
                squareIds = [2, 4, 6];  // diagonal
                break;
            case 7:
                squareIds = [0, 4, 8];  // congruent to 0 mod 4
                break;
            default:
                console.error(`squaresInLine() was called with an invalid lineId.`)
        }
        return squareIds;
        
    }


    
    // BOOLEAN helpers for getStatus() and handleSquareClick()
    function squareIsEmpty(square, ml = moveList) {
        return (!ml.includes(square))
    }
    

    
    // function gameDrawn() {
    //     return (history.length >= 9 && !wins('x') && !wins('o'));  // Board full and neither player has a win
    // }
    // function gameDrawn() {
    //     return (blockedLines().length >= 8 && !wins('x') && !wins('o'));  // Board full and neither player has a win
    // }
    
    
    
    function gameOver(ml = moveList) {
        if (ml.length >= 9) {
            console.log(`gameOver() --> TRUE`)
            return true
        }
        else if (ml.length < 5) {
            console.log(`gameOver() --> FALSE`)
            return false
        }
        else {
            lineData().forEach(line => {
                if (line.xSquares.length === 3 || line.oSquares.length === 3) {
                    console.log(`gameOver() --> TRUE`)
                    return true
                }
            }) 
            console.log(`gameOver() --> FALSE`)
            return false
        }
    }

}
