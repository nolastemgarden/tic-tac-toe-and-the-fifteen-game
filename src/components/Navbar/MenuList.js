import React from 'react';

// React ROUTER
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

// MATERIAL-UI COMPONENTS
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

// ICONS 

const useStyles = makeStyles(theme => ({
    list: {
        width: 'inherit',
        // backgroundColor: theme.palette.primary.dark
        backgroundColor: 'inherit'

    },
    listItem: {
        color: theme.palette.common.white,
    },
    icon: {
        width: '45px',
        color: theme.palette.common.white,
        alignContent: 'center',
        justifyContent: 'center',
    }
}));

export default function TeachingServicesList() {
    const classes = useStyles();
    
    return (
        <React.Fragment>
            <ListItem
                key={'home'}
                className={classes.listItem}
                button
                component={RouterLink}
                to='/'
            >
                <Icon className={"fas fa-home fa-2x"}
                    classes={{ root: classes.icon }}
                />
                <ListItemText
                    primary={'STEM Garden Home'}
                    primaryTypographyProps={{ variant: 'h5' }}
                />
            </ListItem>

            <ListItem
                key={'welcome'}
                className={classes.listItem}
                button
                component={RouterLink}
                to='/'
            >
                <Icon className={"fas fa-home fa-2x"}
                    classes={{ root: classes.icon }}
                />
                <ListItemText
                    primary={'Welcome'}
                    primaryTypographyProps={{ variant: 'h5' }}
                />
            </ListItem>

            <ListItem
                key={'play tic-tac-toe'}
                className={classes.listItem}
                button
                component={RouterLink}
                to={{
                    pathname: '/play_tic_tac_toe',
                }}
            >
                <Icon className={"far fa-play-circle fa-2x"}
                    classes={{ root: classes.icon }}
                />
                <ListItemText
                    primary={'Play Tic-Tac-Toe'}
                    primaryTypographyProps={{ variant: 'h5' }}
                />
            </ListItem>

            

            <ListItem
                key={'play the fifteen-game'}
                className={classes.listItem}
                button
                component={RouterLink}
                to={{
                    pathname: '/fifteen_game',
                }}
            >
                <Icon className={"far fa-play-circle fa-2x"}
                    classes={{ root: classes.icon }}
                />
                <ListItemText
                    primary={'Play the 15 Game'}
                    primaryTypographyProps={{ variant: 'h5' }}
                />
            </ListItem>

            <ListItem
                key={'learn tic-tac-toe'}
                className={classes.listItem}
                button
                component={RouterLink}
                to={{
                    pathname: '/learn_tic_tac_toe',
                }}
            >
                <Icon className={"fas fa-question fa-2x"}
                    classes={{ root: classes.icon }}
                />
                <ListItemText
                    primary={'Learn Tic-Tac-Toe Strategy'}
                    primaryTypographyProps={{ variant: 'h5' }}
                />
            </ListItem>

            <ListItem
                key={'learn about magic squares'}
                className={classes.listItem}
                button
                component={RouterLink}
                to={{
                    pathname: '/magic_squares',
                }}
            >
                <Icon className={"fas fa-question fa-2x"}
                    classes={{ root: classes.icon }}
                />
                <ListItemText
                    primary={'Learn about Magic Squares'}
                    primaryTypographyProps={{ variant: 'h5' }}
                />
            </ListItem>

        </React.Fragment>
    );
}