import React, { useState } from 'react';



// My Components
import Board from "../boards/FifteenBoard";
import Panel from "../Panel";


// MUI  components
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

// Custom Styling
// import './TicTacToe.css';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, Typography } from '@material-ui/core';
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


        height: '55%',

        flex: '0 1 55%',

        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
    },
    panelArea: {
        backgroundColor: '#ffffff',
        borderRadius: 'inherit',
        width: 'calc(100% - 4rem)',
        padding: '1rem',
        
        marginBottom: '0rem',
        height: '37%',
        flex: '1 1 37%',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left'

    },
    hintsGridContainer: {
        // border: 'solid navy 1px',
        width: '100%',
        height: '100%',
        textAlign: 'left',
        justifyContent: 'space-around',
    }, 
    sumsOfTwoList: {
        // border: 'solid navy 1px',
        height: '5rem',
        display: 'flex',
        justifyContent: 'center',
        marginX: '1rem',
        // paddingBottom: '3rem'
    },
    record: {
        alignSelf: 'bottom'
    }
}));


export default function FifteenGame() {
    const classes = useStyles();

    // CONVENTION: History refers to actual game state.  A moveList is similar but may be a hypotetical position. 
    // a moveList implies that it is a sequential list of the number cards claimed turn by turn.  
    // A moveSet on the other hand is a subset of a moveList, numbers that have all been claimed by the same player. 
    // 
    // let [gameOver, setGameOver] = useState(false);

    let [gameNumber, setGameNumber] = useState(1);
    let [record, setRecord] = useState([0,0,0]);
    let [history, setHistory] = useState([]);
    
    // HINTS shown on board. May not implement in this game.
    let [showMoves, setShowMoves] = useState(false);
    // let [showMoves, setShowMoves] = useState(true); 
    
    // COACH'S COMMENTARY. May not implement in this game. 
    // let [showCommentary, setShowCommentary] = useState(false);  
    let [showCommentary, setShowCommentary] = useState(true);

    // PLAY AGAINST BOT. Default is two human players. 
    // let [playAgainstBot, setPlayAgainstBot] = useState(false);  
    let [playAgainstBot, setPlayAgainstBot] = useState(true);

    // BOT MOVES FIRST. Disabled switch unless playAgainstBot mode is set to true. This will not be settable. It starts with player and alternates. 
    // let [botMovesFirst, setBotMovesFirst] = useState(false);
    // let [botMovesFirst, setBotMovesFirst] = useState(true);

    // BOT PLAYS PERFECT. Disabled switch unless playAgainstBot mode is set to true. 
    // Easy vs Hard Mode. In easy mode Bot makes 1 game losing mistake per game. in Hard mode the Bot always gets a draw. 
    // let [botPlaysPerfectly, setBotPlaysPerfectly] = useState(false);
    let [botPlaysPerfectly, setBotPlaysPerfectly] = useState(true);


    return (
        <Box className={classes.root} >
            <Box className={classes.boardArea} >
                <Board
                    boardStatus={getBoardStatus()}
                    // boardColors={getBoardColors()}
                    handleCardClick={handleCardClick}
                />
            </Box>
            <Box className={classes.panelArea}>
                <Panel
                    gameType='FifteenGame'
                    gameOver={gameOver()}
                    moveNumber={history.length}
                    commentary={getPanelCommentary()}
                    handleUndoButtonClick={handleUndoButtonClick}
                    handleNewGameButtonClick={handleNewGameButtonClick}

                    // togglePlayAgainstBotSwitch={togglePlayAgainstBot}
                    // toggleBotMovesFirstSwitch={toggleBotMovesFirst}
                />
            </Box>
        </Box>
    );


    function getBoardStatus(moveList = history) {
        let boardStatus = Array(10).fill('unclaimed')
        moveList.forEach((numberClaimed, turnNumber) => {
            boardStatus[numberClaimed] = (turnNumber % 2 === 0) ? 'playerOne' : 'playerTwo';
        })
        return boardStatus;
    }


    // CLICK HANDLERS
    function handleCardClick(cardClicked) {
        if (itIsTheBotsTurn(history)){
            console.log("Be patient. It is currently the Bot's turn. return without effects from handleCardClick(). ")
            return;
        }
        else if (history.includes(cardClicked)) {
            console.log("return without effects from handleCardClick(). That number has already been claimed.")
            return;
        }
        else if (gameOver(history)) {
            console.log("return without effects from handleCardClick(). The Game is already over.")
            return 1;
        }
        else {
            // console.log(`HandleCardClick(${cardClicked}) is NOT returning early for any reason.`)
        }
        
        let updatedHistory = history.concat(cardClicked);
        setHistory(updatedHistory);

        if (gameOver(updatedHistory)) {
            console.log("Don't call handleBotsTurn. Call handleGameOver instead.")
            handleGameOver(updatedHistory);
            return 1;
        }

        console.log(`handleCardClick calling to handleBotsTurn with moveList: ${updatedHistory}.`)
        handleBotsTurn(updatedHistory);
            
        // Now it is the Bot's turn
        // The Bot's Turn handler is responsible for ensuring it does not move if the game is already over. 
        
        return 0;
    }

    function botMovesFirst() {
        return (gameNumber % 2 === 0)
    }

    function handleUndoButtonClick() {
        const shortenedHistory = history.slice(0, history.length - 2)
        console.log(`handleUndoButtonClick() removes both the most recent player move and bot move ${shortenedHistory}`);
        setHistory(history.slice(0, history.length - 1));
        setTimeout(() => {
            setHistory(shortenedHistory);
        }, 500);
        return 0;
    }
    
    // The New Game button is disabled until after handleGameOver has updated the record. 
    function handleNewGameButtonClick() {
        console.log(`New Game Clicked. History reset.`);
        setGameNumber(++gameNumber);
        setHistory([]);

        if (botMovesFirst()){
            
            console.log(`callinghandleBotsTurn() NOW`)
            handleBotsTurn([]);
        }
        
        
    }
  
    function handleGameOver(moveList = history) {
        console.log(`handleGameOver called!!!!!!!!!!!!!!!!!!!!`)
        let result = gameStatus(moveList);
        
        if (result === "Game Over. Draw."){
            setRecord([record[0], record[1], ++record[2]])
        }
        else if (result === "Player Wins!") {
            setRecord([++record[0], record[1], record[2]])
        }
        else if (result === "Bot Wins!") {
            setRecord([record[0], ++record[1], record[2]])
        }
        else {
            console.error(`handleGameOver called with invalid game result: ${result}`)
        }
    }

   


    function getPanelCommentary(moveList = history) {
        // if (moveList.length < 3 && record === [0,0,0]){ 
        //     let explanation =
        //         <Grid container className={classes.explanation}>
        //             <Grid item xs={12}>
        //                 <Typography variant="body2">
        //                     Play the 15-Game against my bot until you have mastered it! You will take turns making the first move. 
        //                 </Typography>
        //             </Grid>
        //             <Grid item xs={12}>
        //                 <Typography variant="body2">
        //                     In hard mode my bot never makes a mistake and the best you can do is get a draw.
        //                 </Typography>
        //             </Grid>
        //             <Grid item xs={12}>
        //                 <Typography variant="body2">
        //                     In easy mode my bot makes exactly one mistake each game and you should be able to win every single time!
        //                 </Typography>
        //             </Grid>
        //         </Grid>
        //     return explanation;
        // }   
        // let playerOneSums = sumsOfTwo(filterMoves("playerOne", moveList))
        // playerOneSums.sort((a, b) => a - b)

        // let playerTwoSums = sumsOfTwo(filterMoves("playerTwo", moveList))
        // playerTwoSums.sort((a, b) => a - b)
        

        let panelCommentary = 
            <Grid container className={classes.hintsGridContainer}>
                <Grid item xs={12} container className={classes.record}>
                    <Typography variant="h4" noWrap >
                        {/* <strong>{gameStatus(moveList)}</strong> */}
                        {gameStatus(moveList)}
                    </Typography>
                </Grid>
                <Grid item xs={12} container className={classes.gameNumber}>
                    <Typography variant="h6" noWrap >
                        <strong>Game Number:</strong> {gameNumber}
                    </Typography>
                </Grid>
                <Grid item xs={12} container className={classes.record}>
                    <Grid item xs={4}>
                        <Typography variant="h6">
                            <strong>Wins:</strong> {record[0]}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6">
                            <strong>Losses:</strong> {record[1]}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6">
                            <strong>Draws:</strong> {record[2]}
                        </Typography>
                    </Grid>
                </Grid>
                {/* <Grid item xs={12}>
                    <Typography variant="h6">
                        Sums of Two-Element Subsets
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1">
                        <strong>Player</strong>
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1">
                        <strong>Bot</strong>
                    </Typography>
                </Grid>
                <Grid item xs={4} className={classes.sumsOfTwoList}>
                    <Typography variant="subtitle1" >
                        {playerOneSums.join(", ")}
                    </Typography>
                </Grid>
                <Grid item xs={4} className={classes.sumsOfTwoList}>
                    <Typography variant="subtitle1" >
                        {playerTwoSums.join(", ")}
                    </Typography>
                </Grid> */}
            </Grid>
        return panelCommentary;
    }
    function gameStatus(moveList = history) {
        if (botMovesFirst()){
            if (moveList.length === 0) {
                return (`Bot moves first`);
            }
            if (gameOver(moveList)) {
                if (wins('playerOne', moveList)) {
                    return (`Bot Wins!`)
                }
                if (wins('playerTwo', moveList)) {
                    return (`Player Wins!`)
                }
                else {
                    return (`Game Over. Draw.`)
                }
            }
            if (moveList.length % 2 === 0) {
                return (`Bot's turn.`)
            }
            if (moveList.length % 2 === 1) {
                return (`Player's turn.`)
            }
        }
        else if (!botMovesFirst()) {
            if (moveList.length === 0) {
                return (`Player moves first`);
            }
            if (gameOver(moveList)) {
                if (wins('playerOne', moveList)) {
                    return (`Player Wins!`)
                }
                if (wins('playerTwo', moveList)) {
                    return (`Bot Wins!`)
                }
                else {
                    return (`Game Over. Draw.`)
                }
            }
            if (moveList.length % 2 === 0) {
                return (`Player's turn.`)
            }
            if (moveList.length % 2 === 1) {
                return (`Bot's turn.`)
            }
        }
        else {
            console.error("A call to gameStatus() did not work!");
            return
        }
    }

    function itIsTheBotsTurn(moveList = history) {
        return ((botMovesFirst() && moveList.length % 2 === 0) || (!botMovesFirst() && moveList.length % 2 === 1))        
    }

    function other(player) {
        if (player !== 'playerOne' && player !== 'playerTwo') { console.error(`other(player) called with invalid player: ${player}`) }
        return (player === 'playerOne') ? 'playerTwo' : 'playerOne';
    }

    
    function gameOver(moveList = history) {
        // This low level helper may be called many times in a given render cycle so it is optomized to return early in as many cases as possible. 
        // Return early if not enough moves have been made OR if the game record has been updated but not the game number. handleGameOver updates the record and handleNewGameClick updates the gameNumber. 
        if (moveList.length < 5){
            // console.log(`GameOver(${moveList}) returning FALSE since moveList.length is only ${moveList.length} `)
            return false;
        } 
        if (sumsOfThree(record) === gameNumber) {
            console.log(`GameOver(${moveList}) returning TRUE since the W-L-D total equals the number of games started.`)
            return true;
        } 
        let player = myTurn(moveList)
        let gameOver = (moveList.length === 9 || wins(other(player), moveList) || wins(player, moveList));
        return gameOver;
    }

    // WON GAME: the player specified has a subset of three numbers that sum to 15.  player = either "playerOne" or "playerTwo"
    function wins(player, moveList = history) {
        let myMoves = filterMoves(player, moveList)
        return (sumsOfThree(myMoves).includes(15)); // sumsOfThree() has a built in early return in case myMoves.length > 3
    }
    
   

    // FILTER MOVES: Reduce a movesList to only the moves by the specified "playerOne" or "playerTwo"
    function filterMoves(player, moveList = history) {
        if (player !== "playerOne" && player !== "playerTwo"){
            console.error(`filterMoves() recieved an invalid player prop.`)
            return 1;
        }
        let num = (player === "playerOne") ? 0 : 1;
        let myMoves = moveList.filter((move, turnNumber) => turnNumber % 2 === num)
        // console.log(`filterMoves() called for ${player} found these moves: ${myMoves}`)
        return (myMoves);
    }

   

    function intersect(listOne, listTwo) {
        let intersection = Array(0).concat(listOne.filter(number => listTwo.includes(number)))
        // console.log(`intersection of listOne: ${listOne}  and listTwo: ${listTwo}  is: ${intersection} `)
        return intersection;
    }

    function myTurn(moveList = history) {
        return (moveList.length % 2 === 0) ? 'playerOne' : 'playerTwo';
    }

    function unclaimedNumbers(moveList = history) {
        let unclaimed = [];
        for (let i = 1; i <= 9; i++){
            if (!moveList.includes(i)){
                unclaimed.push(i)
            }
        }
        return unclaimed;
    }

    
    
    // winning numbers are numbers that would create a subset that sums to 15. They are "winning numbers" regardless of whether they are already claimed or not. 
    function winningNumbers(moveSet) {
        let partialSums = sumsOfTwo(moveSet).filter(sum => sum < 15); // the only thing that matters are two-element sets that sum to less than 15.
        let winningNumbers = partialSums.map(sum => 15 - sum);
        console.log(`winningNumbers called with moveSet: ${moveSet} found the following: ${winningNumbers}`);
        return winningNumbers;
    }
    // An array listing the element-sums of each three-element subset of the moveSet. 
    function sumsOfThree(moveSet) {
        // nested loops don't scale but here they don't need to! moveSet max length = 5 and 5 choose 3 is only 10!
        let sums = [];
        if (moveSet.length < 3) {
            return sums;
        }
        for (let i = 0; i < moveSet.length - 2; i++) {
            for (let j = i + 1; j < moveSet.length - 1; j++) {
                for (let k = j + 1; k < moveSet.length; k++) {
                    let sum = moveSet[i] + moveSet[j] + moveSet[k];
                    // console.log(`Sum of i + j + k: ${sum}`)
                    sums.push(sum);
                }
            }
        }
        // console.log(`Sums of three-element subsets of ${moveSet} are: ${sums}`)
        return sums;
    }

    // An array listing the element-sums of each two-element subset of the moveSet. 
    function sumsOfTwo(moveSet) {
        // nested loops don't scale but here they don't need to! moveSet max length = 5 and 5 choose 2 is only 10!
        let sums = [];
        if (moveSet.length < 2) {
            return sums;
        }
        for (let i = 0; i < moveSet.length - 1; i++) {
            for (let j = i + 1; j < moveSet.length; j++) {
                let sum = moveSet[i] + moveSet[j];
                // console.log(`Sum of i + j: ${sum}`)
                sums.push(sum);
            }
        }
        // console.log(`Sums of two-element subsets of ${moveSet} are: ${sums}`)
        return sums;
    }


    // Find and make a move for the Bot with a 1/2 second delay. Responsibility for obly calling this method when the game is not over yet falls on the caller!
    function handleBotsTurn(moveList) {
        // console.log(`handleBotsTurn called with moveList: ${moveList}`);
        // if (gameOver(moveList)){
        //     console.log(`handleBotsTurn returning early because game is over.`);
        //     return 1;
        // }
        // if (!itIsTheBotsTurn(moveList)) {
        //     console.log(`handleBotsTurn returning early because it is NOT the bots turn.`);
        //     return 1;
        // }
        
        let botMove = getBotMove(moveList);
        let updatedHistory = moveList.concat(botMove);

        setTimeout(() => {
            setHistory(updatedHistory);
            if (gameOver(updatedHistory)) {
                console.log("Don't let player move again. Call handleGameOver instead.")
                handleGameOver(updatedHistory);
                return 1;
            }
        }, 500);
    }

    // this method is only called by handleBotsTurn. Depending on the settings it selects a random move from either the bestMoves list or the losingMoves list.
    // TODO This method is a skeleton that simply passes the call to getBestMoves()
    function getBotMove(moveList) {
        // let losing moves = ...
        // if botPlaysPerfectly = false && turn number == 1 or 2 make a mistaken move.
        let botMove = getRandomMove(bestMovesList(moveList))
        console.log(`Selecting Bot Move from list of "best moves": ${bestMovesList(moveList)}`)
        return botMove;
    }
    // GETTING BEST MOVES WITH GRAPH SEARCH
    // 
    // 
    // 
    // and losing moves
    // if there are no winning moves then generate a list of notImmediatelyLosingMoves and a list of the threatCreating moves  and take the intersection of these. 
    //   because the best move never 
    // Create a QUEUE of hypotheticalPositions where each position is the current movelist with a different notImmediatelyLosingMove concatenated onto it. 
    // the queue is not full of positions where we 
    // while Queue is not empty pop off the     
    // 
    //     
    // HOW TO GET A BEST MOVE:  
    // IN GENERAL start with a list of movesToConsider. in a given position make a list of winning moves and losing moves. 
    //            if there are any winning moves return that list, if not remove all losing moves from the list of movesToConsider.
    //            if there are no movesToConsider left return a random move
    //            if there are movesToConsider make a list of hypotheticalPositions by adding each moveToConsider to the originalMoveList...
    //            at this point we are guaranteed that none of the hypotheticalPositions contain an immediate win so we only need to list moves that are notImmediatelyLosing
    //              For Each notImmediatelyLosingMove in each hypotheticalPosition create a new  hypotheticalPosition that concats the notImmediatelyLosingMove onto the hypotheticalPosition where it is the opponents move. 
    // 
    //              as we cycle thru the hypotheticalPositions we chech each to see if in it is myTurn or opponentsTurn by comparing it length % 2 with originalMoveList.length % 2 
    //              if we are currently considering a position where it is the opponentsTurn we are guaranteed they can't win so we list moves they can make that are notImmediatelyLosing
    //              For Each notImmediatelyLosingMove in each hypotheticalPosition create a new  hypotheticalPosition that concats the notImmediatelyLosingMove onto the hypotheticalPosition currently being considered. 
    //              if we are currently considering a position where it is myTurn we make a list of winning moves and losing moves. 
    //              
    //  
    // 1) Start with the current position and look for winning moves. if there are none...
    //    This list is the intersection of unclaimedNumbers and winningNumbers. 
    // 2) 
    // 3) For Each unclaimedNumber, test if adding it to myMoves creates a Set where there are   Make a list of all unclaimedNumbers that are also winningNumbers.
    // A "best move" is any move that does not grant the opponent a forced win. Start with a list of legal moves. if any win return only those. if any lose return all but those.
    // WHEREAS Tic-Tac-Toe has a "complete" solution, this Bot only does the best it can and will attempt an urgentDefensiveMove even if there are too many to block them all. 
    function bestMovesList(moveList) {
        let player = myTurn(moveList)
        let myMoves = filterMoves(player, moveList);

        let movesToConsider = unclaimedNumbers(moveList);


        let hypotheticalMoveCount = 0;
        let drawingMoves = unclaimedNumbers(moveList);
        
        if (immediateWins(moveList).length > 0){  // if there are immediately winning moves return the list of them. 
            return immediateWins(moveList)
        }
        else {                                    // else remove any immediately losing moves from the list of possiblyWinningMoves

        }
        
        
        // I really want a way to define this process reecursively rather than step by step as I did in the Tic - Tac - Toe code.
        // We will create a QUEUE of the positions that need to be checked.We will use this structure to facilitate a breadth - first - search for an immediatelyWinningMove()  
        //  it progressively filters a list of "possibleWinningMoves()" that starts as all unclaimedNumbers().
        // If there are no winning moves in the current position then look for losing moves and filter the possibleWinningMoves() to not include any definite losing move.  
    

        // if (bestMoves.length === 0){ 
        //     hypotheticalMoveCount = 1   // If hypotheticalMoveCount is even try to win, if it is odd try not to let opponent win. 


        //     unclaimedNumbers(moveList).forEach(testMove => {
        //         let hypotheticalMoveList = moveList.concat(testMove)
        //         if (winningMoves(hypotheticalMoveList).length > 0) {    // if there are immediately winning moves return the list of them. 
        //             return winningMoves(hypotheticalMoveList)           // 
        //         };
        //     }) 


            
        //     for(let i = 0; i < hypotheticalMoveCount; i++){
        //         unclaimedNumbers()

        //         let hypotheticalMoveList = 
        //     }
        // }
        
        
        // while (
            
        //     bestMoves.length === 0) {
            
        // }

        // do {
        //     add


            

        // } while (bestMoves.length === 0);



        if (immediateWins(moveList).length > 0) {
            console.log(`Bot will choose a move from a list of Immediate Wins!`)
            return immediateWins(moveList);
        }
        else if (urgentDefensiveMoves(moveList).length > 0) {
            console.log(`Bot will choose a move from a list of Urgent Defensive Moves!`)
            return urgentDefensiveMoves(moveList);
        }
        // else if (doubleAttackingMoves(moveList).length > 0) {
        //     console.log(`Bot will choose a move from a list of Urgent Defensive Moves!`)
        //     return urgentDefensiveMoves(moveList);
        // }

        else {
            return unclaimedNumbers(moveList)
        }

    }


    


    // The intersection of unclaimedNumbers and MY winningNumbers.
    function immediateWins(moveList) {
        let player = myTurn(moveList)
        let myMoves = filterMoves(player, moveList);
        // console.log(`IMMEDIATE WINS (${moveList}) found myMoves: ${myMoves}, winningNumbers: ${winningNumbers(myMoves)}, unclaimedNumbers: ${unclaimedNumbers(moveList)}`)
        let immediateWins = intersect(winningNumbers(myMoves), unclaimedNumbers(moveList));  // let immediateWins = unclaimedNumbers(moveList).filter(unclaimedNumber => winningNumbers.includes(unclaimedNumber))  // Unclaimed numbers that result in a win. 
        console.log(`IMMEDIATE WINS (${moveList}) found: ${immediateWins}`)
        return immediateWins;
    }

    function urgentDefensiveMoves(moveList = history) {
        let player = myTurn(moveList)
        let opponentsMoves = filterMoves(other(player), moveList);
        // console.log(`URGENT DEFENSIVE MOVES (${moveList}) found opponentsMoves: ${opponentsMoves}, winningNumbers: ${winningNumbers(opponentsMoves)}, unclaimedNumbers: ${unclaimedNumbers(moveList)}`)
        let urgentDefensiveMoves = intersect(winningNumbers(opponentsMoves), unclaimedNumbers(moveList)); 
        console.log(`URGENT DEFENSIVE MOVES (${moveList}) found: ${urgentDefensiveMoves}`)  
        return urgentDefensiveMoves;
    }

    // This method should not be called if there is an immediate win or an urgentDefensiveMove. 
    function doubleAttackingMoves(moveList) {
        let player = myTurn(moveList)
        let myMoves = filterMoves(player, moveList);
        // console.log(`IMMEDIATE WINS (${moveList}) found myMoves: ${myMoves}, winningNumbers: ${winningNumbers(myMoves)}, unclaimedNumbers: ${unclaimedNumbers(moveList)}`)
        
        // unclaimedNumbers(moveList).forEach(unclaimedNumber => {
        //     let hypotheticalMoveSet = myMoves.concat(unclaimedNumber);
        //     if ((hypotheticalMoveSet)) {
        //         doubleAttackCreatingMoves = doubleAttackCreatingMoves.concat(testSquare)
        //     }
        // })
        
        
        // unclaimedNumbers(moveList).forEach(unclaimedNumber => {
        //     let hypotheticalHistory = moveList.concat(unclaimedNumber);
        //     if (thisIsADoubleAttack(hypotheticalHistory)) {
        //         doubleAttackCreatingMoves = doubleAttackCreatingMoves.concat(testSquare)
        //     }
        // })
        
        // let doubleAttackingMoves = intersect(winningNumbers(myMoves), unclaimedNumbers(moveList));  // let immediateWins = unclaimedNumbers(moveList).filter(unclaimedNumber => winningNumbers.includes(unclaimedNumber))  // Unclaimed numbers that result in a win. 
        console.log(`Double Attacking Moves (${moveList}) isn't really built yet...`)
        return doubleAttackingMoves = [];
    }



    

    



    // Randomly selects a move from a list of possible next moves.  Depending on calling context this method can get a totally random unclaimed number or a random number from the listo of bestMoves or the list of mistakes. I considered giving this unclaimedNumbers() as default prop but decided that would lead to more potential debugging confusion than simply requiring a moveSet to be passed
    function getRandomMove(moveSet) {
        // console.log(`getRandomMove found these unclaimedNumbers: ${unclaimedNumbers(moveList)}`)
        let randomMove = moveSet[Math.floor(Math.random() * moveSet.length)]
        // console.log(`getRandomMove chose ${randomMove} from the given moveSet: ${moveSet}`)
        return randomMove;
    }


    // function togglePlayAgainstBot() {
    //     setPlayAgainstBot(!playAgainstBot)
    // }
    // function toggleBotMovesFirst() {
    //     setBotMovesFirst(!botMovesFirst)
    // }


}



    
