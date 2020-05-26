import React, { useState } from 'react';

// Custom Components
import HowToPlayModal from "./HowToPlayModal";

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
        // border: 'solid red 1px',
        width: '30%',
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'space-around',
        alignItems: 'center',

        

    },
    button: {
        width: '100%'
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
            startIcon={<UndoIcon />}
            onClick={() => props.handleUndoButtonClick()}

        >
            Undo Move
        </Button>
    );

    const showMovesSwitch = (
        <Switch
            checked={props.showMoves}
            onChange={props.toggleShowMovesSwitch}
            color="primary"
            name="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}
        />

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
                
                <HowToPlayModal />

                {showMovesSwitch}
                
                {showCommentarySwitch}
            </Box>
                
             
        </Paper>
    )
}


