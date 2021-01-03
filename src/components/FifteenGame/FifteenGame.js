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
import { ContactlessOutlined, Theaters } from '@material-ui/icons';
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
            console.log(`updatedMoveList: ${updatedMoveList} `)
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
                // console.log(`There is a win in the first players moves and botGoesFirst = ${botGoesFirst()}`)
                return (botGoesFirst()) ? `Bot Wins!` : `Player Wins!` 
            }
            if (thereIsAWinIn(secondPlayersMoves(ml))) {
                // console.log(`There is a win in the second players moves and botGoesFirst = ${botGoesFirst()}`)
                return (botGoesFirst()) ? `Player Wins!` : `Bot Wins!`
            }
            else {
                return (`Game Over. Draw.`)
            } 
        } else {
            // if (botGoesFirst() && ml.length % 2 === 0) {
            //     return (`Bot's turn.`)
            // }
            // if (!botGoesFirst() && ml.length % 2 === 1) {
            //     return (`Bot's turn.`)
            // }
            if (botGoesNext(gameNumber, ml)) {
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
    function getBotsNumbers(ml = moveList) {
        let botsNumbers = (botGoesFirst()) ? firstPlayersMoves(ml) : secondPlayersMoves(ml);
        // console.log(`Bots Numbers: ${botsNumbers}`)
        return botsNumbers;
    }
    function getPlayersNumbers(ml = moveList) {
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
        let partialSums = sumsOfTwo(moveSet).filter((sum) => (sum >= 6 && sum < 15)); // the only thing that matters are two-element sets that sum to less than 15.
        let winningNumbers = partialSums.map(sum => 15 - sum);  // Get the complement to each partial sum.  
        // Add removeDuplicates() helper? 
        // console.log(`winningNumbers called with moveSet: ${moveSet} found the following: ${winningNumbers}`);
        return winningNumbers;
    }

    // winning moves are the intersection of winning numbers for the player whose turn it is and unclaimed numbers. 
    // They are "winning numbers" regardless of whether they are already claimed or not. 
    // function winningMoves(ml) {
    //     let moveSet = ml.filter((move, turn) => turn % 2 !== ml.length % 2)
    //     return intersect(winningNumbers(moveSet), unclaimedNumbers(ml))
    // }

    // winning combos are 2-number sets that would complete a win.
    // A two number combo is only winning if both of its numbers are yet unclaimed. 
    // A number is part of a winning combo if 
    //    1) it is unclaimed &&
    //    2) adding it to the 
    function winningCombos(ml, moveSet) {
        let winningCombos = []
        let unclaimed = unclaimedNumbers(ml)
        moveSet.forEach((myNumber) => {
            unclaimed.forEach((secondNumber) => {
                let thirdNumber = complementOf(myNumber + secondNumber)
                if (unclaimed.includes(thirdNumber)) {
                    winningCombos = winningCombos.concat(secondNumber, thirdNumber)
                }
            })
        })

        // Every number that appears on this list is expected to appear at least twice.
        // If a number appears four times that indicates it is the focus of a double attack.
        // console.log(`Winning Combos: ${winningCombos}`)
        return winningCombos

        // This list can be used to fin winning double attacks but may also help with more difficult situations.
        // Can the bot find its best (forcing) move if there are no immediate wins and no double attacks by selecting 
        // the move that appears the most times on their list of threat creating moves combined with the oppponents
        // list of threat creating moves?

    }
    function attackingMoves(ml, moveSet) {
        let attackingMoves = []
        let unclaimed = unclaimedNumbers(ml)
        moveSet.forEach((myNumber) => {
            unclaimed.forEach((secondNumber) => {
                let thirdNumber = complementOf(myNumber + secondNumber)
                if (unclaimed.includes(thirdNumber)) {
                    attackingMoves = attackingMoves.concat(secondNumber, thirdNumber)
                }
            })
        })

        // Every number that appears on this list is expected to appear at least twice.
        // If a number appears four times that indicates it is the focus of a double attack.
        // console.log(`Winning Combos: ${winningCombos}`)
        return attackingMoves

        // This list can be used to fin winning double attacks but may also help with more difficult situations.
        // Can the bot find its best (forcing) move if there are no immediate wins and no double attacks by selecting 
        // the move that appears the most times on their list of threat creating moves combined with the oppponents
        // list of threat creating moves?




    }


    function complementOf(sumOfTwo) {
        return (15 - sumOfTwo)
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
        let botMove = getBotMove(ml)
        
        
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

    
    // In order to not lose to the Edge opening, O must start by blocking ONE of the TWO trios X's first move is in.
    // In order to not lose to the Corner opening, O must start by blocking ONE of the THREE trios X's first move is in, 
    //      by choosing the move that gives O the most footholds in unblocked lines possible.
    // In order to not lose to the Center opening, O must start by blocking ONE of the FOUR trios X's first move is in, 
    //      by choosing the move that gives O the most footholds in unblocked lines possible, TWO.
    // In every opening O must block 

    // X wins any game that starts with 3 even numbers.

    function getBotMove(ml = moveList) {
        let trios = getTrios(ml)

        // In both EASY and HARD modes: Win immediately if possible and defend if there is an urgent defensive move.
        // let immediatelyWinningMoves = intersect(winningNumbers(getBotsNumbers(ml)), unclaimedNumbers(ml))
        // let urgentDefensiveMoves = intersect(winningNumbers(getPlayersNumbers(ml)), unclaimedNumbers(ml))
        let immediatelyWinningMoves = trios.filter(trio => (trio.botMoves === 2 && trio.playerMoves === 0)).map(trio => trio.unclaimed)
        // let urgentDefensiveMoves = trios.filter(trio => (trio.botMoves === 0 && trio.playerMoves === 2)).map(trio => trio.unclaimed)
        let urgentDefensiveMoves = getUrgentDefensiveMoves(trios)
        
        if (immediatelyWinningMoves.length > 0) {
            console.log(`BOT FOUND A WINNING MOVE: ${immediatelyWinningMoves}`)
            return selectMoveRandomly(immediatelyWinningMoves)
        }
        else if (urgentDefensiveMoves.length > 1) {
            console.error(`BOT Must have played inaccurately, there are now TWO URGENT DEFENSIVE MOVES: ${urgentDefensiveMoves}`)
            return selectMoveRandomly(urgentDefensiveMoves)
        }
        else if (urgentDefensiveMoves.length > 0) {
            console.log(`BOT FOUND AN URGENT DEFENSIVE MOVE: ${urgentDefensiveMoves}`)
            return selectMoveRandomly(urgentDefensiveMoves)
        }
        else if (difficultyMode === "easy") {
            return selectMoveRandomly(unclaimedNumbers(ml))
        } 
        else if (difficultyMode === "hard") {
            // How the bot plays in HARD mode
            // Given that there are no winning moves or urgent defensive moves
            
            
            // First, seek to make a double attack...
            let doubleAttackingMoves = getDoubleAttackingMoves(trios)
            if (doubleAttackingMoves.length > 0) {
                console.log(`BOT FOUND DOUBLE ATTACK CREATING MOVES: ${doubleAttackingMoves}`)
                return selectMoveRandomly(doubleAttackingMoves)
            }

            
            // Second, seek to make a forcing move, 
            //      verify that it does not force the opponent to create a double attack
            let forcingMoves = trios.filter(trio => (trio.botMoves === 1 && trio.playerMoves === 0)).map(trio => trio.unclaimed).flat()
            console.log(`BOT FOUND FORCING MOVES: ${forcingMoves}`)
            
            let soundForcingMoves = forcingMoves.filter(forcingMove => {
                let forcedDefensiveMove = getTrios(ml.concat(forcingMove)).filter(trio => (trio.botMoves === 2 && trio.playerMoves === 0)).map(trio => trio.unclaimed)
                return (getUrgentDefensiveMoves(ml.concat(forcingMove, forcedDefensiveMove)).length > 1)
            })
            console.log(`BOT FILTERED OUT UNSOUND FORCING MOVES: ${soundForcingMoves}`)
            if (soundForcingMoves.length > 0) {
                return selectMoveRandomly(soundForcingMoves)
            }



            // Third, 


            
            if (unclaimedNumbers(ml).includes(5)) {
                return 5
            }
            else {
                return selectMoveRandomly(unclaimedNumbers(ml))
            }
            // }
            // console.log(counts[5], counts[2], counts[9], counts[4]);
        }
        else {
            console.error(`difficultyMode has invalid setting: ${difficultyMode}`)
        }


    }

    function getUrgentDefensiveMoves(trios) {
        return trios.filter(trio => (trio.botMoves === 0 && trio.playerMoves === 2)).map(trio => trio.unclaimed)
    }

    function getDoubleAttackingMoves(trios) {
        // 1) Filter out trios that opponent has already blocked.
        // 2) Filter out trios that Bot has no moves in.
        // 3) In the list of unclaimed numbers in the trios where the bot has made the only move,
        //    find duplicates by Filtering out the first occurance of each unclaimed number.
        let attackingTrios = trios.filter(trio => (trio.botMoves === 1 && trio.playerMoves === 0))
        let attackingMoves = attackingTrios.map(trio => trio.unclaimed).flat()
        // console.log(`BOT FOUND ATTACK CREATING MOVES: ${attackingMoves}`)
        // BUG WARNING: Though attacking moves looks like a normal array when printed to the console...
        // It is in fact an Array of two-element arrays.  To remedy this we must use Array.prototype.flat()

        let doubleAttackingMoves = attackingMoves.filter((move, index, self) => (self.indexOf(move) !== index))
        // let doubleAttackingMoves = attackingMoves.forEach(element => {
        //     console.log(`Element: ${element}`)
        // });
        // ((move, index, self) => (self.indexOf(move) === index))

        // console.log(`BOT FOUND DOUBLE ATTACK CREATING MOVES: ${doubleAttackingMoves}`)

        return doubleAttackingMoves
    }

    // This is the cousin of the TicTacToe Game's method lineCountsFor(player, moveList)
    // Rather than having to specify player 1 or 2 and returning an array, this method counts for both
    // the bot and player and returns an Array of trio Objects
    function getTrios(ml = moveList) {
        let botsNumbers = getBotsNumbers(ml)
        let playersNumbers = getPlayersNumbers(ml)

        let trios = []
        let index = 0
        for (let i = 1; i <= 7; i++) {
            for (let j = i + 1; j <= 8; j++) {
                let k = complementOf(i + j)
                if (k > j && k <= 9) {
                    let newTrio = [i, j, k]
                    trios[index++] = {
                        'trio': newTrio,
                        'playerMoves': intersect(newTrio, playersNumbers).length, 
                        'botMoves': intersect(newTrio, botsNumbers).length,
                        'unclaimed': intersect(newTrio, unclaimedNumbers(ml)) 
                    }
                }
            }
        }
        console.log(trios)
        return trios
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
        let opponentsMoves = filterMoves(other(player), ml);
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



    
