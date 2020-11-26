import React from 'react';

// React ROUTER
import { Link as RouterLink } from "react-router-dom";



import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

// MATERIAL-UI COMPONENTS

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

// ICONS
import SchoolIcon from '@material-ui/icons/School';
import EcoIcon from '@material-ui/icons/Eco';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles(theme => ({
    list: {
        width: 280,
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

export default function GardenNavigationList() {
    const classes = useStyles();

    return (
        <React.Fragment>
            
            <ListItem
                key={'our_story'}
                className={classes.listItem}
                button
                component={RouterLink}
                to='/our_story'
            >
                <Icon className={"fas fa-leaf fa-2x"}
                    classes={{ root: classes.icon }}
                />
                <ListItemText
                    primary={'Our Story'}
                    primaryTypographyProps={{ variant: 'h5' }}
                />
            </ListItem>

            <ListItem
                key={'gallery'}
                className={classes.listItem}
                button
                component={RouterLink}
                to='/photo_gallery'
            >
                <Icon className="fas fa-camera fa-2x"
                    classes={{ root: classes.icon }}
                />
                <ListItemText 
                    primary={'Photo Gallery'} 
                    primaryTypographyProps={{variant: 'h5'}}
                />
            </ListItem>

            <ListItem
                key={'for_sale'}
                className={classes.listItem}
                button
                component={RouterLink}
                to='/produce_for_sale'
            >
                <Icon className="fas fa-carrot fa-2x"
                    classes={{ root: classes.icon }}
                />
                <ListItemText
                    primary={'Produce for Sale'}
                    primaryTypographyProps={{ variant: 'h5' }}
                />
            </ListItem>


        </React.Fragment>
    );
}