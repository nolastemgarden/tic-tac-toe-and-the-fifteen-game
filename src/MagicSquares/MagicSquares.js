import React from 'react';

// My Components


// MUI  components
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'



// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({

})


export default function MagicSquares() {
    const classes = useStyles();

    return (
        <div className={classes.root} >
            The Magic Squares Page
        </div>
    );
}
