import React from 'react';
import logo from './logo.svg';
import './App.css';

// My Custom Components
import Game from './components/TicTacToeGame'


// MUI compound components
import Tabs from './components/Tabs'

// MUI basic components
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'




import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    root: {
        height: '100vh',
        width: '100vw',
        boxSizing: 'border-box',
        backgroundColor: '#BBFFFF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        border: 'solid red 1px',
        height: '90vmin',
        width: '75vmin',
        borderRadius: '2vmin',
        overflow: 'hidden'
    },
    
    stemGardenLink: {

    },
    tabArea: {
        width: 'inherit'
    },
    boardArea: {
        backgroundColor: 'blue',
        width: '100%',
        height: '100%'
    }
})


export default function App() {
    const classes = useStyles();
  
    return (
        <div className={classes.root} >
            <div className={classes.container} >
                {/* <AppBar position="static">
                    <Typography className={classes.title} variant="h6" noWrap >
                        Connect Four
                    </Typography>
                </AppBar> */}
                <Tabs className={classes.tabArea} />
            </div>
            
            
            
            {/* <div className={classes.titleArea}>
                <span className={classes.title}>
                    Play Connect Four
                    </span>
                <span className={classes.stemGardenLink}>
                    by the Nola Stem Garden
                    </span>
            </div> */}
            
        {/* <Game /> */}
        </div>
    );
}