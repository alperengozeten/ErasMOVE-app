import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { 
    alpha,
    Box,
    Divider,
    Drawer,
    Grid,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    styled,
    Typography,
} from '@mui/material';
import MailIcon  from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Iconify from '../../../components/table/iconify';

// ==============================|| SIDEBAR DRAWER ||============================== //

const ChatDrawer = ({ drawerOpen, drawerToggle }) => {
    const theme = useTheme();

    const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
        width: 260,
        transition: theme.transitions.create(['box-shadow', 'width'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
        }),
        '&.Mui-focused': {
            width: 290,
            boxShadow: theme.customShadows?.z8,
        },
        '& fieldset': {
            borderWidth: `1px !important`,
            borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
        },
    }));
      

    const drawerWidth = 300;

    const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
    }));

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                width: drawerWidth,
                },
            }}
            anchor="right"
            open={drawerOpen}
            onClose={drawerToggle}
        >
        <DrawerHeader>
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <IconButton onClick={drawerToggle}>
                    {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </Grid>
            <Grid item xs={8}>
                <Typography sx={{marginTop: '6px'}} variant='h2' align='center' textAlign={"center"} >Chat</Typography>
            </Grid>
        </Grid>
        </DrawerHeader>
        <Divider />
        <StyledSearch
          //value={filterName}
          //onChange={onFilterName}
          sx={ { marginTop: '10px !important',marginBottom: '10px !important', margin:'auto', alignContent: 'center' } }
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
        <List>
            {['Kursad Guzelkaya', 'John Doe', 'Scarlett Johenson'].map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        </Drawer>
    );
};

ChatDrawer.propTypes = {
    drawerOpen: PropTypes.bool,
    drawerToggle: PropTypes.func,
    window: PropTypes.object
};

export default ChatDrawer;
