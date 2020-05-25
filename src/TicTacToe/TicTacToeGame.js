import React, {useState} from 'react';

// My Components
import Board from "./Board";


// MUI  components
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';


// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: '#4AC9FD'
    },
    boardArea: {
        backgroundColor: '#bbffff',
        height: '50vmin',
        width: 'calc(100% - 3vmin)',
        display: 'flex',
        justifyContent: 'center',
    },
    panelArea: {
        // border: 'solid blue 1px',
        // backgroundColor: '#4AC9FD',
        boxSizing: 'border-box',
        width: '100%',
        height: '32vmin',
        padding: '1vmin',
        
        display: 'flex',
        flexDirection: 'row',
        
    },
    panel: {
        
        display: 'flex',
        flexDirection: 'row',

    },
    history: {
        border: 'solid red 1px',
        width: '20vmin',
        // height: '100%',
    },
    status: {
        border: 'solid red 1px',
        width: '25vmin',
        height: '100%',
    },
    
    controls: {

    },
    info: {
        border: 'solid red 1px',
        width: '25vmin',
        height: '100%',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


export default function TicTacToeGame() {
    const classes = useStyles();

    // history is an array. Indexes 0 thru 8 represent turn 0.  Indexes 9 thru 17 represent turn 1. this array will max out at length 90 = 10 'turns' x 9 squares
    // history is an array of up to 9 elements, representing the 9 moves to be made.
    // let turnNumber = history.length
    // the value to put into each index of history when that move number is made is the squareId claimed on that move. 
    // Board has a little more work to do translating this than the old design but it save the 'undo' feature lots of complexity
     
    let [history, setHistory] = useState([]); 
    console.log("History initialized to: " + history);

    
    // The board data to render is a the latest entry in history.  We will have an 'undo' but not a 'redo' button
    const boardData = getBoardData(history);
    function getBoardData(history) {
        // Start with an array representing a board of NINE empty squares ...
        let data = Array(9).fill('');
        // For each move in the history ...
        for ( let i = 0; i < history.length; i++ ) {
            // If it was X's turn set the index in data indicated here by history
            if ( i % 2 === 0 ) {
                data.splice(history[i], 1, 'x')
            }
            // If it was O's turn set the index in data indicated here by history
            else if (i % 2 === 1) {
                data.splice(history[i], 1, 'o')
            }
        }
        return data;
    }
    
    
    const panelData = getPanelData(history);
    function getPanelData(history) {
        // List moves according to row, col in table of moves made
        // Check for a win
        // Check for a draw
        // Panel has control buttons that must recieve clickHandlers which are defined in the <Game> and passed as props to the panel then the control section 
        // Game must genterate and pass in data for the Interactive info/hint panel
        
        return {};
    }
    

    return (
        <div className={classes.root} >
            <div className={classes.boardArea} >
                <Board 
                    data={boardData} 
                    handleSquareClick={handleSquareClick}
                />
            </div>
            <div className={classes.panelArea}>
                <Panel data={panelData}  />
            </div>
            
        </div>
    );

    
    function handleSquareClick(squareClicked) {
        // If squareClicked is already claimed in the history, return early w/o effects
        if (-1 !== history.indexOf(squareClicked)) {
            console.log(`returning early with no effect. Clicked Square is already claimed.`)
            return;
        }
        // If gameOver already return early w/o effects (this will only fire in case of a Win, the above squareAlreadyClicked will cause a return in case of a filled board && no 3-in-a-rows)
        if (gameHasBeenWon(history)) {
            console.log(`returning early with no effect. Game has already been won!`)
            return;
        }
        
        // If we reach this point the clicked square is open and the game is not over yet ... 
        setHistory(history.concat(squareClicked));
        // NOTE handleSquareClick Does not pass anything to the board, 
        // it calls setHistory and use of that hook setFunction tells React It needs to re-render
        // all components that depend on the state "history" 
        // ??? OR do I need to add those re-renders explicitly here? 
    }

    // This array's indicies correspond to the squareIds 0 thru 8.
    // Its elements correspond to the Magic Square Values of those board positions.
    const magicSquare = [2, 9, 4, 7, 5, 3, 6, 1, 8];
    // TODO For now this method always returns false
    function gameHasBeenWon(history) {
        // The game CANNOT be won before 5 moves have been made.
        if (history.length < 5) {
            return false;
        }


        // TODO
        else return true;

        // Partition the data into X and O claimed
        let xSquareIds = history.filter((element, index) => index % 2 === 0);
        let oSquareIds = history.filter((element, index) => index % 2 === 1);

        // Refer to Magic Square to convert squareIds arrays into Point-value arrays
        let xPoints = magicSquare.filter((squareId) => xSquareIds.contains(squareId));
        let oPoints = magicSquare.filter((squareId) => oSquareIds.contains(squareId));
        
        // To win you must have 3 squares claimed
        
    }

}











function Panel(props) {
    const classes = useStyles();
    return (
        <div className={classes.panel}>
            <div className={classes.history}>
                Game History
            </div>
            <div className={classes.status}>
                Status
            </div>
            <GameRulesModal />

        </div>
    )
}


function GameRulesModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <HelpOutlineIcon
                className={classes.icon}
                onClick={handleOpen}
                aria-controls="simple-menu"
                aria-haspopup="true"
            />

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Transition modal</h2>
                        <p id="transition-modal-description">react-transition-group animates me.</p>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
