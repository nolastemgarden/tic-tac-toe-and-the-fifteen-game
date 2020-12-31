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
import { Theaters } from '@material-ui/icons';
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
        // border: 'solid yellow 1px',
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
    
    let [gameNumber, setGameNumber] = useState(1);
    let [record, setRecord] = useState([0, 0, 0]);     // 3 element counter for humanWins, botWins, and tieGames.
    let [moveList, setMoveList] = useState([]);  // Array of the numbers claimed so far in order claimed.
    let [difficultyMode, setDifficultyMode] = useState("hard"); // In "hard" mode my bot never makes a mistake. In "easy" mode bot makes exactly one mistake each game. 

    
    // One plus the number of completed games in the record.
    // OR SHOULD THIS be made into state so that the record can update as soon as the game ends while the gameNumber updates when newGame is clicked.
    // function getGameNumber(r = record) {
    //     let gameNumber = 1
    //     r.forEach((count) => { gameNumber = gameNumber + count })
    //     return gameNumber
    // }

    // The human moves first in the first game, alternating after that.
    function botGoesFirst(gn = gameNumber) { return (gn % 2 === 0)  }

    // Add up the moves in the current moveList to determin turn number. 1-indexed.
    function moveNumber(ml = moveList) { return ( 1 + ml.length) }
    
    // The human moves first in the first game, alternating after that.
    function botGoesNext(gn = gameNumber, ml = moveList) { 
        if (gameOver(ml)) {
            return false;
        }
        let firstAndOdd = (botGoesFirst(gn) && moveNumber(ml) % 2 === 1);
        let secondAndEven = (!botGoesFirst(gn) && moveNumber(ml) % 2 === 0)
        return (firstAndOdd || secondAndEven);
    }

    // Convert a moveList into the representation the <Board> uses.
    function getBoardStatus(ml = moveList) {
        let boardStatus = Array(10).fill('unclaimed')  // CardIds range from 1-9. Index 0 in this array is never used.
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
                    gameNumber={gameNumber}
                    gameStatus={getGameStatus()}
                    moveNumber={moveNumber()}
                    // handleUndoClick={handleUndoClick}
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
    // function handleUndoClick(ml = moveList) {
    //     const shortenedMoveList = ml.slice(0, ml.length - 2)
    //     console.log(`handleUndoButtonClick() removed ${ml[ml.length - 1]} and ${ml[ml.length - 2]} . New Shortened history: ${shortenedMoveList}`);
    //     setMoveList(shortenedMoveList);
    // }
    function handleNewGameClick() {
        const empty = [];
        const nextGameNumber = ++gameNumber;
        
        setMoveList(empty);
        setGameNumber(nextGameNumber);
        if (botGoesFirst(nextGameNumber)) {
            handleBotsTurn(empty);
        }
    }

    
    
    
    function handleGameOver(ml = moveList) {
        if (!gameOver(ml)) {
            console.error(`NO EFFECT. handleGameOver called but the game isn't actually over!!!!!!!!!!!!!!`)
            return;
        }
        
        
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


    function getGameStatus(ml = moveList) {
        if (gameOver(ml)) {
            if (thereIsAWinIn(firstPlayersMoves(ml))) {
                console.log(`There is a win in the first players moves and botGoesFirst = ${botGoesFirst()}`)
                return (botGoesFirst()) ? `Bot Wins!` : `Player Wins!` 
            }
            if (thereIsAWinIn(secondPlayersMoves(ml))) {
                console.log(`There is a win in the second players moves and botGoesFirst = ${botGoesFirst()}`)
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
    

    // There is a subset of three numbers that sum to 15.  
    // A "moveList" is an alternating sequence of both players' moves.  
    // "moveSet" distinguishes that this is pre-filtered to contain only moves of one player or the other. 
    function thereIsAWinIn(moveSet) {
        return (sumsOfThree(moveSet).includes(15)); // sumsOfThree() has a built in early return in case myMoves.length > 3
    }
    function gameWasJustWon(ml = moveList) {
        let moveSet = (whoseTurn(ml) === "playerOne") ? secondPlayersMoves(ml) : firstPlayersMoves(ml)
        return thereIsAWinIn(moveSet)
    }
    function thereIsANextMoveWinIn(ml = moveList) {
        let moveSet = (whoseTurn(ml) === "playerOne") ? firstPlayersMoves(ml) : secondPlayersMoves(ml)
        unclaimedNumbers(ml).forEach((move) => {
            if (thereIsAWinIn(moveSet.concat(move))) {
                return true;
            }
        })
        return false;
    }

    // MOVELIST FILTERS  
    function firstPlayersMoves(ml = moveList) {
        return ml.filter((move, turnNumber) => turnNumber % 2 === 0)
    }
    function secondPlayersMoves(ml = moveList) {
        return ml.filter((move, turnNumber) => turnNumber % 2 === 1)
    }
    function botsNumbers(ml = moveList) {
        let botsNumbers = (botGoesFirst()) ? firstPlayersMoves(ml) : secondPlayersMoves(ml);
        // console.log(`Bots Numbers: ${botsNumbers}`)
        return botsNumbers;
    }
    function playersNumbers(ml = moveList) {
        let playersNumbers = (!botGoesFirst()) ? firstPlayersMoves(ml) : secondPlayersMoves(ml);
        // console.log(`Players Numbers: ${playersNumbers}`)
        return playersNumbers;
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

    function whoseTurn(ml = moveList) {   //  RETURNS 'playerOne' or 'playerTwo'  NOT 'bot' or 'human'
        let whoseTurn = '';
        whoseTurn = (ml.length % 2 === 0) ? 'playerOne' : 'playerTwo'
        // whoseTurn = ( botGoesFirst() && moveList.length % 2 === 0) ? 'bot' : 'human';
        // whoseTurn = (!botGoesFirst() && moveList.length % 2 === 1) ? 'bot' : 'human';
        return whoseTurn;
    }

    function unclaimedNumbers(ml = moveList) {
        let unclaimed = [];
        for (let i = 1; i <= 9; i++){
            if (!ml.includes(i)){
                unclaimed.push(i)
            }
        }
        return unclaimed;
    }

    
    
    // winning numbers are numbers that would create a subset that sums to 15. 
    // They are "winning numbers" regardless of whether they are already claimed or not. 
    function winningNumbers(moveSet) {
        let partialSums = sumsOfTwo(moveSet).filter((sum) => (sum > 6 && sum < 15)); // the only thing that matters are two-element sets that sum to less than 15.
        let winningNumbers = partialSums.map(sum => 15 - sum);  // Get the complement to each partial sum.  
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
        const turnNumber = moveList.length;

        
        let unsorted = unclaimedNumbers(ml);
        console.log(`Move List: ${ml}  Unclaimed Numbers: ${unsorted}`)
        
        let initialMoves = {
            botsNumbers: botsNumbers(ml),
            playersNumbers: playersNumbers(ml),
            winning: [],
            drawing: [],
            losing: [],
            unsorted: unsorted 
        }

        console.log(`Initial Moves: `)
        console.log(`Bots Numbers: ${initialMoves.botsNumbers}`)
        console.log(`Players Numbers: ${initialMoves.playersNumbers}`)
        console.log(`Winning: ${initialMoves.winning}`)
        console.log(`Drawing: ${initialMoves.drawing}`)
        console.log(`Losing : ${initialMoves.losing}`)
        console.log(`Unsorted: ${initialMoves.unsorted}`)
        
        let sortedMoves = sortMovesForBot(ml, initialMoves);
        let botMove;

        if (difficultyMode === "hard") {
            botMove = (sortedMoves.winning.length > 0) ? selectMoveRandomly(sortedMoves.winning) : selectMoveRandomly(sortedMoves.drawing);
        }
        else if (difficultyMode === "easy") {
            console.error(`Logic for difficultyMode = "easy" has not been written yet.`)
            // In easy mode bot will make a mistake on its first move if it goes second or its second move if it goes first.
        }
        else {
            console.error(`difficultyMode has invalid setting: ${difficultyMode}`)
        }
        console.log(`Bot selected move: ${botMove}`)
        let updatedMoveList = ml.concat(botMove);
        setTimeout(() => {
            setMoveList(updatedMoveList);
            if (gameOver(updatedMoveList)) {
                console.log("Don't let player move again. Call handleGameOver instead.")
                handleGameOver(updatedMoveList);
                return 1;
            }
        }, 500);
    }

    function sortMovesForBot(moveList, moves) {
        let previouslyUnsorted = moves.unsorted;
        let unclaimed = unclaimedNumbers(moveList)
        let unsortedAndUnclaimed = intersect(previouslyUnsorted, unclaimed)
        
        let hypotheticalPosition;
        moves.unsorted = [];
        unsortedAndUnclaimed.forEach((move) => {
            hypotheticalPosition = moveList.concat(move)
            console.log(`hypotheticalPosition: ${hypotheticalPosition}`)
            
            if (gameWasJustWon(hypotheticalPosition)) {
                moves.winning = moves.winning.concat(move);
            }
            else if (hypotheticalPosition.length >= 9) {
                moves.drawing = moves.drawing.concat(move);
            }
            else if (thereIsANextMoveWinIn(hypotheticalPosition)) {
                moves.losing = moves.losing.concat(move);
            }
            else if (hypotheticalPosition.length >= 8) {
                moves.drawing = moves.drawing.concat(move);
            }
            else {
                moves.unsorted = moves.unsorted.concat(move);
            }
            
        })
        
        console.log(`Sorted Moves: `)
        console.log(`Bots Numbers: ${moves.botsNumbers}`)
        console.log(`Players Numbers: ${moves.playersNumbers}`)
        console.log(`Winning: ${moves.winning}`)
        console.log(`Drawing: ${moves.drawing}`)
        console.log(`Losing : ${moves.losing}`)
        console.log(`Unsorted: ${moves.unsorted}`)

        
        if (moves.unsorted.length > 0) {
            moves.unsorted.forEach((move) => {
                sortMovesForBot(hypotheticalPosition, moves)
            })
        }

        
        return moves;
    }

    // this method is only called by handleBotsTurn. Depending on the settings it selects a random move from either the bestMoves list or the losingMoves list.
    // TODO This method is a skeleton that simply passes the call to getBestMoves()
    function getBotMove(ml = moveList) {
        // If there is an immediate win the bot will do that.
        
        
        
        // let losing moves = ...
        // if botPlaysPerfectly = false && turn number == 1 or 2 make a mistaken move.
        let botMove = selectMoveRandomly(soundMoves(ml))
        console.log(`Selecting Bot Move at random from "sound moves": ${soundMoves(moveList)}`)
        return botMove;
    }


    // 
    //     
    // HOW TO GET A BEST MOVE:  
    
    
    // 1) Start with the current position and look for immediateWinningMoves. 
    //    This list is the intersection of unclaimedNumbers and winningNumbers. if there are none...
    // 
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

    

    
    
    // Returns a list of legal moves.  
    // Sound moves either win if possible and draw otherwise.
    // Assumes player whose turn it is has not already made an unsound move
    function soundMoves(ml = moveList, undeterminedMoves = [], winningMoves = [], losingMoves = [] ) {
        
        // let undeterminedMoves = unclaimedNumbers(moveList).filter(num => !losingMoves.includes(num)).filter(num => !winningMoves.includes(num));
        console.log(`soundMoves called with moveList: ${ml}} `);
        console.log(`soundMoves found these yet unclaimedNumbers: ${unclaimedNumbers(ml)}} `);
        console.log(`soundMoves will filter these undeterminedMoves: ${undeterminedMoves}} `);
        console.log(`   these numbers were previously found to lose: ${losingMoves} `)
        console.log(`   these numbers were previously found to win:  ${winningMoves} \n\n`)

        // If you can win immediately that is the sound thing to do... 
        if (winningMoves(ml).length > 0) {
            console.error(`soundMoves found a winning move!`)
            return winningMoves(ml);
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
    
    
    
    function winningMovesList(moveList, losingMoves, winningMoves) {
        
        // Consider any move that is available and has not been previously marked as losing. 
        let undeterminedMoves = unclaimedNumbers(moveList).filter(num => !losingMoves.includes(num)).filter(num => !winningMoves.includes(num));
        console.log(`A call to bestMovesList found these unclaimednumbers: ${unclaimedNumbers(moveList)} `);
        console.log(`It ruled out these numbers already found to lose: ${losingMoves} `)
        console.log(`          and these numbers already found to win: ${winningMoves}  `)
        console.log(`                 Leaving these undeterminedMoves: ${undeterminedMoves} \n\n`)

        console.log(`Testing each undeterminedMove : ${undeterminedMoves} `)
        
        // While movesToConsider is not empty and winningMoves is empty  
        
        //  An array of arrays, each one move longer than the parameter movelist
        let hypotheticalPositions = []
        
        // movesToConsider.forEach(number => {
        //     let hypotheticalPosition = moveList.concat(number)
        //     hypotheticalPositions.push(hypotheticalPosition)
        // })
       
        
        let wins = immediateWins(moveList);



        let hypotheticalMoveCount = 0;
        let drawingMoves = unclaimedNumbers(moveList);
        
        if (immediateWins(moveList).length > 0){  // if there are immediately winning moves return the list of them. 
            return immediateWins(moveList)
        }
        else {                                    // else remove any immediately losing moves from the list of possiblyWinningMoves

        }
       
        
    }

    

    // The intersection of unclaimedNumbers and MY winningNumbers.
    function immediateWins(ml = moveList) {
        let player = whoseTurn(ml)
        let myMoves = filterMoves(player, ml);
        // console.log(`IMMEDIATE WINS (${moveList}) found myMoves: ${myMoves}, winningNumbers: ${winningNumbers(myMoves)}, unclaimedNumbers: ${unclaimedNumbers(moveList)}`)
        let immediateWins = intersect(winningNumbers(myMoves), unclaimedNumbers(ml));  // let immediateWins = unclaimedNumbers(moveList).filter(unclaimedNumber => winningNumbers.includes(unclaimedNumber))  // Unclaimed numbers that result in a win. 
        console.log(`IMMEDIATE WINS (${ml}) found: ${immediateWins}`)
        return immediateWins;
    }

    function urgentDefensiveMoves(ml = moveList) {
        let player = whoseTurn(moveList)
        let opponentsMoves = filterMoves(other(player), moveList);
        // console.log(`URGENT DEFENSIVE MOVES (${moveList}) found opponentsMoves: ${opponentsMoves}, winningNumbers: ${winningNumbers(opponentsMoves)}, unclaimedNumbers: ${unclaimedNumbers(moveList)}`)
        let urgentDefensiveMoves = intersect(winningNumbers(opponentsMoves), unclaimedNumbers(moveList)); 
        console.log(`URGENT DEFENSIVE MOVES (${moveList}) found: ${urgentDefensiveMoves}`)  
        return urgentDefensiveMoves;
    }

    // This method should not be called if there is an immediate win or an urgentDefensiveMove. 
    function doubleAttackingMoves(moveList) {
        let player = whoseTurn(moveList)
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
    function selectMoveRandomly(moveSet) {
        // console.log(`selectMoveRandomly found these unclaimedNumbers: ${unclaimedNumbers(moveList)}`)
        let randomMove = moveSet[Math.floor(Math.random() * moveSet.length)]
        // console.log(`selectMoveRandomly chose ${randomMove} from the given moveSet: ${moveSet}`)
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



    
