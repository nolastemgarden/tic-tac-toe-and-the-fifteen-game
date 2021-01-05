import React from 'react';


import {
    createMuiTheme,
    makeStyles,
    responsiveFontSizes,
} from '@material-ui/core/styles';



import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
// import { Button, createStyles } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#669944',
            main: '#2e6b12',
            dark: '#004000',
            contrastText: '#FFFFFF'
        },
        secondary: {
            light: '#FFFFF',
            main: '#669944',
            dark: '#777777',
            contrastText: '#FFFFFF'
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#000000'
        }
    },
    status: {
        danger: 'orange',
    },
    shape: {
        borderRadius: 8,
    },
    spacing: 8,

});


export default responsiveFontSizes(theme);

