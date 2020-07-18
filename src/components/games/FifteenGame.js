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
    let [playAgainstBot, setPlayAgainstBot] = useState(false);  
    // let [playAgainstBot, setPlayAgainstBot] = useState(true);

    // BOT MOVES FIRST. Disabled switch unless playAgainstBot mode is set to true. 
    let [botMovesFirst, setBotMovesFirst] = useState(false);
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
                    // data={getPanelData(history)} 
                    status={gameStatus()}
                    commentary={getCommentary()}
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
        if (gameOver()) {
            console.log("return without effects from handleCardClick(). The Game is already over.")
            return;
        }
        if (cardClaimed(cardClicked)) {
            console.log("return without effects from handleCardClick(). That number has already been claimed.")
            return;
        }
        
        let updatedHistory = history.concat(cardClicked);
        setHistory(updatedHistory);
        // This function does not pass along any of its results, it acts thru side-effects. It calls setHistory and use of that hook tells React it needs to re-render all components that depend on the state "history".
    
        console.log(`History updated for player move: ${history.concat(cardClicked)}  Now finding best move for Bot...`)
    
        let botMove = getBotMove(updatedHistory);
        setTimeout(() => {
            setHistory(updatedHistory.concat(botMove));
        }, 500);
    
    }
    function handleUndoButtonClick() {
        const shortenedHistory = history.slice(0, history.length - 2)
        console.log(`handleUndoButtonClick() removes both the most recent player move and bot move ${shortenedHistory}`);
        setHistory(history.slice(0, history.length - 1));
        setTimeout(() => {
            setHistory(shortenedHistory);
        }, 500);
    }
    function handleNewGameButtonClick() {
        const empty = [];
        console.log(`History reset to: ${empty}`);
        setHistory(empty);
    }
    function togglePlayAgainstBot() {
        setPlayAgainstBot(!playAgainstBot)
    }
    function toggleBotMovesFirst() {
        setBotMovesFirst(!botMovesFirst)
    }

    function getCommentary(moveList = history) {
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
                    <Grid item xs={12} container className={classes.record}>
                        <Grid item xs={4}>
                            <Typography variant="subtitle1">
                                <strong>Wins:</strong> {record[0]}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="subtitle1">
                                <strong>Losses:</strong> {record[1]}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="subtitle1">
                                <strong>Draws:</strong> {record[2]}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            return hints;
        }
    }
    function gameStatus(moveList = history) {
        if (wins('playerOne', moveList)) {
            return (`Player one wins!`)
        }
        else if (wins('playerTwo', moveList)) {
            return (`Player two wins!`)
        }
        else if (gameDrawn(moveList)) {
            return (`Draw.`)
        }
        else if (moveList.length % 2 === 0) {
            return (`Player one's turn.`)
        }
        else if (moveList.length % 2 === 1) {
            return (`Player two's turn.`)
        }
        else {
            console.error("A call to gameStatus() did not work!");
            return
        }
    }

    function gameOver(moveList = history) {
        if (moveList.length < 5){
            return false;
        } 
        return (moveList.length === 9 || wins("playerOne") || wins("playerTwo"));
        // I was tempted to rewrite this to useState() because it was calling wins() a lot. Decided in the end that it was enough to add the early return for the turn numbers before which the game can possibly be won.
    }

    function cardClaimed(cardClicked, moveList = history){
        return (moveList.includes(cardClicked));
    }

    // WON GAME defined: the player specified has all three squares in at least one line.
    function wins(player, moveList = history) {
        let myMoves = filterMoves(player, moveList)
        return (sumsOfThree(myMoves).includes(15));
    }

    function gameDrawn(moveList = history) {
        // Thanks to short circuit evaluation this is fairly efficient, not making many superfluous calls to wins().
        return (moveList.length === 9 && !wins("playerOne") && !wins("playerTwo"));
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
        for (let i = 0; i < moveSet.length - 1; i++){
            for (let j = i + 1; j < moveSet.length; j++){
                let sum = moveSet[i] + moveSet[j];
                // console.log(`Sum of i + j: ${sum}`)
                sums.push(sum);
            }
        }
        console.log(`Sums of two-element subsets of ${moveSet} are: ${sums}`)
        return sums;
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


    // A "best move" is any move that does not grant the opponent a forced win 
    function getBotMove(moveList = history) {
        console.log(`getBotMove found these unclaimedNumbers: ${unclaimedNumbers(moveList)}`)
        let randomMove = unclaimedNumbers(moveList)[Math.floor(Math.random() * unclaimedNumbers(moveList).length)]
        console.log(`getBotMove randomly chose this unclaimedNumber: ${randomMove}`)

        return randomMove;
    }




}



    
