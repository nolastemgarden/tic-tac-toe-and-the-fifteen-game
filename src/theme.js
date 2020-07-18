import React from 'react';

import {
    createMuiTheme,
    responsiveFontSizes,
} from '@material-ui/core/styles';



import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
// import { Button, createStyles } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#b0ffff',
            main: '#4AC9FD',
            dark: '#1133f4',
            // contrastText: '#fff'
        }
    },
    status: {
        danger: 'orange',
    },
    shape: {
        borderRadius: 8,
    }

});

export default responsiveFontSizes(theme);
// export default theme;