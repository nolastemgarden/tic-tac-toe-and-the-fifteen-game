import React, { useState } from 'react';

// Custom Components
import HowToPlayModal from "./HowToPlayModal";

// MUI Components
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';



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
        width: '65%',
        fontSize: '2rem',
        
    },
    buttonArea: {
        border: 'solid red 1px',
        width: '35%',
        

    },
    status: {
        fontSize: '2rem',
    },
    commentary: {
        fontSize: '1.2rem',
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

export default function Panel(props) {
    const classes = useStyles();

    
    let status = props.status;
    // if ()

    // if game is over then display who won or if drawn


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
                
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<UndoIcon />}
                    onClick={() => props.handleUndoButtonClick()}

                >
                    Undo Move
            </Button>
            <HowToPlayModal />
            </Box>
                
             
        </Paper>
    )
}


