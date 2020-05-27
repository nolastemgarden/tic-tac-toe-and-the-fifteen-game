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
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuIcon from '@material-ui/icons/Menu';
// import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'




import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
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
        height: '90vmin',
        width: '75vmin',
        borderRadius: '2vmin',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },
    footer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        height: '5vmin',
        width: '75vmin',
        alignItems: 'bottom',
    },
    footerText: {
        paddingTop: '0.7vmin',
        paddingRight: '2.5vmin',
        color: 'navy',
        fontSize: '1.6vmin'
    },
    // title: {
    //     flexGrow: '1',
    //     marginLeft: '1rem',
    // },
    
    
})


export default function App() {
    const classes = useStyles();
    const [pageTitle, setPageTitle] = React.useState("Welcome");
  
    // Similar to componentDidMount and componentDidUpdate:
    React.useEffect(() => {
        // Update the document title using the browser API
        // document.title = `You clicked ${count} times`;

    });

    return (
        <div className={classes.root} >
            <div className={classes.container} >
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
            </div>
        </div>
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

