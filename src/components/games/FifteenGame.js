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
        justifyContent: 'center'

    },
    hintsGridContainer: {
        // border: 'solid navy 1px',
        width: '100%',
        height: '100%',
        textAlign: 'center',
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

    let [record, setRecord] = useState([1,0,0]);
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

    // BOT MOVES FIRST. Disabled switch unless playAgainstBot mode is set to true. 
    let [botMovesFirst, setBotMovesFirst] = useState(false);
    // let [botMovesFirst, setBotMovesFirst] = useState(true);

    // BOT PLAYS PERFECT. Disabled switch unless playAgainstBot mode is set to true. 
    // Easy vs Hard Mode. In easy mode Bot makes 1 game losing mistake per game. in Hard mode the Bot always gets a draw. 
    let [botPlaysPerfectly, setBotPlaysPerfectly] = useState(false);
    // let [botPlaysPerfectly, setBotPlaysPerfectly] = useState(true);


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
                    // data={getPanelData(history)} 
                    status={gameStatus()}
                    commentary={getPanelCommentary()}
                    // showMoves={showMoves}
                    // showCommentary={showCommentary}
                    handleUndoButtonClick={handleUndoButtonClick}
                    handleNewGameButtonClick={handleNewGameButtonClick}


                    togglePlayAgainstBotSwitch={togglePlayAgainstBot}
                    toggleBotMovesFirstSwitch={toggleBotMovesFirst}
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
        if (itIsTheBotsTurn()){
            console.log("return without effects from handleCardClick(). It is currently the Bot's turn. Be patient.")
            return;
        }
        if (cardClaimed(cardClicked)) {
            console.log("return without effects from handleCardClick(). That number has already been claimed.")
            return;
        }
        if (gameOver()) {
            console.log("return without effects from handleCardClick(). The Game is already over.")
            return;
        }
        
        
        let updatedHistory = history.concat(cardClicked);
        setHistory(updatedHistory);

        
        // Now it is the Bot's turn
        // The Bot's Turn handler is responsible for ensuring it does not move if the game is already over. 
        handleBotsTurn(updatedHistory);
    }

    function handleUndoButtonClick() {
        // if (gameOver()){
        //     console.log("return early from handleUndoButtonClick() as you can't undo when the game is over. Hit New Game instead")
        //     return;
        // }  // This code wasn't what actually disabled the button: it was teh disabled={true} prop in the Panel
        const shortenedHistory = history.slice(0, history.length - 2)
        console.log(`handleUndoButtonClick() removes both the most recent player move and bot move ${shortenedHistory}`);
        setHistory(history.slice(0, history.length - 1));
        setTimeout(() => {
            setHistory(shortenedHistory);
        }, 500);
    }
    function handleNewGameButtonClick() {
        const empty = [];
        console.log(`History reset to: ${empty} and botMovesFirst toggles to ${!botMovesFirst}`);
        setBotMovesFirst(!botMovesFirst);
        setHistory(empty);


    }
    function togglePlayAgainstBot() {
        setPlayAgainstBot(!playAgainstBot)
    }
    function toggleBotMovesFirst() {
        setBotMovesFirst(!botMovesFirst)
    }
    function handleGameOver(result) {
        
    }


    function getPanelCommentary(moveList = history) {
        if (moveList.length < 3 && record === [0,0,0]){ 
            let explanation =
                <Grid container className={classes.explanation}>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            Play the 15-Game against my bot until you have mastered it! You will take turns making the first move. 
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            In hard mode my bot never makes a mistake and the best you can do is get a draw.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            In easy mode my bot makes exactly one mistake each game and you should be able to win every single time!
                        </Typography>
                    </Grid>
                </Grid>
            return explanation;
        }
        else {
            
            let playerOneSums = sumsOfTwo(filterMoves("playerOne", moveList))
            playerOneSums.sort((a, b) => a - b)

            let playerTwoSums = sumsOfTwo(filterMoves("playerTwo", moveList))
            playerTwoSums.sort((a, b) => a - b)
            

            let hints = 
                <Grid container className={classes.hintsGridContainer}>
                    <Grid item xs={12} container className={classes.record}>
                        <Typography variant="h4" noWrap >
                            {/* <strong>{gameStatus(moveList)}</strong> */}
                            {gameStatus(moveList)}
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
                    <Grid item xs={12}>
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
                    </Grid>
                </Grid>
            return hints;
        }
    }
    function gameStatus(moveList = history) {
        if (botMovesFirst){
            if (moveList.length === 0) {
                return (`Bot moves first`);
            }
            if (gameOver()) {
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
        else if (!botMovesFirst) {
            if (moveList.length === 0) {
                return (`Player moves first`);
            }
            if (gameOver()) {
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
        return ((botMovesFirst && moveList.length % 2 === 0) || (!botMovesFirst && moveList.length % 2 === 1))        
    }
    function other(player) {
        if (player !== 'playerOne' && player !== 'playerTwo') { console.error(`other(player) called with invalid player: ${player}`) }
        return (player === 'playerOne') ? 'playerTwo' : 'playerOne';
    }

    
    function gameOver(moveList = history) {
        if (moveList.length < 5){
            return false;
        } 
        let player = myTurn(moveList)
        return (moveList.length === 9 || wins(other(player)) || wins(player));  // the final || wins(player) should never come back true because the history should not accept new moves once the other(player) has won.
        // I was tempted to rewrite this to useState() because it was calling wins() a lot. Decided in the end that it was enough to add the early return for the turn numbers before which the game can possibly be won.
    }

    function cardClaimed(cardClicked, moveList = history){
        return (moveList.includes(cardClicked));
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

    // An array listing the element-sums of each three-element subset of the moveSet. 
    function sumsOfThree(moveSet) {  
        // nested loops don't scale but here they don't need to! moveSet max length = 5 and 5 choose 3 is only 10!
        let sums = [];
        if (moveSet.length < 3){
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
        console.log(`Sums of three-element subsets of ${moveSet} are: ${sums}`)
        return sums;
    }
    
    // An array listing the element-sums of each two-element subset of the moveSet. 
    function sumsOfTwo(moveSet) {
        // nested loops don't scale but here they don't need to! moveSet max length = 5 and 5 choose 2 is only 10!
        let sums = [];
        if (moveSet.length < 2) {
            return sums;
        }
        for (let i = 0; i < moveSet.length - 1; i++){
            for (let j = i + 1; j < moveSet.length; j++){
                let sum = moveSet[i] + moveSet[j];
                // console.log(`Sum of i + j: ${sum}`)
                sums.push(sum);
            }
        }
        // console.log(`Sums of two-element subsets of ${moveSet} are: ${sums}`)
        return sums;
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
        let winningNumbers = sumsOfTwo(moveSet).map(sum => 15 - sum);
        console.log(`winningNumbers called with moveSet: ${moveSet} found the following: ${winningNumbers}`);
        return winningNumbers;
    }


    // Unless the game is over already, find and make a move for the Bot with a 1/2 second delay.
    function handleBotsTurn(moveList = history) {
        if (gameOver(moveList)){
            console.log(`handleBotsTurn returning early because game is over.`);
            return 1;
        }
        let botMove = getBotMove(moveList);
        setTimeout(() => {
            setHistory(moveList.concat(botMove));
        }, 500);
    }

    // this method is only called by handleBotsTurn. Depending on the settings iit selects a random move from either the bestMoves list or the losingMoves list.
    function getBotMove(moveList = history) {
        if (!itIsTheBotsTurn(moveList)){
            console.log(`getBotMove was called with ${moveList} but it is not the Bot's turn!`)
        }
        // console.log(`getBotMove found these unclaimedNumbers: ${unclaimedNumbers(moveList)}`)
        // let randomMove = getRandomMove(unclaimedNumbers(moveList))
        console.log(`bestMovesList length: ${bestMovesList(moveList).length}`)
        console.log(`getBotMove randomly chose this unclaimedNumber from the bestMovesList: ${bestMovesList(moveList)}`)
        
        let bestMove = getRandomMove(bestMovesList(moveList))
        
        // return randomMove
        return bestMove;
    }

    // A "best move" is any move that does not grant the opponent a forced win. Start with a list of legal moves. if any win return only those. if any lose return all but those
    function bestMovesList(moveList = history) {
        let player = myTurn(moveList)
        let myMoves = filterMoves(player, moveList)
        console.log(`getBotMove found these unclaimedNumbers: ${unclaimedNumbers(moveList)}`)
        console.log(`getBotMove found these winningNumbers(myMoves): ${winningNumbers(myMoves)}`)
        
        
        let immediateWins = unclaimedNumbers(moveList).filter(number => winningNumbers(myMoves).includes(number))  // Unclaimed numbers that result in a win. 
        if (immediateWins.length > 0){
            return immediateWins;
        }
        


        let bestMoves = getRandomMove(unclaimedNumbers(moveList))
        return bestMoves
        
    }

    function immediateWins(moveList) {
        let player = myTurn(moveList)
        let myMoves = filterMoves(player, moveList);
        let winningNumbers = winningNumbers(myMoves);
        let immediateWins = unclaimedNumbers(moveList).filter(unclaimedNumber => winningNumbers.includes(unclaimedNumber))  // Unclaimed numbers that result in a win. 
        return immediateWins;
    }



    // Randomly selects a move from a list of possible next moves.  Depending on calling context this method can get a totally random unclaimed number or a random number from the listo of bestMoves or the list of mistakes. I considered giving this unclaimedNumbers() as default prop but decided that would lead to more potential debugging confusion than simply requiring a moveSet to be passed
    function getRandomMove(moveSet) {
        // console.log(`getRandomMove found these unclaimedNumbers: ${unclaimedNumbers(moveList)}`)
        let randomMove = moveSet[Math.floor(Math.random() * moveSet.length)]
        console.log(`getRandomMove chose ${randomMove} from the given moveSet: ${moveSet}`)
        return randomMove;
    }



}



    
