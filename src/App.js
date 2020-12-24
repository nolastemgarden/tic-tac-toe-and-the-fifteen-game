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
import Navbar from './components/Navbar/Navbar';
import WelcomePage from "./pages/WelcomePage";
import TicTacToeGame from './components/TicTacToe/TicTacToeGame';
import FifteenGame from './components/FifteenGame/FifteenGame';
import MagicSquares from "./pages/MagicSquares";
import StrategyPage from "./pages/StrategyPage";

// MUI  components
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// THEMING
import theme from "./theme";
import {
    makeStyles,
    ThemeProvider,
} from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100vw',
        backgroundColor: theme.palette.common.black,

        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'stretch',
        overflowY: 'scroll',
        overflowX: 'hidden',

    },
    container: {
        // maxWidth='md' --> max-width: 960px;
        // border: 'solid red 1px',
        backgroundColor: theme.palette.common.black,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    
}))


export default function App() {
    const classes = useStyles();
    const [pageTitle, setPageTitle] = React.useState("Welcome");
  
    return (
        <React.Fragment>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Box className={classes.root} >
                    {/* <Container className={classes.container} maxWidth='md' disableGutters>   */}
                        <Router>
                            <Switch>
                                <Route exact path="/">
                                    <Navbar pageTitle={"Welcome"} />
                                    <WelcomePage />
                                </Route>

                                <Route path="/play_tic_tac_toe">
                                    <Navbar pageTitle={"Play Tic Tac Toe"} />
                                    <TicTacToeGame 
                                        mode='play'
                                    />
                                </Route>

                                <Route path="/learn_tic_tac_toe">
                                    <Navbar pageTitle={"Learn Tic Tac Toe"} />
                                    <TicTacToeGame
                                        mode='learn'
                                    />
                                </Route>    

                                <Route path="/fifteen_game">
                                    <Navbar pageTitle={"Play the Fifteen Game"} />
                                    <FifteenGame />
                                </Route>

                                <Route path="/magic_squares">
                                    <Navbar pageTitle={"Learn about Magic Squares"} />
                                    <MagicSquares />
                                </Route>

                                <Route path="/strategy">
                                    <Navbar pageTitle={"Learn Tic Tac Toe Strategy"} />
                                    <StrategyPage />
                                </Route>
                            </Switch>
                        </Router>
                    {/* </Container> */}
                </Box>
            </ThemeProvider>
        </React.Fragment>
    );
}

