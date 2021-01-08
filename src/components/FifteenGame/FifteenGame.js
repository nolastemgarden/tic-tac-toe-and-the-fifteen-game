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
import Button from '@material-ui/core/Button';


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
    // settingsBox: {
    //     border: 'solid red 1px',
    //     display: 'flex',
    //     width: '100%',
    //     flex: '2 0 10%',

    //     justifyContent: 'space-around'
    // },

    
    record: {
        alignSelf: 'bottom'
    },

    

    
}));


export default function FifteenGame() {
    const classes = useStyles();
    
    let [gameNumber, setGameNumber] = useState(1);
    let [record, setRecord] = useState([0, 0, 0]);     // 3 element counter for humanWins, botWins, and tieGames.
    let [moveList, setMoveList] = useState([]);  // Array of the numbers claimed so far in order claimed.
    let [difficultyMode, setDifficultyMode] = useState("hard"); // In "hard" mode my bot never makes a mistake. In "easy" mode bot makes exactly one mistake each game. 


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
                    handleDifficultyModeChange={handleDifficultyModeChange}
                    difficultyMode={difficultyMode}
                    // setDifficultyMode={setDifficultyMode}
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

    function handleDifficultyModeChange(value) {
        console.assert((value === 'easy' || value === 'medium' || value === 'hard'))
        setDifficultyMode(value)
        setMoveList([]);
        setGameNumber(1)
        setRecord([0, 0, 0])
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
    function intersect(listOne, listTwo) {
        let intersection = Array(0).concat(listOne.filter(number => listTwo.includes(number)))
        // console.log(`intersection of listOne: ${listOne}  and listTwo: ${listTwo}  is: ${intersection} `)
        return intersection;
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


    // Find and make a move for the Bot with a slight delay. 
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
        }, 800);
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

        // In all modes EASY, MEDIUM, and HARD:
        // Opening principles for each players first move then
        // Win immediately if possible and defend if there is an urgent defensive move.
        // In MEDIUM, and HARD modes:
        // Create a double attack if an oportunity arises to do so.
        // In HARD mode:
        // Look for forcing moves that guarantee a chance to make a double attack next move.

        if (ml.length === 0) {                              // FIRST MOVE
            return selectMoveRandomly(unclaimedNumbers(ml))
        }
        else if (ml.length === 1 && difficultyMode === "easy") {  // SECOND MOVE Random in Easy mode
            return selectMoveRandomly(unclaimedNumbers(ml))

        }
        else if (ml.length === 1) {                         // SECOND MOVE Sound in Medium and hard modes.
            if (ml[0] === 5) {                              // CENTER OPENING
                return selectMoveRandomly([2, 4, 6, 8]) 
            }
            else if (ml[0] % 2 === 0) {                     // CORNER OPENING
                return 5                                    
            }
            else if (ml[0] % 2 === 1) {                     // EDGE OPENING
                return getNonurgentBlockingMove(trios)      
            }
        }
        else if (ml.length >= 2) {                         // THIRD MOVE
            // Starting from the third move it is possible O has made a mistake, so look for a forcingMove that leads to a double attack,
            // If there is none, make any non-urgent blocking move.
            let result = [easyProtocol(trios), mediumProtocol(trios), hardProtocol(trios), getNonurgentBlockingMove(trios)]
            console.log(`PROTOCOL RESULTS:  easy: ${result[0]}, medium: ${result[1]}, hard: ${result[2]}, non-urgent blocking: ${result[3]}`)

            if (difficultyMode === "easy") {
                if (result[0] !== -1) {
                    return result[0]
                }
                else {
                    return selectMoveRandomly(unclaimedNumbers(ml))
                }
            }
            else if (difficultyMode === "medium") {
                for (let i = 0; i < 2; i++) {
                    if (result[i] !== -1) {
                        return result[i]
                    }
                }
                return (result[3] === -1) ? selectMoveRandomly(unclaimedNumbers(ml)) : result[3]
            }
            else if (difficultyMode === "hard") {
                for (let i = 0; i < 3; i++) {
                    if (result[i] !== -1) {
                        return result[i]
                    }
                }
                return (result[3] === -1) ? selectMoveRandomly(unclaimedNumbers(ml)) : result[3]
            }
            else {
                console.error(`difficultyMode has invalid setting: ${difficultyMode}`)
                return -1
            }
        }
    }

    function easyProtocol(trios) {
        let immediatelyWinningMoves = getImmediatelyWinningMoves(trios)
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
        else {
            return -1
        }
    }
    function mediumProtocol(trios) {
        let doubleAttackingMoves = getDoubleAttackingMoves(trios)
        if (doubleAttackingMoves.length > 0) {
            console.log(`BOT FOUND DOUBLE ATTACK CREATING MOVES: ${doubleAttackingMoves}`)
            return selectMoveRandomly(doubleAttackingMoves)
        }
        else {
            return -1
        }
    }
    // How the bot plays in HARD mode
    // Given that there are no winning moves, urgent defensive moves, or double attack creating moves...
    // LOOK FOR DISTANT FORCED WINS 
    function hardProtocol(trios) {
        let distantForcedWins = getDistantForcedWins(trios)
        if (distantForcedWins.length > 0) {
            console.log(`BOT FOUND DISTANT WIN FORCING MOVES: ${distantForcedWins}`)
            return selectMoveRandomly(distantForcedWins)
        }
        else {
            return -1
        }
    }

    function getNonurgentBlockingMove(trios) {
        let blockingTrios = trios.filter(trio => (trio.botMoves === 0 && trio.playerMoves === 1))
        let blockingMoves = blockingTrios.map(trio => trio.unclaimed).flat()
        if (blockingMoves.length > 0) {
            console.log(`BOT selecting a non-urgent BLOCKING MOVE from: ${blockingMoves}`)
            return selectMoveRandomly(blockingMoves)
        }
        else {
            return -1
        }
    }
    
    function noDuplicatesIn(array) {
        let sorted = array.sort()
        sorted.forEach((element, index, array) => {
            if (element === array[index + 1]) {
                return false
            }
        })
        return true
    }

    // LOOKING AT TRIOS from the BOTS perspective
    // A move is a mistake if making it results in any trio having botMoves = 0 && playerMoves = 2
    // A move is a mistake if making it results in multiple trios having botMoves = 0 && playerMoves = 1 such 
    //    that the intersection of those trios unclaimedNubers is non-empty

    
    // distantForcedWins are a possibility on the third, fourth, and fifth moves of the game.
    // however, on the fifth move if there is a distantForcedWin it is either the case that it is
    // a forced good move or that there is also a doubleAttack that wins even quicker. 
    
    
    // First, identify the complete list of forcing moves,
    // forEach, identify the forced defensive move that follows,
    // forEach pair, create a hypothetical moveList by adding both of those moves
    // use each hypothetical moveList in a call to getTrios()
    // check the resulting trios[] for double attacking moves
    //   1) if there is an urgent defensiveMove, take the intersection of this and the double attacking moves list.
    //   2) otherwise see if there are any double attacking moves at all.
    function getDistantForcedWins(trios) {
        let distantWinForcingMoves = []
        // Distant forced wins take FIVE moves to play out fully.  ensure there is room on the board.
        if (moveList.length > 4) {
            return distantWinForcingMoves
        }

        // they ALL happen to be forcing moves but being a forcing move is no guarantee of soundness inandofitself.
        // You can force O to set up a distant forced win, a double attack, or to an easy draw.  
        // Fortunately, since they are all forcing moves it is easy to analyse the set of responses to see
        // which force O to good outcomes and which to bad.
        // Whenever you force O to make a bad move you will have a double attack immediately available afterward.
        // Remember that having a double attack immediately available means either your move next is not forced at all 
        // OR you are forced to create the double attack.
        let triosWithOneBotMove = trios.filter(trio => (trio.botMoves === 1 && trio.playerMoves === 0))
        
        let forcingMoves = triosWithOneBotMove.map(trio => trio.unclaimed).flat()
        console.assert(noDuplicatesIn(forcingMoves), 'There are duplicates in the forcingMoves list that were not identified as a double attack.')

        forcingMoves.forEach(forcingMove => {
            let testOne = moveList.concat(forcingMove)
            let forcedMove = (getTrios(testOne).filter(trio => trio.botMoves === 2 && trio.playerMoves === 0)).map(trio => trio.unclaimed).flat()
            let testTwo = moveList.concat(forcedMove)
            let urgentDefensiveMoves = getUrgentDefensiveMoves(getTrios(testTwo))
            let doubleAttackingMoves = getDoubleAttackingMoves(getTrios(testTwo))
            console.log(`urgentDefensiveMoves: ${urgentDefensiveMoves}`)
            console.log(`doubleAttackingMoves: ${doubleAttackingMoves}`)

            if (urgentDefensiveMoves.length === 0 && doubleAttackingMoves.length > 0) {
                console.log(`Bot has no urgent defensive moves and can make a double attack in the hypothetical position, meaning this forcing move is sound.`)
                distantWinForcingMoves = distantWinForcingMoves.concat(forcingMove)
            }
            else if (urgentDefensiveMoves.length === 1 && intersect(urgentDefensiveMoves, doubleAttackingMoves).length > 0) {
                console.log(`Bot is forced to make a double attack in the hypothetical position, meaning this forcing move is sound.`)
                distantWinForcingMoves = distantWinForcingMoves.concat(forcingMove)
            }
        })
        console.log(`distantWinForcingMoves: ${distantWinForcingMoves}`)
        return distantWinForcingMoves
    }
    
    

    function getImmediatelyWinningMoves(trios) {
        return trios.filter(trio => (trio.botMoves === 2 && trio.playerMoves === 0)).map(trio => trio.unclaimed)
    }

    function getUrgentDefensiveMoves(trios) {
        return trios.filter(trio => (trio.botMoves === 0 && trio.playerMoves === 2)).map(trio => trio.unclaimed)
    }

    function getDoubleAttackingMoves(trios) {
        // Filter out trios that opponent has already blocked AND trios that Bot has no moves in.
        // In the list of unclaimed numbers in the trios where the bot has made the only move,
        //    find duplicates by Filtering out the first occurance of each unclaimed number.
        let attackingTrios = trios.filter(trio => (trio.botMoves === 1 && trio.playerMoves === 0))
        let attackingMoves = attackingTrios.map(trio => trio.unclaimed).flat()
        // BUG WARNING: Though attacking moves looks like a normal array when printed to the console...
        // It is in fact an Array of two-element arrays.  To remedy this we must use Array.prototype.flat()

        let doubleAttackingMoves = attackingMoves.filter((move, index, self) => (self.indexOf(move) !== index))
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

    // // winning combos are 2-number sets that would complete a win.
    // // A two number combo is only winning if both of its numbers are yet unclaimed. 
    // // A number is part of a winning combo if 
    // //    1) it is unclaimed &&
    // //    2) adding it to the 
    // function winningCombos(ml, moveSet) {
    //     let winningCombos = []
    //     let unclaimed = unclaimedNumbers(ml)
    //     moveSet.forEach((myNumber) => {
    //         unclaimed.forEach((secondNumber) => {
    //             let thirdNumber = complementOf(myNumber + secondNumber)
    //             if (unclaimed.includes(thirdNumber)) {
    //                 winningCombos = winningCombos.concat(secondNumber, thirdNumber)
    //             }
    //         })
    //     })

    //     // Every number that appears on this list is expected to appear at least twice.
    //     // If a number appears four times that indicates it is the focus of a double attack.
    //     // console.log(`Winning Combos: ${winningCombos}`)
    //     return winningCombos

    //     // This list can be used to fin winning double attacks but may also help with more difficult situations.
    //     // Can the bot find its best (forcing) move if there are no immediate wins and no double attacks by selecting 
    //     // the move that appears the most times on their list of threat creating moves combined with the oppponents
    //     // list of threat creating moves?

    // }
    // function attackingMoves(ml, moveSet) {
    //     let attackingMoves = []
    //     let unclaimed = unclaimedNumbers(ml)
    //     moveSet.forEach((myNumber) => {
    //         unclaimed.forEach((secondNumber) => {
    //             let thirdNumber = complementOf(myNumber + secondNumber)
    //             if (unclaimed.includes(thirdNumber)) {
    //                 attackingMoves = attackingMoves.concat(secondNumber, thirdNumber)
    //             }
    //         })
    //     })

    //     // Every number that appears on this list is expected to appear at least twice.
    //     // If a number appears four times that indicates it is the focus of a double attack.
    //     // console.log(`Winning Combos: ${winningCombos}`)
    //     return attackingMoves

    //     // This list can be used to fin winning double attacks but may also help with more difficult situations.
    //     // Can the bot find its best (forcing) move if there are no immediate wins and no double attacks by selecting 
    //     // the move that appears the most times on their list of threat creating moves combined with the oppponents
    //     // list of threat creating moves?
    // }



}



    
