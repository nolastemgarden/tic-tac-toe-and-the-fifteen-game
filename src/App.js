import React from 'react';
import {
    HashRouter as Router,
    Link as RouterLink,
    Route,
    Switch
} from "react-router-dom";

import logo from './logo.svg';
import './App.css';

// My Components & Pages
import Navbar from './components/Navbar';
import WelcomePage from "./components/pages/WelcomePage";
import TicTacToeGame from './components/games/TicTacToeGame';
import FifteenGame from './components/games/FifteenGame';
import MagicSquares from "./components/pages/MagicSquares";
import StrategyPage from "./components/pages/StrategyPage";

// MUI  components
// import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// THEMING
import theme from "./theme";
import {
    makeStyles,
    ThemeProvider
} from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100vw',
        minHeight: '675px',
        minWidth: '500px',


        // boxSizing: 'border-box',
        backgroundColor: '#ccFFFF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',

    },
    container: {
        // border: 'solid red 1px',
        backgroundColor: '#4AC9FD',
        height: 'min(133vw, 100vh)',
        maxHeight: '1200px',
        width: 'min(75vh, 100vw)',
        maxWidth: '900px',
        // height: containerHeight,
        // width: containerWidth,
        borderRadius: '2vmin',
        overflow: 'hidden',
        
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    
    footer: {
        // border: 'solid red 1px',
        display: 'flex',
        flexDirection: 'row-reverse',
        height: '3%',
        width: '100%',
        alignItems: 'bottom',
    },
    footerText: {
        paddingTop: '0.7vmin',
        paddingRight: '2.5vmin',
        color: 'navy',
        fontSize: '1.6vmin',
    }
}))


export default function App() {
    const classes = useStyles();
    const [pageTitle, setPageTitle] = React.useState("Welcome");
  
    return (
        <Box className={classes.root} >
            <Box className={classes.container} >
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Navbar pageTitle={"Welcome"} />
                            <WelcomePage />
                        </Route>

                        <Route path="/tic-tac-toe">
                            <Navbar pageTitle={"Play Tic Tac Toe"} />
                            <TicTacToeGame />
                        </Route>

                        <Route path="/fifteen-game">
                            <Navbar pageTitle={"Play the Fifteen Game"} />
                            <FifteenGame />
                        </Route>

                        <Route path="/magic-squares">
                            <Navbar pageTitle={"Learn about Magic Squares"} />
                            <MagicSquares />
                        </Route>

                        <Route path="/strategy">
                            <Navbar pageTitle={"Learn Tic Tac Toe Strategy"} />
                            <StrategyPage />
                        </Route>
                    </Switch>
                </Router>
                <Footer />
            </Box>
        </Box>
    );
}

function Footer() {
    const classes = useStyles();

    return (
        <Box className={classes.footer} >
            <Typography className={classes.footerText} noWrap >
                Produced by the Nola Stem Garden
            </Typography>
        </Box>
    );
}

