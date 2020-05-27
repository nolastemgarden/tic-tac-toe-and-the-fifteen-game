import React, { useState } from 'react';

// Custom Components
import HelpModal from "./HelpModal";

// MUI Components
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';



import UndoIcon from '@material-ui/icons/Undo';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    panel: {
        boxSizing: 'border-box',
        margin: '3vmin',
        width: '68vmin',
        height: '28vmin',
        padding: '2vmin',
        
        display: 'flex',
        flexDirection: 'row',
        

    },
    infoArea: {
        border: 'solid red 1px',
        width: '70%',
        fontSize: '2rem',
        
    },
    buttonArea: {
        border: 'solid red 1px',

        width: '30%',
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'space-around',
        alignItems: 'center',

        

    },
    buttonBox: {
        // border: 'solid blue 1px',
        display: 'flex',
        width: '80%',
        fontSize: '1rem',
    },
    button: {
        border: 'solid red 1px',

        width: '90%',
        fontSize: '1rem',
    },
    
    switchLabel: {
        lineHeight: '1rem'
    },
    status: {
        fontSize: '2.4rem',
        fontWeight: 'bold'
    },
    commentary: {
        fontSize: '1.2rem',
    },
}));

export default function Panel(props) {
    const classes = useStyles();

    
    let status = props.status;
    
    const undoButton = (
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => props.handleUndoButtonClick()}
        >
            <UndoIcon />
            Undo
        </Button>
    );

    const helpButton = (
        <div
            className={classes.button}
        >
            <HelpModal />
        </div>
            
        
    );

    const showMovesSwitch = (
        <Box className={classes.buttonBox}>
            <Typography className={classes.switchLabel}>
                Show Moves
            </Typography>
            <Switch
                checked={props.showMoves}
                onChange={props.toggleShowMovesSwitch}
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </Box>
    );

    const showCommentarySwitch = (
        <Switch
            checked={props.showCommentary}
            onChange={props.toggleShowCommentarySwitch}
            color="primary"
            name="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}
        />
    );

    const newGameButton = (
        <div
            className={classes.button}
        >
            <HelpModal />
        </div>


    );

    const settingsButton = (
        <div
            className={classes.button}
        >
            <HelpModal />
        </div>


    );


    return (
        <Paper className={classes.panel}>
            <Box className={classes.infoArea}> 
                <Typography className={classes.status} noWrap >
                    {status}
                </Typography>
                <Typography className={classes.commentary}  >
                    Commentary would show up here if turned on.
                </Typography>
                
                
            </Box>
            
            
            <Box className={classes.buttonArea}>
                
                {undoButton}
                
                {newGameButton}

                {helpButton}
                
                {settingsButton}

                {/* {showMovesSwitch} */}
                
                {/* {showCommentarySwitch} */}
            </Box>
                
             
        </Paper>
    )
}


