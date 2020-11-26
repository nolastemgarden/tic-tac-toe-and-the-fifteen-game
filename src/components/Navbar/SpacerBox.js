import React from 'react';

// MY components
// MY images
// MUI Imports
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
// import classes from '*.module.css';

const useStyles = makeStyles((theme) => ({
    mobileSpacerBox: {
        // border: 'solid red 1px',
        padding: '1.70rem'
    },
    desktopSpacerBox: {
        // border: 'solid red 1px',
        padding: '2.5rem'
    }

}));

export default function SpacerBox(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Box className={classes.mobileSpacerBox}
                display={{ xs: 'block', md: 'none' }}
            />
                
            
            <Box className={classes.desktopSpacerBox}
                display={{ xs: 'none', md: 'block' }}
            />
               
        </React.Fragment>
    )
}


