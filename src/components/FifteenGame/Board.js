import React from 'react';

// My Components
import NumberCard from "../NumberCard";

// MUI  components
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';


// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    board: {
        // border: 'solid green 1px',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',  
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0.5rem',

        // margin: '1rem 0.0rem',
    },
    row: {
        // border: 'solid blue 1px',
        width: '100%',
        height: '50%',

        display: 'flex',
        flexWrap: 'no-wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    numCard: {
        margin: '0.3rem',
        width: '15%',
        maxWidth: '120px',
        height: 'calc(100% - 0.6rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '500%',
        fontWeight: 'bold',
        color: theme.palette.common.black,
    },
    playerOne: {
        backgroundColor: '#3f51b5',
        color: theme.palette.common.white,

    },
    playerTwo: {
        backgroundColor: '#4AC9FD',

    },
}));



export default function Board(props) {
    const classes = useStyles();
    const handleCardClick = props.handleCardClick
    const boardStatus = props.boardStatus;

    let topRowData = boardStatus.slice(1, 6);
    let bottomRowData = boardStatus.slice(6, 10);
    
    
    return (
        <Box className={classes.board}>
            <Row
                key='0'
                rowId={0}
                data={topRowData} 
                handleCardClick={handleCardClick}
            />
            <Row
                key='1'
                rowId={1}
                data={bottomRowData}
                handleCardClick={handleCardClick}
            />
        </Box>
    )
}

function Row(props) {
    const classes = useStyles();
    const rowId = props.rowId
    const data = props.data
    const handleCardClick = props.handleCardClick

    let cards = [];
    data.forEach((status, index) => {
        let cardId = 5 * rowId + index + 1;
        let newCard =
            <Card
                key={cardId}
                cardId={cardId}
                status={status}
                handleClick={handleCardClick}
            />;
        cards = cards.concat(newCard);
    })
    
    return (
        <Box className={classes.row}>
            {cards}
        </Box>
    )
}

function Card(props) {
    const classes = useStyles();
    const cardId = props.cardId
    const status = props.status
    const handleClick = props.handleClick

    let className;
    switch (status) {
        case 'playerOne':
            className = `${classes.numCard} ${classes.playerOne} `
            break;
        case 'playerTwo':
            className = `${classes.numCard} ${classes.playerTwo} `
            break;
        case 'unclaimed':
            className = `${classes.numCard} `
            break;
        default:
            throw console.error("number card passed invalid status");
    } 

    return (
        <Paper
            elevation={4}
            className={className}
            onClick={() => handleClick(cardId)}
        >
            {cardId}
        </Paper>
    )
}