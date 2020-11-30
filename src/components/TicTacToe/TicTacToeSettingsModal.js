import React from 'react';

// MUI Components
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// MUI Icons
import SettingsIcon from '@material-ui/icons/Settings';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    button: {
        // border: 'solid red 1px',
        width: '100%',
        // height: '100%',
        height: '2.5rem',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 'min(18px, 1.0rem)',
        
    },
    buttonIcon: {
        marginRight: '1vmin',
        fontSize: 'larger'
        // fontSize: 'min(max(0.7rem, 3vmin), 22px)',
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
        height: 'min(100vw, 80vh)',
        maxHeight: '950px',
        width: 'min(60vh, 75vw)',
        maxWidth: '675px',
        display: 'flex',
        flexDirection: 'column'
    },
    switchBox: {
        // border: 'solid red 1px',
        display: 'flex',
        alignItems: 'center',

    },
    switchLabel: {
        // fontSize: '2.2vmin',
        fontSize: 'min(max(2rem, 4vmin), 30px)',
        width: '60%'

    },
    heading: {
        fontSize: 'min(max(1rem, 4vmin), 30px)',
        fontWeight: 'bold',
        marginBlockEnd: '0',
        marginBlockStart: '1rem',
    },
    body: {
        // fontSize: 'theme.typography.pxToRem(20)',
        fontSize: '1.2rem',
        fontWeight: 'regular',
        marginBlockEnd: '0',
        marginBlockStart: '0',
    }
}));

export default function SettingsModal(props) {
    const classes = useStyles();
    const showMoves = props.showMoves
    const showCommentary = props.showCommentary
    const toggleShowMovesSwitch = props.toggleShowMovesSwitch
    const toggleShowCommentarySwitch = props.toggleShowCommentarySwitch

    // Modal Open & Close 
    const [open, setOpen] = React.useState(false);
    const openSettingsModal = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const showMovesSwitch = (
        <React.Fragment>
            <Box className={classes.switchBox}>
                <Typography className={classes.switchLabel}>
                    Show Moves
                </Typography>
                <Switch
                    checked={showMoves}
                    onChange={toggleShowMovesSwitch}
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </Box>
            <DialogContentText className={classes.body} >
                Show whether each possible move leads to a win, loss, or draw with color coded hints on the board.
            </DialogContentText>
        </React.Fragment>
    );

    const showCommentarySwitch = (
        <React.Fragment>
            <Box className={classes.switchBox}>
                <Typography className={classes.switchLabel}>
                    Show Commentary
                </Typography>
                <Switch
                    checked={showCommentary}
                    onChange={toggleShowCommentarySwitch}
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </Box>
            <DialogContentText className={classes.body} >
                Show a verbal description of the position and the coach's advice about what to look out for.
            </DialogContentText>
        </React.Fragment>
        
        
    );

    return (
        <div className={classes.root}>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={openSettingsModal}
                aria-controls="simple-menu"
                aria-haspopup="true" 
            >
                <SettingsIcon className={classes.buttonIcon} />
                Settings
            </Button>
            
            
            <Dialog 
                open={open} 
                onClose={handleClose} 
                aria-labelledby="form-dialog-title"
            >
                
                
                <DialogContent>
                    <div className={classes.heading} >
                        Settings
                    </div>
                    {showCommentarySwitch}
                    
                    {showMovesSwitch}
                    
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleClose} 
                        color="primary"
                        variant="outlined"
                        className={classes.body}
                    >
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


