import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Breadcrumbs from '../../components/ui-component/extended/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';
import Customization from '../Customization';
import navigation from '../../menu-items';
import { drawerWidth } from '../../constants/themeConstant';
import { SET_CHAT, SET_MENU } from '../../constants/actionTypes'; 

// assets
import { IconChevronRight } from '@tabler/icons';
import ChatDrawer from './ChatDrawer';

// styles
const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth - 20),
            width: `calc(100% - ${drawerWidth}px)`,
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px',
        },
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
        },
    }),
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));

    // Handle left drawer
    const leftDrawerOpened = useSelector(state => state.customization?.opened);
    const rightDrawerOpened = useSelector(state => state.customization?.chatOpened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };
    const handleRightDrawerToggle = () => {
        dispatch({ type: SET_CHAT, chatOpened: !rightDrawerOpened });
    };
    useEffect(() => {
        dispatch({ type: SET_MENU, opened: !matchDownMd });
    }, [matchDownMd]);

    return (
        <Box sx={ { display: 'flex' } }>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={ 0 }
                sx={ {
                    bgcolor: theme.palette.background.default,
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none',
                } }
            >
                <Toolbar>
                    <Header handleLeftDrawerToggle={ handleLeftDrawerToggle } handleRightDrawerToggle={ handleRightDrawerToggle } rightDrawerOpened={ rightDrawerOpened } />
                </Toolbar>
            </AppBar>

            {/* drawer */}
            <Sidebar drawerOpen={ leftDrawerOpened } drawerToggle={ handleLeftDrawerToggle } />

            {/* main content */}
            <Main theme={ theme } open={ leftDrawerOpened }>
                {/* breadcrumb */}
                <Breadcrumbs separator={ IconChevronRight } navigation={ navigation } icon title rightAlign />
                <Outlet style={{ backgroundColor: 'blue' }} />
            </Main>
            <ChatDrawer drawerOpen={ rightDrawerOpened } drawerToggle={ handleRightDrawerToggle } />
            <Customization />
        </Box>
    );
};

export default MainLayout;
