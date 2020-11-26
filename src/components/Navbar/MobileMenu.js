import React from 'react';

// MY components
import MenuList from "./MenuList";

// React ROUTER
import { Link as RouterLink } from "react-router-dom";



import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

// MATERIAL-UI COMPONENTS
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

// ICONS
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    list: {
        width: 320,
        fontSize: '0.8rem',
        backgroundColor: theme.palette.primary.main,
        height: '100%'
    },
    fullList: {
        width: 'auto',
    },
    drawer: {
        // backgroundColor: theme.palette.primary.main,
        height: 'auto'
    },
    paper: {
        backgroundColor: theme.palette.primary.main,
        height: 'auto'
    },
    menu: {
        // border: 'solid red 1px',
        backgroundColor: theme.palette.primary.main,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    menuButton: {
        color: theme.palette.common.white,
        // fontSize: '5rem',

    }
}));

export default function MobileMenu() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        open: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box className={classes.list}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <MenuList />
            </List>
        </Box>
    );

    return (
        <Box className={classes.menu}>
            <Button 
                onClick={toggleDrawer('open', true)}
                className={classes.menuButton}
                aria-controls="simple-menu"
                aria-haspopup="true"
            >
                <MenuIcon className={classes.menuIcon} fontSize='large' />
            </Button>   
            <Drawer 
                className={classes.drawer}
                classes={{ paper: 'paper'}}
                // PaperProps={classes.paper}
                anchor={'right'} 
                open={state['open']} 
                onClose={toggleDrawer('open', false)}
            >
                    {list('right')}
            </Drawer>
        </Box>
    );
}