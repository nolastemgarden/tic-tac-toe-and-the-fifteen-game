import React, { useState } from 'react';

import './TicTacToe.css';

// My Components
import Board from "../components/boards/TicTacToeBoard";
import Panel from "../components/Panel";


// MUI  components
import Box from '@material-ui/core/Box';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({

    root: {
        // border: 'solid navy 1px',

        width: '100%',
        height: '100%',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#4AC9FD',

        borderRadius: '1vmin',

        
    },
    boardArea: {
        backgroundColor: '#ffffff',
        borderRadius: 'inherit',
        width: 'calc(100% - 4rem)',
        padding: '1rem',
        marginBottom: '1rem',
        

        // height: '55%',
        
        flex: '0 0 55%',
        
        display: 'flex',
        justifyContent: 'center',
    },
    panelArea: {
        backgroundColor: '#ffffff',
        borderRadius: 'inherit',
        width: 'calc(100% - 4rem)',
        padding: '1rem',
        marginBottom: '1rem',
        
        // height: 'calc(45% - 3rem)',

        flex: '1 1 35%',
        
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
        <Box className={classes.root} >
            <Box className={classes.boardArea} >
                <Board 
                    boardSymbols={getBoardSymbols()} 
                    boardColors={getBoardColors()}
                    handleSquareClick={handleSquareClick}
                />
            </Box>
            <Box className={classes.panelArea}>
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
            </Box>
        </Box>
    );

    // The <Game> holds all state and most helper and handler function definitions.
    // It passes what it needs to to the board to render and to the panel.
    
    // The board data to render is a the latest entry in history.  We will have an 'undo' but not a 'redo' button.  May add a Make Computer Move
    function getBoardSymbols(moveList = history) {
        let data = Array(9).fill('');  // Start with an array representing a board of NINE empty squares
        squaresClaimedByPlayer('x').forEach(squareId => {
            data[squareId] = 'x';
        });
        squaresClaimedByPlayer('o').forEach(squareId => {
            data[squareId] = 'o';
        });
        return data;  // this method only deals with current board position, not hypotheticals.  Thus, it wants to use a version of helper squaresClaimedByPlayer() that does not require a moveList be explicitly passed in. 
    }

    function getBoardColors() {
        // If the game is won highlight the winning line(s), whether hints are turned on or off.
        if (wins('x') || wins('o')) {
            return highlightWins();
        }
        // If hints are turned off return colors [] filled with 'noColor' strings.
        if (showMoves === false) {
            return Array(9).fill('noColor');
        }
        // If hints are turned on return colors [] filled by getBoardHints().
        if (showMoves === true) {
            // console.log(`Board Hints: ${getBoardHints()}`)
            return getBoardHints();
        }
    }

    
    // list all squareIds not appearing in the history or an 
    function emptySquares(moveList = history) {
        let emptySquaresList = [];
        for (let i = 0; i < 9; i++) {
            if (!moveList.includes(i)) {
                emptySquaresList.push(i)
            }
        }
        // console.log(`List Empty Squares: ${emptySquaresList}`)
        return emptySquaresList;
    }
    function claimedSquares(moveList = history) {
        let claimedSquaresList = [];
        for (let i = 0; i < 9; i++) {
            if (moveList.includes(i)) {
                claimedSquaresList.push(i)
            }
        }
        return claimedSquaresList;
    }
    function unknownSquares(hintList) {
        let unknownSquares = [];
        hintList.forEach((square, index) => {
            if (square === 'unknown') {
                unknownSquares = unknownSquares.concat(index)
            }
        });
        // console.log(`Squares with unknown value: ${unknownSquares}`);
        return unknownSquares;
    }

    function immediatelyLosingMoves(moveList = history) {
        let immediatelyLosingMoves = [];
        emptySquares(moveList).forEach(testSquare => {
            let hypotheticalHistory = moveList.concat(testSquare);
            if (thereIsAnImmediateWin(hypotheticalHistory)) {  // If there are any wins for Opponent in this hypotheticalHistory then the testSquare is a losing move. 
                immediatelyLosingMoves = immediatelyLosingMoves.concat(testSquare);
            }
        })
        return immediatelyLosingMoves;
    }

    // DEFINITION: a DoubleAttack position is created when the player whose turn it is has no immediateWins() && has 2 distinct urgentDefensiveMoves(). 
    function thisIsADoubleAttack(moveList = history) {
        return (!thereIsAnImmediateWin(moveList) && urgentDefensiveMoves(moveList).length > 1);
    }
    function doubleAttackCreatingMoves(moveList = history) {
        let doubleAttackCreatingMoves = [];
        emptySquares(moveList).forEach(testSquare => {
            let hypotheticalHistory = moveList.concat(testSquare);
            if (thisIsADoubleAttack(hypotheticalHistory)) {
                doubleAttackCreatingMoves = doubleAttackCreatingMoves.concat(testSquare)
            }
        })
        // console.log(`doubleAttackCreatingMoves in position: ${moveList} found these attacks: ${doubleAttackCreatingMoves}`);
        return doubleAttackCreatingMoves;
    }
    function thereIsADoubleAttackCreatingMove(moveList = history) {
        return (doubleAttackCreatingMoves(moveList).length > 0)
    }

    function doubleAttackGrantingMoves(moveList = history) {
        let doubleAttackGrantingMoves = [];
        emptySquares(moveList).forEach(testSquare => {
            let hypotheticalHistory = moveList.concat(testSquare);
            if (thereIsADoubleAttackCreatingMove(hypotheticalHistory) || thereIsAnImmediateWin(hypotheticalHistory)) {  // If there are any wins for Opponent in this hypotheticalHistory then the testSquare is a losing move. 
                doubleAttackGrantingMoves = doubleAttackGrantingMoves.concat(testSquare);
            }
        })
        return doubleAttackGrantingMoves;
    }

    


    // TODO
    function getBoardHints() {
        // PRIORITIES  
        // 0) Start with an array of 9 filled with "unknown". this string cannot be a final value...
        // 1) Mark all filled squares "noColor".
        // 2) If there are any squares that would create an immediateWin 
                // switch them from "unknown" to "win". ?? 
                // ELSE there are no immidiateWins...
        // 3) For each empty square, check if adding it to the history would create a situation where your opponent has an immediateWin(). 
                // In the first version this is called failing to block an "urgentDefensiveMove"
                // each one that does should be switched from "empty" to "lose".  switch all other empty squares to "draw". Return.
        // 4) For each empty square, check if adding it to the history would create a doubleAttack(). 
                // each one that does should be switched from "empty" to "win".  switch all other empty squares to "draw". Return.


        // 
        // ??? 4) Mark any hard to see mistakes that would allow opponent to create a double attack.
        // 5) Mark any forcing moves that keep the opponent busy this turn and allow you to create a double attack next turn.
        
        // (0)
        const player = myTurn(history);
        let hints = Array(9).fill('unknown');  // Start with an array representing a board of NINE squares.
        
        // (1)
        claimedSquares().forEach(squareId => {
            hints[squareId] = 'claimed';
        });

        //  (2) Mark my immediate wins. 
        immediateWins(history).forEach(winningSquare => {
            hints[winningSquare] = 'win';
        });

        // (3) Mark immediate losses.  yet unknown squares that grant opponent an immediate win. yet unknown implies unclaimed and not an immediate win.
        immediatelyLosingMoves(history).forEach(losingSquare => {
            if (hints[losingSquare] === 'unknown') {
                hints[losingSquare] = 'lose';
            }
        });
        
        
        // (4) Mark double attacking wins.  yet unknown squares that create a double attack.
        doubleAttackCreatingMoves(history).forEach(keyAttackingMove => {
            if (hints[keyAttackingMove] === 'unknown'){
                hints[keyAttackingMove] = 'win';
            }
        });
        
        // (5) Mark moves that grant the opponent a double attacking win. Only apply to yet unknown squares.
        doubleAttackGrantingMoves(history).forEach(losingSquare => {
            if (hints[losingSquare] === 'unknown') {
                hints[losingSquare] = 'lose';
            }
        });
        
        // (6) Mark distant win forcing moves.  yet unknown squares that initiate a 3 move win sequence.
        distantForcedWinCreatingMoves(history).forEach(keyAttackingMove => {
            if (hints[keyAttackingMove] === 'unknown') {
                hints[keyAttackingMove] = 'win';
            }
        });

        // // // (7) Mark moves that grant the opponent a distant win forcing moves. Only apply to yet unknown squares.
        // console.log(`Yet UNKNOWN squares in the hints: ${unknownSquares(hints)}`)
        // unknownSquares(hints).forEach(testSquare => {
        //     let hypotheticalHistory = history.concat(testSquare);
        //     if (thereIsADistantForcedWinCreatingMove(hypotheticalHistory)) {  // If there are any distant forced wins for Opponent in this hypotheticalHistory then the testSquare is a losing move. 
        //         hints[testSquare] = 'lose';
        //     }  // else {  The test square does not create an immediate loss, leave it as 'unknown' for now.}
        // });

        // // (8) Mark yet unknown squares as leading to a draw.
        // unknownSquares(hints).forEach(square => {
        //     hints[square] = 'draw';
        // });
        
        // console.log(`getBoardHints() made this list: ${hints}`)
        return hints;
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
        // console.log(`getCommentary() called while showCommentary = ${showCommentary}`)
        if (gameOver()) {
            return `Game Over`
        }
        if (!showCommentary) {
            return `Coach's commentary would appear here if turned on in the settings.`
        }

        // If no moves have been made
        if (history.length === 0) {
            return `It may look like X has  9 different options but 
            when you consider symmetry there are really only 3: Center, Edge, or Corner.
            In starting position, all of X's choices are safe and each leads to different follow up strategies.`
        }

        // If one move has been made
        if (history.length === 1 && history[0] === 4) {
            return `O really only has two options, edge or corner. One is good and lets O
            force a draw. The other is bad and gives X a chance to win.`
        }
        if (history.length === 1 && history[0] !== 4 && history[0] % 2 === 0 ) {
            return `In the Corner opening O has five non-symmetrical options. All except one
            are mistakes that let X force a win.`
        }
        if (history.length === 1 && history[0] !== 4 && history[0] % 2 === 1) {
            return `The Edge opening has the most tricks and traps! 
            O has five non-symmetrical options. Three are good and let O force a draw. 
            The other two are mistakes that let X force a win.`
        }

        // If two moves has been made
        if (history.length === 2) {
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
        if (history.length >= 3 ) {
            let message = '';
            if (thereIsAnImmediateWin()) {
                message = `You have a winning move! Defensive moves are irrelevant.`
            }
            else if (thereIsAnUnstoppableAttack()) {
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
        let highlightedSquares = Array(9).fill('noColor')
        if (!gameOver()) {  // Assert: we only reach this point if either x or o has won.
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
     
    function thereIsAnImmediateWin(moveList = history) {
        return (immediateWins(moveList).length > 0)
    }

    function immediateWins(moveList = history){
        // LinesWithOnlyTwo intersected with emptySquares.
        let winningSquares = [];
        const player = myTurn(moveList);
        linesWithOnlyTwo(player, moveList).forEach((line) => {
            squaresInLine(line).forEach((square) => {
                if (squareIsEmpty(square)) {
                    winningSquares.push(square);
                    // hints[square] = 'win'; This code used to be part of a bloated getBoardHints() method and at that time it had responsibility for actually assigning colors in the hints array to the square it now simply returns in a list.
                }
            })
        })
        // console.log(`immediateWins() used moveList ${moveList} and found the following winningMoves: ${winningSquares}`)
        return winningSquares;
    }

    function thereIsAnUnstoppableAttack(moveList = history) {
        return (urgentDefensiveMoves(moveList).length > 1)
    }
    
    function thereIsAnUrgentDefensiveMove(moveList = history) {
        return (urgentDefensiveMoves(moveList).length > 0)
    }
    
    function urgentDefensiveMoves(moveList = history) {
        const player = myTurn(moveList);
        let urgentDefensiveMovesList = [];
        linesWithOnlyTwo(other(player), moveList).forEach((line) => {
            // console.log(`urgentDefensiveMoves found line ${line} has only two ${other(player)}`)
            squaresInLine(line).forEach((square) => {
                if (squareIsEmpty(square, moveList) && !urgentDefensiveMovesList.includes(square)) {
                    urgentDefensiveMovesList.push(square);
                }
            })
        })
        // console.log(`urgentDefensiveMoves() found the following moves for ${player}: ${urgentDefensiveMovesList}`);
        return urgentDefensiveMovesList;
    }

    function threatCreatingMoves(moveList = history) {
        // This list may contain duplicates. A squareId that appears twice creates two separate two-in-a-line threats.
        const player = myTurn(moveList);
        const threatCreatingMoves = []; 
        linesWithOnlyOne(moveList).forEach((line) => {
            squaresInLine(line).forEach((square) => {
                if (squareIsEmpty(square, moveList)) {                 // Don't add an already claimed square to the list of therat creating moves!
                    threatCreatingMoves.push(square);
                }
            })
        })
        // console.log(`Player '${player}' can create threats on the following squares: ${threatCreatingMoves}`)
        return threatCreatingMoves;
    }

    function singleAttackCreatingMoves(moveList = history) {
        return threatCreatingMoves(moveList).filter((square, index) => threatCreatingMoves(moveList).indexOf(square) === index);
    }

    

    

    function winningDoubleAttackCreatingMoves(moveList = history) {
        // A doubleAttack is winning IFF it can be made without ignoring an urgentDefensiveMove.
        // A doubleAttackCreatingMove is winning IF there were no urgentDefensiveMoves OR IF it is identical to the ONE urgentDefensiveMove.
    }
    
    


    // DEFINITION: theNextMoveIsForced IFF player who moved last has one unblocked threat and player whose turn it is has none.
    function theNextMoveIsForced(moveList = history) {
        let player = myTurn(moveList);
        let myThreatCount = linesWithOnlyTwo(player, moveList).length;
        let opponentThreatCount = linesWithOnlyTwo(other(player), moveList).length;
        let isForced = (myThreatCount === 1 && opponentThreatCount === 0);
        return (isForced);
    }

    function forcingMoves(moveList = history) {
        let forcingMoves = [];
        emptySquares(moveList).forEach(testSquare => {
            let hypotheticalHistory = moveList.concat(testSquare);
            if (theNextMoveIsForced(hypotheticalHistory)) {
                forcingMoves = forcingMoves.concat(testSquare)
            }
        })
        return forcingMoves;
    }
    
    
    // By Definition: There are NO distantForcedWinCreatingMoves IF there is a quicker way to win.
    // DEFINITION: A move that creates a position where you have one threat and your opponent has none &&
    //             once your opponent responds with their one urgentDefensiveMove you are left with the ability to create a double attack. 
    function distantForcedWinCreatingMoves(moveList = history) {
        let distantForcedWinCreatingMovesList = [];
        let player = myTurn(moveList);
        
        console.log(`thereIsAnImmediateWin: ${thereIsAnImmediateWin(moveList)}`)
        console.log(`thereIsADoubleAttackCreatingMove: ${thereIsADoubleAttackCreatingMove(moveList)}`)
        if (thereIsAnImmediateWin(moveList) || thereIsADoubleAttackCreatingMove(moveList)) {
            console.log(`Returning Early (list of length 0) from distantForcedWinCreatingMoves() because there is a quicker way to win.`)
            return distantForcedWinCreatingMovesList;
        }
        
        forcingMoves(moveList).forEach(forcingMove => {
            // confirm there is exactly one urgent defensive move
            if (urgentDefensiveMoves().length > 1){
                console.error(`forcingMoves is examinig a square when a double attack already exists.`)
            }
            // Append the only urgentDefensive move then look for doubleAttack Creating Moves. 
            let hypotheticalHistory = moveList.concat(urgentDefensiveMoves()[0])
            if (thereIsADoubleAttackCreatingMove(hypotheticalHistory)){
                distantForcedWinCreatingMovesList = distantForcedWinCreatingMovesList.concat(forcingMove);
            }
        })
        // console.log(`distantForcedWinCreatingMoves() found the following list: ${distantForcedWinCreatingMovesList}`)
        return distantForcedWinCreatingMovesList;
    }
    function thereIsADistantForcedWinCreatingMove(moveList = history) {
        return (distantForcedWinCreatingMoves(moveList).length > 0)
    }


    
    // Check if each of the squares that is is still empty is a losing Move
    function gameLosingMoves(moveList = history) {  // This function should ONLY be called by getBoardHints when there are no forced Win Creating Moves
        let gameLosingMoves = [];
        emptySquares().forEach(square => {
            let hypotheticalHistory = moveList.concat(square);
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
    function myTurn(moveList = history) {
        return (moveList.length % 2 === 0) ? 'x' : 'o' ;
    }
    function notMyTurn(moveList = history) {
        return (moveList.length % 2 === 0) ? 'o' : 'x';
    }
    function other(player) {
        if (player !== 'o' && player !== 'x') { console.error(`other(player) called with invalid player: ${player}`)}
        return (player === 'o') ? 'x' : 'o';
    }


    // LOW-LEVEL HELPERS
    // need to be told which player you care about b/c they may be used on EITHER the player whose turn it is or the other player.
    function squaresClaimedByPlayer(player, moveList = history) {
        // let history = (alteredHistory === undefined) ? history : alteredHistory
        
        if (player === 'x') {
            return moveList.filter((squareId, index) => index % 2 === 0);
        }
        else if (player === 'o') {
            return moveList.filter((squareId, index) => index % 2 === 1);
        }
        else {
            console.error(`Method squaresClaimedByPlayer() called with invalid player: ${player}`)
            return undefined;
        }
    }

    
    
    
    function lineCountsFor(player, moveList = history) {
        // Based on the history state, return an array of 8 ints 0-3 indicating the number of X's or O's in each row, col, and diagonal
        // const player = myTurn(moveList); 
        let lines = Array(8).fill(0);

        squaresClaimedByPlayer(player, moveList).forEach(square => {
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

    function wins(player, moveList = history) {
        return (lineCountsFor(player, moveList).includes(3));
    }

    function thereIsAForcedWin(moveList = history) {
        const thereIsAForcedWin = (thereIsAnImmediateWin(moveList)
            || thereIsADoubleAttackCreatingMove(moveList)
            || thereIsADistantForcedWinCreatingMove(moveList))
        // console.log(`immediateWins(moveList).length: ${immediateWins(moveList).length}`)
        // console.log(`thereIsADistantForcedWinCreatingMove(moveList).length: ${distantForcedWinCreatingMoves(moveList)ngth}`)
        console.log(`forcedWinCreatingMoves based on the moveList: ${moveList} ==>  ${distantForcedWinCreatingMoves(moveList)}`)
        console.log(`thereIsAForcedWin for the current player: ${thereIsAForcedWin}`)
        return thereIsAForcedWin;
    }



    function linesWithThree(player, moveList = history) {
        let linesList = [];
        // console.log(`lineCountsFor : ${lineCountsFor(player)}`)
        lineCountsFor(player, moveList).forEach((count, line) => {
            if (count === 3) {
                linesList.push(line)
            }
        })
        // console.log(`linesWithThree() called for player '${player}'. List: ${linesList}`)
        return linesList;
    }

    function linesWithOnlyTwo(player, moveList = history) {
        let linesList = [];
        lineCountsFor(player, moveList).forEach((count, line) => {
            if (count === 2 && lineCountsFor(other(player), moveList)[line] === 0 ) {  
                linesList.push(line)
            }
        })
        // console.log(`List Unblocked Twos for player '${player}': ${list}`)
        return linesList;
    }

    function linesWithOnlyOne(moveList = history) {
        const player = myTurn(moveList);
        let linesList = [];
        lineCountsFor(player, moveList).forEach((count, line) => {
            if (count === 1 && lineCountsFor(other(player), moveList)[line] === 0) {
                linesList.push(line)
            }
        })
        // console.log(`List Unblocked Ones for player '${player}' based on moveList ${moveList} ==> ${linesList}`)
        return linesList;
    }
    function emptyLines(moveList = history) {
        let linesList = [];
        lineCountsFor('x', moveList).forEach((count, line) => {
            if (count === 0 && lineCountsFor('o', moveList)[line] === 0) {
                linesList.push(line)
            }
        })
        console.log(`List Empty Lines: ${linesList}`)
        return linesList;
    }
    function blockedLines(moveList = history) {
        let linesList = [];
        lineCountsFor('x', moveList).forEach((count, line) => {
            if (count > 0 && lineCountsFor('o', moveList)[line] > 0) {
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
    function squareIsEmpty(square, moveList = history) {
        return (!moveList.includes(square))
    }
    

    
    // function gameDrawn() {
    //     return (history.length >= 9 && !wins('x') && !wins('o'));  // Board full and neither player has a win
    // }
    function gameDrawn() {
        return (blockedLines().length >= 8 && !wins('x') && !wins('o'));  // Board full and neither player has a win
    }
    
    
    
    function gameOver(moveList = history) {
        return (moveList.length >= 9 
            || wins('x', moveList) 
            || wins('o', moveList));  // Board full or there's a 3-in-a-row
    }

}
