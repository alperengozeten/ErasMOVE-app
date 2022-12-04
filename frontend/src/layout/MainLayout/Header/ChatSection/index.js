import React, { useRef } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    ButtonBase,
} from '@mui/material';

// assets
import { IconMessage  } from '@tabler/icons';

// ==============================|| NOTIFICATION ||============================== //

const ChatSection = ({ handleRightDrawerToggle, rightDrawerOpened }) => {
    const theme = useTheme();

    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);

    return (
        <>
            <Box
                sx={{
                    ml: 2,
                    mr: 1,
                    [theme.breakpoints.down('md')]: {
                        mr: 2
                    }
                }}
            >
                <ButtonBase sx={{ borderRadius: '12px' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&[aria-controls="chat-grow"],&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        ref={anchorRef}
                        aria-controls={rightDrawerOpened ? 'chat-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleRightDrawerToggle}
                        color="inherit"
                    >
                        <IconMessage  stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>
        </>
    );
};

ChatSection.propTypes = {
    handleRightDrawerToggle: PropTypes.func,
    rightDrawerOpened: PropTypes.bool,
};

export default ChatSection;
