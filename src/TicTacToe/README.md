The Tic Tac Toe game explains itself but if you want to glimpse its inner workings without diving deep into the code keep reading!
This file contains the names of all the helper methods that make the game work. Most of them have names that describe what they do, so you can get a pretty good idea of how the program works just by reading this list of function names. 

// The board data to render is a the latest entry in history.  We will have an 'undo' but not a 'redo' button.  May add a Make Computer Move
    function getBoardSymbols(moveList = history) {
    function getBoardColors() 
    function getBoardHints() 
    


    // MID-LEVEL HELPERS for getBoardColors() and getBoardHints()
    function highlightWins()
    function thereIsAnImmediateWin(moveList = history) 
    function immediateWins(moveList = history) 
    function thereIsAnUrgentDefensiveMove(moveList = history) 
    function urgentDefensiveMoves(moveList = history) 
    function threatCreatingMoves(moveList = history) 
    function singleAttackCreatingMoves(moveList = history)
    function doubleAttackCreatingMoves(moveList = history) 
    function thereIsAWinningDoubleAttack(moveList = history)
    function winningDoubleAttackCreatingMoves(moveList = history) 
    function forcedWinCreatingMoves(moveList = history) 
    function gameLosingMoves(moveList = history) 


    // HIGH-LEVEL PANEL HELPERS no params
    function getStatus() {
    function getCommentary() 


    // CLICK HANDLERS
    function handleSquareClick(squareClicked) {
    function handleUndoButtonClick() 
    function handleNewGameButtonClick()
    function toggleShowMovesSwitch() 
    function toggleShowCommentarySwitch() 

    // TURN HELPERS
    // High-Level Methods that need to know whose turn it is can deduce that info by using these helpers to look at the history directly, rather than having to be invoked with a player param. 
    function myTurn(moveList = history) {
        return (moveList.length % 2 === 0) ? 'x' : 'o';
    }
    function notMyTurn(moveList = history) {
        return (moveList.length % 2 === 0) ? 'o' : 'x';
    }
    function other(player) {
        if (player !== 'o' && player !== 'x') { console.error(`other(player) called with invalid player: ${player}`) }
        return (player === 'o') ? 'x' : 'o';
    }

    // LOW-LEVEL HELPERS
    // need to be told which player you care about b/c they may be used on EITHER the player whose turn it is or the other player.
    function squaresClaimedByPlayer(player, moveList = history) 
    function lineCountsFor(player, moveList = history) 
    function wins(player, moveList = history)
    function thereIsAForcedWin(moveList = history)
    function linesWithThree(player, moveList = history) 
    function linesWithOnlyTwo(player, moveList = history) 
    function linesWithOnlyOne(moveList = history) 
    function emptyLines(moveList = history)
    function blockedLines(moveList = history) 
    function allLines() 
    function emptySquares(moveList = history)
    function squaresInLine(lineId) 

    // BOOLEAN helpers for getStatus() and handleSquareClick()
    function squareIsEmpty(square, moveList = history)
    function gameDrawn() 
    function gameOver(moveList = history) 

