import React, { useState } from 'react';



// My Components
// import Board from "./FifteenBoard";
import Board from "./Board";
import Panel from "./Panel";


// MUI  components
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({

    root: {
        // border: 'solid orange 1px',
        width: '100%',
        height: 'calc(100% - 4rem)',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'space-between',
        backgroundColor: theme.palette.common.black,

    },
    boardContainer: {
        // border: 'solid red 1px',
        width: '100%',
        paddingTop: 'min(100%, 45vh)',
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


    panelContainer: {
        border: 'solid yellow 1px',
        width: '100%',
        flex: '2 0 40%',
        color: theme.palette.common.white,
        
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
    
    let [record, setRecord] = useState([0, 0, 0]);     // 3 element counter for humanWins, botWins, and tieGames.
    let [moveList, setMoveList] = useState([]);  // Array of the numbers claimed so far in order claimed.
    
    // Add up the games in a Win Loss Draw record to get current game number.
    function getGameNumber(r = record) {
        let gameNumber = 1
        r.forEach((count) => { gameNumber = gameNumber + count })
        return gameNumber
    }

    // The bot moves first in the first game, alternating after that.
    function botGoesFirst(r = record) { return (getGameNumber(r) % 2 === 0)  }

    // Add up the moves in the current moveList to determin turn number. 1-indexed.
    function moveNumber(ml = moveList) { return ( 1 + ml.length) }
    
    // The bot moves first in the first game, alternating after that.
    function botGoesNext(r = record, ml = moveList) { 
        if (gameOver(ml)) {
            return false;
        }
        
        let firstAndOdd = (botGoesFirst(r) && moveNumber(ml) % 2 === 1);
        let secondAndEven = (!botGoesFirst(r) && moveNumber(ml) % 2 === 0)
        return (firstAndOdd || secondAndEven);
    }


    // Convert a moveList into a representation using the number cards.
    function getBoardStatus(ml = moveList) {
        let boardStatus = Array(10).fill('unclaimed')
        ml.forEach((numberClaimed, turnNumber) => {
            boardStatus[numberClaimed] = (turnNumber % 2 === 0) ? 'playerOne' : 'playerTwo';
        })
        return boardStatus;
    }

    
    return (
        <Container className={classes.root} maxWidth='md' disableGutters>
            <Box className={classes.boardContainer}>
                <Box className={classes.boardArea} >
                    <Board 
                        handleCardClick={handleCardClick} 
                        boardStatus={getBoardStatus(moveList)}        // TODO !!!!!!!!!! DEFINE THIS FUNC TO CONVERT HISTORY TO THE ARRAY THE BOARD EXPECTS
                    />
                </Box>
            </Box>
            <Box className={classes.panelContainer}  >
                <Panel 
                    record={record}
                    gameNumber={getGameNumber()}
                    gameStatus={getGameStatus()}
                    moveNumber={moveNumber()}
                    handleUndoClick={handleUndoClick}
                    handleNewGameClick={handleNewGameClick}
                />
            </Box>
        </Container>
    );
    


    // CLICK HANDLERS
    function handleCardClick(cardClicked) {
        console.log(`handleCardClick called with cardId: ${cardClicked} `)
        if (botGoesNext()){
            console.log("NO EFFECT. Be patient, the bot takes half a second to move. ")
            return 1;
        }
        else if (moveList.includes(cardClicked)) {
            console.log("NO EFFECT. That number has already been claimed.")
            return 1;
        }
        else if (gameOver(moveList)) {
            console.log("NO EFFECT. The Game is already over.")
            return 1;
        }
        else {
            let updatedMoveList = moveList.concat(cardClicked)
            console.log(`setMoveList called with updated list: ${updatedMoveList} `)
            setMoveList(updatedMoveList);
            if (gameOver(updatedMoveList)) {
                handleGameOver(updatedMoveList);
            } else {
                handleBotsTurn(updatedMoveList);
            }
            return 0;
        }
    }
    function handleUndoClick(ml = moveList) {
        const shortenedMoveList = ml.slice(0, ml.length - 2)
        console.log(`handleUndoButtonClick() removed ${ml[ml.length - 1]} and ${ml[ml.length - 2]} . New Shortened history: ${shortenedMoveList}`);
        setMoveList(shortenedMoveList);
    }
    function handleNewGameClick() {
        const empty = [];
        console.log(`MoveList reset to: ${empty}`);
        setMoveList(empty);
    }

    
    
    
    function handleGameOver(ml = moveList) {
        if (gameOver(ml)) {
            console.error(`NO EFFECT. handleGameOver called but the game isn't actually over!!!!!!!!!!!!!!`)
            return;
        }
        console.log(`handleGameOver called and confirmed the game is over!`)

        
        let result = getGameStatus(ml);
        
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

   
    // TODO  TODO   TODO
    function getPanelCommentary(ml = moveList) {
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
                        {getGameStatus(moveList)}
                    </Typography>
                </Grid>
                <Grid item xs={12} container className={classes.gameNumber}>
                    <Typography variant="h6" noWrap >
                        <strong>Game Number:</strong> {getGameNumber()}
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
                
            </Grid>
        return panelCommentary;
    }


    function getGameStatus(ml = moveList) {
        if (gameOver(ml)) {
            if (thereIsAWinIn(firstPlayersMoves(ml))) {
                return (botGoesFirst()) ? `Bot Wins!` : `Player Wins!` 
            }
            if (thereIsAWinIn(secondPlayersMoves(ml))) {
                return (botGoesFirst()) ? `Player Wins!` : `Bot Wins!`
            }
            else {
                return (`Game Over. Draw.`)
            } 
        } else {
            if (botGoesFirst() && ml.length % 2 === 0) {
                return (`Bot's turn.`)
            }
            if (!botGoesFirst() && ml.length % 2 === 1) {
                return (`Bot's turn.`)
            }
            else {
                return (`Player's turn.`)
            }
        }
    }

    

    function other(player) {
        if (player !== 'playerOne' && player !== 'playerTwo') { console.error(`other(player) called with invalid player: ${player}`) }
        return (player === 'playerOne') ? 'playerTwo' : 'playerOne';
    }

    
    
    // Optomized to return early in as many cases as possible. 
    function gameOver(ml = moveList) {
        // Return early if not enough moves have been made OR if the game record has been updated but not the game number. handleGameOver updates the record and handleNewGameClick updates the gameNumber. 
        if (ml.length < 5) {
            return false;
        } 
        if (thereIsAWinIn(firstPlayersMoves(ml))) {
            return true;
        }
        if (thereIsAWinIn(secondPlayersMoves(ml))) {
            return true;
        } 
        if (ml.length === 9) {
            return true;
        } 
    }
    function handleNewGameClick() {
        // TODO
    }

    // There is a subset of three numbers that sum to 15.  
    // A "moveList" is an alternating sequence of both players' moves.  
    // "moveSet" distinguishes that this is pre-filtered to contain only moves of one player or the other. 
    function thereIsAWinIn( moveSet ) {
        return (sumsOfThree(moveSet).includes(15)); // sumsOfThree() has a built in early return in case myMoves.length > 3
    }
    // MOVELIST FILTERS  
    function firstPlayersMoves(ml = moveList) {
        return ml.filter((move, turnNumber) => turnNumber % 2 === 1)
    }
    function secondPlayersMoves(ml = moveList) {
        return ml.filter((move, turnNumber) => turnNumber % 2 === 0)
    }
    function filterMoves(player, ml = moveList) {
        if (player !== "playerOne" && player !== "playerTwo") {
            console.error(`filterMoves() recieved an invalid player parameter.`)
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

    function myTurn(ml = moveList) {
        return (moveList.length % 2 === 0) ? 'playerOne' : 'playerTwo';
    }

    function unclaimedNumbers(ml = moveList) {
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
        let winningNumbers = partialSums.map(sum => 15 - sum);  // Get the complement to each set.  
        // Add removeDuplicates() helper? 
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
                    sums = sums.concat(sum);
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


    // Find and make a move for the Bot with a 1/2 second delay. 
    function handleBotsTurn(ml = moveList) {
        if (gameOver(ml)){
            console.error(`handleBotsTurn() called even though game is over. handleBotsTurn called with moveList: ${moveList}`);
            return 1;
        }
        
        
        let botMove = getBotMove(moveList);
        let updatedMoveList = moveList.concat(botMove);

        setTimeout(() => {
            setMoveList(updatedMoveList);
            if (gameOver(updatedMoveList)) {
                console.log("Don't let player move again. Call handleGameOver instead.")
                handleGameOver(updatedMoveList);
                return 1;
            }
        }, 500);
    }

    // this method is only called by handleBotsTurn. Depending on the settings it selects a random move from either the bestMoves list or the losingMoves list.
    // TODO This method is a skeleton that simply passes the call to getBestMoves()
    function getBotMove(moveList) {
        // let losing moves = ...
        // if botPlaysPerfectly = false && turn number == 1 or 2 make a mistaken move.
        let botMove = getRandomMove(soundMoves(moveList))
        console.log(`Selecting Bot Move at random from "sound moves": ${soundMoves(moveList)}`)
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

    // There will be a methd for getting immediate wins and one for filtering the unclaimed squares and removing immediatelyLosing movesToConsider
    // movesToConsider need not be state, it can 
    //              
    //  
    // 1) Start with the current position and look for winning moves. if there are none...
    //    This list is the intersection of unclaimedNumbers and winningNumbers. 
    // 2) 
    // 3) For Each unclaimedNumber, test if adding it to myMoves creates a Set where there are   Make a list of all unclaimedNumbers that are also winningNumbers.
    // A "best move" is any move that does not grant the opponent a forced win. Start with a list of legal moves. if any win return only those. if any lose return all but those.
    // WHEREAS Tic-Tac-Toe has a "complete" solution, this Bot only does the best it can and will attempt an urgentDefensiveMove even if there are too many to block them all. 
    
    // For this function to opperate recursively there must be two parameters, the position in which to look for winning moves, and the losing moves that have already been ruled out on previous calls. 
    
    // When it becomes the bot's turn it will first look for winning moves by making recursive calls : 
    //   Both parameters are integer arrays. on the first recursive call losingMoves[] and winningMoves[] are empty.
    // if creates a Queue as in breadth first graph search. 
    
    // 
    // A move is winning IFF it leaves your opponent with no sound replies. 
    //    because after they make a reply i WILL make a winning move.  Winning in the most
    //    expedient way is the only "sound" practice.  Making this model less thorough than what I implemented for tic-tac-toe
    // A move is sound if no matter how your opponent replies you will have a sound reply.
    

    // From a moveList it determines the posible moves then removes those that lead to a lose or grant a forcing move that ... leads to a loss.
    // Starting from an empty board... what are the sound moves? 
    // turn 0 sound moves = [0,1,2,3,4,5,6,7,8]
    // turn 1 sound moves = [0,1,2,3,4,5,6,7,8]  


    // Any moveList either contains a win or is sound
    // sound moveLists are movelists that reach all the way to turn 9 with no wins occuring despite both players best effort.  

    

    // The game is "as good as over" if 8 moves have been made b/c the 9th is a forced. 
    function gameOverDraw(moveList) {
        if (moveList.length < 8) {
            return false;
        }
        if (moveList.length === 8) {
            let lastMove = unclaimedNumbers(moveList);
        }
    }
    
    // A move is sound if it completes a drawn game or if forEach legal reply there is a sound response
    function moveIsSound(moveList, square) {
        

    }
    
    // Returns a list of legal moves.  TODO make it only return 
    // Assumes player whose turn it is has not already made an unsound move
    function soundMoves(moveList, undeterminedMoves = [], winningMoves = [], losingMoves = [] ) {
        
        // let undeterminedMoves = unclaimedNumbers(moveList).filter(num => !losingMoves.includes(num)).filter(num => !winningMoves.includes(num));
        console.log(`soundMoves called with moveList: ${moveList}} `);
        console.log(`soundMoves found these yet unclaimedNumbers: ${unclaimedNumbers(moveList)}} `);
        console.log(`soundMoves will filter these undeterminedMoves: ${undeterminedMoves}} `);
        console.log(`   these numbers were previously found to lose: ${losingMoves} `)
        console.log(`   these numbers were previously found to win:  ${winningMoves} \n\n`)

        // If you can win immediately that is the sound thing to do... but it shouldn't happen.
        if (winningMoves(moveList).length > 0) {
            console.error(`soundMoves found a winning move!`)
            return winningMoves(moveList);
        }

        // otherwise do not return while there are still undeterminedMoves  
        // Ensure you don't let your opponent win

        // But if you and your opponent both play soundly such an opportunity will never arise.
        // If you can lose immediately that is an unsound thing to do.
        // filter them out of the 
        if (losingMoves(moveList).length > 0) {
            
            
        }
        
        
        
        
        // Filter the moves that we are 
        
        
        
        
        console.log(`for now we are operating as if all undeterined moves were safe... returning ${undeterminedMoves} \n`)

        return undeterminedMoves;
    }
    
    
    
    // function winningMovesList(moveList, losingMoves, winningMoves) {
    //     // This routine will recursively call itself, building up its lists of  winningMoves and losingMoves
    //     // It will stop when either the board fills up or all empty squares have been identified
    //     // on either the winning or losing moves list. 
    //     // V 1.0 it will use the least sophisticated way of looking for winning moves and losing moves. 
    //     //      no notion here of a doubleAttack or a forcingMove. 
        
    //     // 1) identify uncertain moves
    //     //      on the first recursive call this is all unclaimed numbers and both lists are empty.
    //     // 1.5) if there are none return the winningMoves list, which may be empty

    //     // 2) Create an array of hypothetical moveLists to test by concating each uncertain move to the param moveList
        
    //     // 3) Scan the hypothetical moveLists to see if I have won in any of them. 



        
    //     // Test each uncertain move by appending it to the move list and seeing if it caused a win
    //         // if it did, add it to the winningMovesList

    //     // 3) 
        
        
    //     if (gameOver(moveList)) {
    //         return winningMoves;
    //     }
    //     // Consider any move that is available and has not been previously marked as losing. 
    //     let undeterminedMoves = unclaimedNumbers(moveList).filter(num => !losingMoves.includes(num)).filter(num => !winningMoves.includes(num));
    //     console.log(`A call to bestMovesList found these unclaimednumbers: ${unclaimedNumbers(moveList)} `);
    //     console.log(`It ruled out these numbers already found to lose: ${losingMoves} `)
    //     console.log(`          and these numbers already found to win: ${winningMoves}  `)
    //     console.log(`                 Leaving these undeterminedMoves: ${undeterminedMoves} \n\n`)

    //     console.log(`Testing each undeterminedMove : ${undeterminedMoves} `)
        
    //     // While movesToConsider is not empty and winningMoves is empty  
        
    //     //  An array of arrays, each one move longer than the parameter movelist
    //     let hypotheticalPositions = []
        
    //     movesToConsider.forEach(number => {
    //         let hypotheticalPosition = moveList.concat(number)
    //         hypotheticalPositions.push(hypotheticalPosition)
    //     })
       
        
        // let wins = immediateWins(moveList);



    //     let hypotheticalMoveCount = 0;
    //     let drawingMoves = unclaimedNumbers(moveList);
        
    //     if (immediateWins(moveList).length > 0){  // if there are immediately winning moves return the list of them. 
    //         return immediateWins(moveList)
    //     }
    //     else {                                    // else remove any immediately losing moves from the list of possiblyWinningMoves

    //     }
       
        
    // }

    // Winning moves are moves that create a 15-sum right now.
    // function winningMoves(moveList) {
    //     let player = myTurn(moveList)
    //     let myMoves = filterMoves(player, moveList); // console.log(`IMMEDIATE WINS (${moveList}) found myMoves: ${myMoves}, winningNumbers: ${winningNumbers(myMoves)}, unclaimedNumbers: ${unclaimedNumbers(moveList)}`)
    //     let winningMoves = intersect(winningNumbers(myMoves), unclaimedNumbers(moveList));  // let immediateWins = unclaimedNumbers(moveList).filter(unclaimedNumber => winningNumbers.includes(unclaimedNumber))  // Unclaimed numbers that result in a win. 
    //     console.log(`IMMEDIATE WINS (${moveList}) found: ${immediateWins.length}.  They are: ${immediateWins}`)
    //     return winningMoves;
    // }

    // Losing Moves are moves that fail to block the opponent from creating a 15-sum
    function losingMoves(params) {
        
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

    function urgentDefensiveMoves(ml = moveList) {
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


    
    // function handleUndoButtonClick() {
    //     const shortenedHistory = history.slice(0, history.length - 2)
    //     console.log(`handleUndoButtonClick() removes both the most recent player move and bot move ${shortenedHistory}`);
    //     setHistory(history.slice(0, history.length - 1));
    //     setTimeout(() => {
    //         setHistory(shortenedHistory);
    //     }, 500);
    //     return 0;
    // }


}



    
