import React, { useState } from 'react';
// import { BrowserRouter as Router, Route } from "react-router-dom";

// import './TicTacToeGame.css';


import Button from '@material-ui/core/Button';
import {
    Box,
} from "@material-ui/core/";

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    game: {
        // border: 'solid blue 4px',
        width: '480px',
        height: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center'
    },
    board: {
        boxSizing: 'border-box',
        border: 'solid blue 4px',
        width: '100%',
        height: '75%',
        display: 'flex',
    },
    info: {
        boxSizing: 'border-box',
        border: 'solid blue 8px',
        width: '100%',
        backgroundColor: 'white',
        height: '25%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    column: {
        // border: 'solid purple 1px',
        width: '68px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column-reverse',
    },
    square: {
        // border: 'solid purple 1px',
        width: '100%',
        height: '68px',
        backgroundColor: 'blue',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusDisplay: {
        // border: 'solid purple 1px',
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        height: '80px',
        width: '45%',
    },
    infoCircle: {
        // border: 'solid purple 1px',
        width: '50px',
        height: '50px',
    },
    openCircle: {
        backgroundColor: 'white',
        width: '85%',
        height: '85%',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    redCircle: {
        backgroundColor: 'red',
        width: '85%',
        height: '85%',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    yellowCircle: {
        backgroundColor: 'yellow',
        width: '85%',
        height: '85%',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


function ConnectFourGame() {
    const classes = useStyles();

    function Circle(props) {
        console.log("Color: " + props.color);
        console.log("Id: " + props.id);
        if (props.color === 'red') {
            return (
                <div className={classes.redCircle}>
                    {props.id}
                </div>
            )
        }
        if (props.color === 'yellow') {
            return (
                <div className={classes.yellowCircle}>
                    {props.id}
                </div>
            )
        }
        if (props.color === 'open') {
            return (
                <div className={classes.openCircle}>
                    {props.id}
                </div>
            )
        }
    }

    function Square(props) {
        console.log("Square passes status to Circle: " + props.status);    // Status may be 'red' 'yellow' or 'open'
        return (
            <div
                key={props.id}
                className={classes.square}
            >
                <Circle id={props.id} color={props.status} />
            </div>
        )
    }

    function Column(props) {
        // Redesign to have numbers go up columns then right, not right then up. 

        const col = props.colNumber;
        console.log("Column recieved props.colNumber: " + props.colNumber);
        const colHeight = props.columnStatus.length;       // This var may be made global to remove the need for it to be in the props
        console.log("Column recieved props.columnStatus.length: " + props.columnStatus.length);
        const columnStatus = props.columnStatus.slice(); // An Array of length = colHeight
        console.log("Column recieved props.columnStatus.slice(): " + props.columnStatus.slice());

        let column = [];
        for (let row = 0; row < colHeight; row++) {
            const id = (col * colHeight + row);  // Both rows and cols, and now id's too, are 0-indexed
            let newSquare =
                <Square
                    key={id}
                    id={id}
                    status={columnStatus[row]}
                />;
            column = column.concat(newSquare);
        }
        return (
            <Box className={classes.column}
                onClick={() => props.handleClick(col)}
            >
                {column}
            </Box>
        )
    }

    // The Board takes data on 42 sqares and renders a collection of 7 cols. 
    function Board(props) {
        const copyOfBoard = props.boardStatus;
        console.log("Board recieved props.boardStatus: " + props.boardStatus.slice());
        const squaresPerRow = props.squaresPerRow;
        const colHeight = props.colHeight;
        // The Board is responsible for segmenting the [boardStatus] and passing each Column what it needs 
        let board = [];
        for (let col = 0; col < squaresPerRow; col++) {
            const startIndex = (col * colHeight);
            const endIndex = ((col + 1) * colHeight);

            let columnStatus = copyOfBoard.slice(startIndex, endIndex);
            console.log("Board made columnStatus = copyOfBoard.slice(startIndex, endIndex) from that: " + columnStatus);
            let newColumn =
                <Column
                    key={col}
                    colNumber={col}
                    // colHeight={colHeight}  // not needed as the col can determine from the .length of the [] it recieves
                    handleClick={props.handleClick}
                    columnStatus={columnStatus}
                />;
            board = board.concat(newColumn);
        }

        return (
            <Box className={classes.board}  >
                {board}
            </Box>
        )
    }
    function Info(props) {
        let status = props.gameStatus;
        console.log(status);
        let circle;
        let text;
        if (status === 'red') {
            circle = <Circle color={'red'} id={'1'} />;
            text = 'TO MOVE.';
        } else if (status === 'yellow') {
            circle = <Circle color={'yellow'} id={'1'} />;
            text = 'TO MOVE.';
        } else if (status === 'redWon') {
            circle = <Circle color={'red'} id={'1'} />;
            text = 'WINS!';
        } else if (status === 'yellowWon') {
            circle = <Circle color={'yellow'} id={'1'} />;
            text = 'WINS!';
        } else if (status === 'draw') {
            circle = <Circle color={'open'} id={'1'} />;
            text = 'Game Over. Draw.';
        } else {
            console.log('error in Info Component circle getter.')
        }

        let message =
            <div className={classes.statusDisplay}>
                <span className={classes.infoCircle}>
                    {circle}
                </span>
                <h1>{text}</h1>
            </div>
            ;

        return (
            <Box className={classes.info}>
                {message}
                <Button>
                    Undo Move
                </Button>
                <Button onClick={props.onClick}>
                    New Game
                </Button>
            </Box>
        )
    }

    function Game() {
        const colHeight = 6;
        const squaresPerRow = 7;
        const totalSquares = colHeight * squaresPerRow;

        //  Changing this to History and Adding the undo move button is a last priority
        // let [board, setBoard] = useState(Array(totalSquares).fill('open'));  // console.log(board);
        let [history, setHistory] = useState([{
            'board': Array(totalSquares).fill('open'),
            'gameStatus': 'red',  // May be assigned 'red' 'yellow' 'redWon' 'yellowWon' 'draw'
            'turnNumber': '0'
        }]); console.log("History initialized to: " + history);

        let [currentTurn, setCurrentTurn] = useState(0);


        const boardIds = generateBoardIds(colHeight, squaresPerRow);
        function generateBoardIds(colHeight, squaresPerRow) {
            let totalSquares = colHeight * squaresPerRow;
            let squares = Array(totalSquares);
            for (let index = 0; index < totalSquares; index++) {
                let col = getColById(index);
                let row = getRowById(index);
                let forwardSlash = getForwardSlashById(index);
                let backSlash = getBackSlashById(index);
                let ids = {
                    'squareId': index,
                    'col': col,
                    'row': row,
                    'forwardSlash': forwardSlash,
                    'backSlash': backSlash,
                }
                squares[index] = ids;
            }
            // squares.forEach((el) => {console.log(el)})
            return squares;
        }
        console.log("boardIds array of objects: " + boardIds);

        function handleClick(columnClicked) {
            // For now, handle click acts thru two side-effects, calls to setGameStatus and setBoard
            // Eventually it may act thru one call to setHistory. 
            // This is what would enable the "undo" button feature.  
            // There would then have to be separate handleColumnClick and handleUndoClick functions. 
            let turnInfo = history
            let copyOfGameStatus = gameStatus;  // console.log("copyOfGameStatus before handling click: " + copyOfGameStatus)
            console.log("preparing to slice copy of board for Turn Number: " + turnNumber);
            console.log("History: " + history[turnNumber]);
            let copyOfBoard = history[turnNumber];    // console.log("copyOfBoard before handling click: " + board)
            console.log("Board handleClick copied from history: " + copyOfBoard);
            const lowestOpenSquare = getLowestOpenSquare(columnClicked, copyOfBoard);

            if (gameIsAlreadyOver(copyOfGameStatus) || lowestOpenSquare === -1) {
                return; // Return early, no effect because either the column was full or the game already over.
            } // After this point we are assured gameStatus is 'red' or 'yellow'.

            const updatedBoard = getUpdatedBoard(copyOfBoard, copyOfGameStatus, lowestOpenSquare);
            console.log("updatedBoard after splice update: " + updatedBoard)
            setHistory(history.concat(updatedBoard));
            console.log("History array length: " + history.length);
            setTurnNumber(turnNumber++);
            console.log("Turn Number just set to: " + turnNumber);

            const updatedGameStatus = getUpdatedStatus(updatedBoard, copyOfGameStatus, lowestOpenSquare);
            setGameStatus(updatedGameStatus); // The infoPanel should auto re-render when setGameStatus is called. 

        }

        // HELPERS useful throughout Game's Primary methods such as handleClick().
        function getUpdatedStatus(updatedBoard, oldStatus, latestMove) {
            // 3 parts: check for draw, check for win, if neither then toggle turn. 
            let newStatus;

            let gameOverDraw = checkForDraw(updatedBoard);
            let lastMoveWon = checkForWin(updatedBoard, latestMove);

            if (gameOverDraw) {
                newStatus = "draw";
                return newStatus;
            }
            else if (lastMoveWon) {
                newStatus = (oldStatus + "Won");
                return newStatus;
            }
            else {
                newStatus = toggleTurnStatus(oldStatus)
                console.log("What's going on here???")
                return newStatus;
            }
        }
        function getUpdatedBoard(oldBoard, copyOfGameStatus, moveToAdd) {
            let remove = oldBoard.splice(moveToAdd, 1, copyOfGameStatus);
            return oldBoard;
        }


        // HELPERS for getNewStatus()
        function checkForDraw(board) {
            for (let i = 0; i < totalSquares; i++) {
                if (board[i] === 'open') {
                    return false;
                }
            }
            return true;
        }
        // TO DO the following method works but could probably be simplified a lot by combining the four specialized helpers contained in it into a single checkLineForWin method. 
        function checkForWin(board, latestMoveId) {
            let verticalWin = checkForVerticalWin(board, latestMoveId);
            let horizontalWin = checkForHorizontalWin(board, latestMoveId);
            let forwardSlashWin = checkForForwardSlashWin(board, latestMoveId);
            let backSlashWin = checkForBackSlashWin(board, latestMoveId);
            console.log("Vertical win found:        " + verticalWin);
            console.log("Horizontal win found:      " + horizontalWin);
            console.log("forwardSlashWin win found: " + forwardSlashWin);
            console.log("backSlashWin win found:    " + backSlashWin);
            if (verticalWin || horizontalWin || forwardSlashWin || backSlashWin) {
                return true;
            }
            return false;

            // HELPERS for the generic checkForWin() method that specialize in rows, cols, forward-slashes, or back-slashes.
            function checkForVerticalWin(board, latestMoveId) {
                const row = getRowById(latestMoveId);       // console.log("What row   : " + row);
                const col = getColById(latestMoveId);       // console.log("What column: " + col);
                const whoJustMoved = board[latestMoveId]; console.log("Who just moved from checkForVertWin: " + whoJustMoved);

                // If the move was made in one of the bottom 4 rows start search in row zero, otherwise start 3 below the move just made.
                // // If the move was made in one of the top 4 rows stop search in top row, otherwise stop 3 above the move just made.
                const colStatus = getColumnStatus(col, board);
                const startRow = (row - 3 < 0) ? 0 : row - 3;
                const endRow = (row + 3 >= colHeight) ? colHeight : row + 3;
                const partialColStatus = colStatus.slice(startRow, endRow + 1);
                console.log("Partial Column Status to check for win: " + partialColStatus)
                // Previously, the code now Encapsulated in checkStatusArrayForWin() was duplicated in each of the four specialized checkFor__Win() methods.
                if (arrayContainsWin(partialColStatus, whoJustMoved)) {
                    return true;
                }
                else {
                    return false;
                }
            }
            function checkForHorizontalWin(board, latestMoveId) {
                const row = getRowById(latestMoveId);       // console.log("What row   : " + row);
                const col = getColById(latestMoveId);       // console.log("What column: " + col);
                const whoJustMoved = board[latestMoveId];   // console.log("Who just moved: " + whoJustMoved);
                // The following line fixed a sneaky bug. The former version of getRowStaus only had the "row" parameter. without explicitly passing it the same copy of "board" that checkForHorizontalWin win is using it defaults to the not-yet-updated board that is in React useState
                const partialRowStatus = getRowStatus(row, board).slice(col - 3, col + 3);
                console.log("Partial Row Status to check for win: " + partialRowStatus)
                // Previously, the code now Encapsulated in checkStatusArrayForWin() was duplicated in each of the four specialized checkFor__Win() methods.
                if (arrayContainsWin(partialRowStatus, whoJustMoved)) {
                    return true;
                }
                else {
                    return false;
                }
            }
            function checkForForwardSlashWin(board, latestMoveId) {
                // It is helpful to think of each id as having not only a colId and a rowId but also a forwardSlashId and a backSlashId
                // On a classic 6x7 board there are 6 + 7 - 1 = 12 forwardSlashes and another 12 backSlashes   N = 12 in this case
                // forwardSlashId => colHeight - row - 1 + col      ranges from 0 to 11
                //    backSlashId => + row + col                    ranges from 0 to 11
                // Because the game is connect FOUR, the first 3 and last 3 of each set of slashes are not long enough to hold a win so they can be ignored. 
                // Thus ignore slashes with ( id < 3 || id > N - 4 )
                const whoJustMoved = board[latestMoveId];   // console.log("Who just moved: " + whoJustMoved);
                // const row = getRowById(latestMoveId);       // console.log("What row   : " + row);
                // const col = getColById(latestMoveId);       // console.log("What column: " + col);
                const slashId = getForwardSlashById(latestMoveId);   // colHeight - row - 1 + col
                // console.log("Forward Slash Id: " + slashId + "  (should be 0 thru 11.)")
                // The following line fixed a sneaky bug. The former version of getRowStaus only had the "row" parameter. without explicitly passing it the same copy of "board" that checkForHorizontalWin win is using it defaults to the not-yet-updated board that is in React useState
                const slashIds = getIdListByForwardSlashId(slashId)
                const slashStatus = getForwardSlashStatus(slashId, board);
                console.log("Forward Slash Status: " + slashStatus);

                const midIndex = slashIds.indexOf(latestMoveId);
                console.log("cut Forward Slash Status around midIndex: " + midIndex);
                const startIndex = (midIndex - 3 < 0) ? 0 : midIndex - 3;
                console.log("cut Forward Slash Status at startIndex: " + startIndex);
                const endIndex = (midIndex + 3 >= slashStatus.length) ? slashStatus.length : midIndex + 4;
                console.log("cut Forward Slash Status at endIndex: " + endIndex);
                const partialSlashStatus = slashStatus.slice(startIndex, endIndex);

                console.log("Partial Slash Status to check for win: " + partialSlashStatus)
                // Previously, the code now Encapsulated in checkStatusArrayForWin() was duplicated in each of the four specialized checkFor__Win() methods.
                if (arrayContainsWin(partialSlashStatus, whoJustMoved)) {
                    return true;
                }
                else {
                    return false;
                }
            }
            function checkForBackSlashWin(board, latestMoveId) {
                // See notes in method checkForForwardSlashWin.
                const whoJustMoved = board[latestMoveId];   // console.log("Who just moved: " + whoJustMoved);
                const myLineId = getBackSlashById(latestMoveId);   // colHeight - row - 1 + col
                const idList = getIdListByBackSlashId(myLineId)
                const statusList = getBackSlashStatus(myLineId, board);
                console.log("Back Slash squareId list: " + idList);
                console.log("Back Slash Status: " + statusList);

                const midIndex = idList.indexOf(latestMoveId);
                console.log("cut Back Slash Status around midIndex: " + midIndex);
                const startIndex = (midIndex - 3 < 0) ? 0 : midIndex - 3;
                console.log("cut Back Slash Status at startIndex: " + startIndex);
                const endIndex = (midIndex + 3 >= statusList.length) ? statusList.length : midIndex + 4;
                console.log("cut Back Slash Status at endIndex: " + endIndex);
                const partialStatus = statusList.slice(startIndex, endIndex);

                console.log("Partial Back Slash Status to check for win: " + partialStatus)
                // Previously, the code now Encapsulated in checkStatusArrayForWin() was duplicated in each of the four specialized checkFor__Win() methods.
                if (arrayContainsWin(partialStatus, whoJustMoved)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }

        function arrayContainsWin(statusArray, color) {  // this should work whether the 7 status values it recieves share a row, col, or slashId
            if (statusArray.length > 7) {
                console.error("arrayContainsWin() was passed an array of length greater than 7.");
            }
            if (color !== 'red' && color !== 'yellow') {
                console.error("arrayContainsWin() was not passed a color to look for.  Color: " + color);
            }

            let count = 0;
            for (let i = 0; i < statusArray.length; i++) {  // iterate thru at most 7 values from the clicked row looking for 4 in a row that match.
                if (statusArray[i] === color) {
                    count++;  // console.log("Count in a row so far: " + count)
                    if (count >= 4) {
                        return true;
                    }
                    continue;
                }
                if (statusArray[i] !== color) {
                    // console.log("Count reset due to: " + rowStatus[i])
                    count = 0;
                }
            }
        }

        // HELPERS to COPY the STATUS of all the board squares in a given row, col, forward-slash, or back-slash. 
        // Each is used by its respective checkForWin method

        function getRowStatus(row, board) {
            let statusList = [];
            let idList = getIdListByRow(row);
            idList.forEach(id => {
                statusList.push(board[id])
            });
            return statusList;
        }
        function getColumnStatus(col, board) {
            const colIds = getIdListByCol(col) // Originally this line was omitted and startIndex and endIndex were defined in two places. Though this method can achieve its goal in fewer lines by not calling getIdListByCol() and instead defining startIndex and endIndex inplace, I call getIdListByCol() anyway for the sake of symmetry and DRY code.
            // console.log('colIds found by getcolumnStatus: ' + colIds)
            const startIndex = colIds[0];
            // console.log('start index found by getcolumnStatus: ' + startIndex)
            const endIndex = colIds[colIds.length - 1];  // we take one away because there is 'undefined' at colIds.length.
            // console.log('end index found by getcolumnStatus: ' + endIndex)
            // this is simpler than the other getStatus methods because col ids are sequential.
            let columnStatus = board.slice(startIndex, endIndex + 1);  // Here we give that one back because the slice method is start inclusive and end exclusive. 
            // console.log('column status returned by getcolumnStatus: ' + columnStatus)
            return columnStatus;
        }
        function getForwardSlashStatus(slashId, board) {
            let statusList = [];
            // let idList = getIdList(slashId, 'forwardSlash'); //////////////////// 
            let idList = getIdListByForwardSlashId(slashId);
            idList.forEach(id => {
                statusList.push(board[id])
            });
            return statusList;
        }
        function getBackSlashStatus(slashId, board) {
            let statusList = [];
            let idList = getIdListByBackSlashId(slashId);
            idList.forEach(id => {
                statusList.push(board[id])
            });
            return statusList;
        }

        // HELPERS to get a LIST of the SQUAREIDS in a given row, col, forward-slash, or back-slash.
        // Each is used by its respective getStatus method
        function getIdList(lineId, lineType) {
            let list = [];
            boardIds.forEach((square) => {
                let type = lineType;
                if (square.lineType === lineId) {
                    list.push(square.squareId);
                }
            });
            // console.log("getIdList called on lineId: " + lineId + " and lineType: " + lineType + "returned: " + list)
            console.error("getIdList method id not complete or tested");
            return list;
        }
        function getIdListByRow(row) {
            const startIndex = row;
            const endIndex = startIndex + colHeight * (squaresPerRow - 1);
            let list = [];
            for (let i = 0; i < squaresPerRow; i++) {
                list.push(startIndex + i * colHeight);
            }
            return list;
            // PASSED TESTS
            // console.log("getIdListByRow(5) " + getIdListByRow(5))
            // console.log("getIdListByRow(4) " + getIdListByRow(4))
            // console.log("getIdListByRow(0) " + getIdListByRow(0))
        }
        function getIdListByCol(col) {
            const startIndex = (col * colHeight);
            const endIndex = startIndex + colHeight - 1;
            let list = [];
            for (let i = 0; i < colHeight; i++) {
                list.push(startIndex + i);
            }
            return list;
        }
        function getIdListByForwardSlashId(slashId) {
            let list = [];
            boardIds.forEach((square) => {
                if (square.forwardSlash === slashId) {
                    list.push(square.squareId);
                }
            });
            // console.log("getIdListByForwardSlashId called on slashId: " + slashId + " and returned: " + list)
            return list;
        }
        function getIdListByBackSlashId(slashId) {
            let list = [];
            boardIds.forEach((square) => {
                if (square.backSlash === slashId) {
                    list.push(square.squareId);
                }
            });
            // console.log("getIdListByBackSlashId called on slashId: " + slashId + " and returned: " + list)
            return list;
        }







        function getIdByRowCol(row, col) {
            return (col * colHeight + row);
        }
        function getRowById(id) {
            return (id % colHeight);
        }
        function getColById(id) {
            return (Math.floor(id / colHeight))
        }



        function getForwardSlashByRowCol(row, col) {
            return (colHeight - row - 1 + col);
        }
        function getForwardSlashById(squareId) {
            let row = getRowById(squareId);
            let col = getColById(squareId);
            return getForwardSlashByRowCol(row, col);
        }
        function getBackSlashByRowCol(row, col) {
            return (row + col);
        }
        function getBackSlashById(squareId) {
            let row = getRowById(squareId);
            let col = getColById(squareId);
            return getBackSlashByRowCol(row, col);
        }

        function getIdsInMyUpslash(id) {
            validateId(id);
            let idsInMyUpslash = [];
            let row = getRowById(id);
            let col = getColById(id);
            // Start from id and go down and left until you hit row 0 or col 0.
            let distToColZero = col // 1
            let distToRowZero = row // 5

            let jump = (row < col) ? row : col;
            // console.log("jump for id " + id + " found to be " + jump)
            let pointerRow = row - jump;
            // console.log("pointerRow for id " + id + " found to be " + pointerRow)
            let pointerCol = col - jump;
            // console.log("pointerCol for id " + id + " found to be " + pointerCol)
            while (pointerRow < squaresPerRow - 1 && pointerCol < colHeight - 1) {
                let pointerId = getIdByRowCol(pointerRow, pointerCol);
                idsInMyUpslash.push(pointerId);
                pointerRow++;
                pointerCol++;
            }


            // After debugging my way through all this business with pointers I have realized a much more elegant solution.
            // if the colHeight = 6 then squares in the same upslash are all congruent mod 7
            // and squares in the same downslash are all congruent mod 5.
            // This may be a starting key realization but it alone doesnot solve the problem because 
            // more than one upslash = x % 7 and more than one downslash = x % 5
            return idsInMyUpslash;
        }
        // console.log("getIdsInMyUpslash(11): " + getIdsInMyUpslash(11))
        // console.log("getIdsInMyUpslash(7): " + getIdsInMyUpslash(7))
        // console.log("getIdsInMyUpslash(39): " + getIdsInMyUpslash(39))
        // console.log("getIdsInMyUpslash(28): " + getIdsInMyUpslash(28))


        function toggleTurnStatus(oldStatus) {
            // console.log("toggleTurnStatus called with old status : " + oldStatus)
            let newStatus;
            if (oldStatus === 'red') {
                newStatus = 'yellow'
            }
            else if (oldStatus === 'yellow') {
                newStatus = 'red'
            }
            else {
                alert("Error: toggleTurnStatus was passed status other than 'red' or 'yellow'")
            }
            return newStatus;
        }
        function gameIsAlreadyOver(gameStatus) {
            if (gameStatus === 'redWon'
                || gameStatus === 'yellowWon'
                || gameStatus === 'draw') {
                return true;  // Return true because the game is over.
            }
            if (gameStatus === 'red'
                || gameStatus === 'yellow') {
                return false;
            }
            else {
                alert("Error, invalid gameStatus passed to gameIsAlreadyOver." + gameStatus)
                console.log("Error, invalid gameStatus passed to gameIsAlreadyOver." + gameStatus)
                return false;
            }

        }
        function getLowestOpenSquare(columnId, board) {
            const status = getColumnStatus(columnId, board);
            // console.log("status copied by getLowestOpenSquare: " + status)
            // status should be an array of length squaresPerCol
            // each entry in status should be 'red' 'yellow' or 'open'
            let lowestOpenRow = status.indexOf('open');
            // console.log("Lowest 'open' row in column " + columnId + " is row " + lowestOpenRow);

            // Return early, -1 indicating "there is no valid lowest square in requested column"
            if (lowestOpenRow === -1) {
                return -1;
            }
            let lowestOpenSquare = lowestOpenRow + (columnId * colHeight);
            // console.log("Lowest 'open' square in column " + columnId + " is at index " + lowestOpenSquare + " in the board array");

            return lowestOpenSquare;
        }
        function validateId(id) {
            if (id >= 0 && id < totalSquares) {
                return;
            }
            else {
                throw ("Error: Invalid Square Id Passed!")
            }
        }

        function newGame() {
            let cleanBoard = Array(totalSquares).fill('open');
            setHistory([cleanBoard]);
            console.log("History array length: " + history.length);
            setGameStatus('red');
        }
        function undoMove() {
            let prevTurn = currentTurn - 1
            setCurrentTurn(prevTurn);
            console.log("History array length unchanged by undo move: " + history.length);
            // setGameStatus((prevTurn % 2 === 0) ? 'red' : 'yellow');
        }


        return (
            <Box className={classes.game}>
                <Board
                    squaresPerRow={squaresPerRow}
                    colHeight={colHeight}
                    boardStatus={history[currentTurn]}
                    handleClick={handleClick}
                />
                <Info
                    turnNumber={currentTurn}
                    gameStatus={history[currentTurn].gameStatus}
                    newGameClick={newGame}
                    undoMoveClick={undoMove}
                >
                </Info>
            </Box>
        )
    }

    return (
        <Game
            key={1}
        />
    )
}
export default ConnectFourGame;