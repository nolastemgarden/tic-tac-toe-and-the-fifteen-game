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
import WelcomePage from "./components/WelcomePage";
import TicTacToeGame from './TicTacToe/TicTacToeGame';
import FifteenGame from './FifteenGame/FifteenGame';
import MagicSquares from "./MagicSquares/MagicSquares";
import StrategyPage from "./pages/StrategyPage";

// MUI  components
// import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuIcon from '@material-ui/icons/Menu';
// import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography';

// THEMING
import theme from "./theme";
import {
    makeStyles,
    ThemeProvider
} from '@material-ui/core/styles';


// let availHeight = window.screen.availHeight;
// let availWidth = window.screen.availWidth;

// let containerHeight;
// let containerWidth;

// if (availHeight * 3 / 4 < availWidth) {
//     containerHeight = '100vh';
//     containerWidth = '75vh';
// } else if (availHeight * 3 / 4 > availWidth) {
//     console.log(`orientation === "portrait"`);
//     containerWidth = availWidth;
//     containerHeight = availWidth * 4 / 3;
// } else {
//     console.log("The availHeight and availWidth API isn't supported in this browser :(");
// }


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100vw',
        // boxSizing: 'border-box',
        backgroundColor: '#ccFFFF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    container: {
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
        border: 'solid red 1px',
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

