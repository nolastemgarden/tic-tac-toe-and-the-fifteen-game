import React from 'react';

// MUI Components
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';



import TextField from '@material-ui/core/TextField';
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
        height: '100%',
        fontSize: '0.8rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonIcon: {
        marginRight: '0.6rem'
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

export default function SettingsModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const openSettingsModal = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                <DialogTitle id="form-dialog-title">
                    Settings
                </DialogTitle>
                
                <DialogContent>
                    <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send updates
                            occasionally.
                    </DialogContentText>
                    {showMovesSwitch}
                    {showCommentarySwitch}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleClose} 
                        color="primary"
                        variant="outlined"
                    >
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


