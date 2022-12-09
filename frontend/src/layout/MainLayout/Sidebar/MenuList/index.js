// material-ui
import React from 'react';
import { Typography } from '@mui/material';
import { connect } from 'react-redux';
import PropTypes from "prop-types";


// project imports
import NavGroup from './NavGroup';
import menuItem from '../../../../menu-items';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = ({ authType }) => {
    const navItems = menuItem(authType).map(item => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

const mapStateToProps = state =>{
    const authType = state.auth.authType;
    return {
        authType,
    };
};

MenuList.propTypes = {
    authType: PropTypes.string,
};

export default connect(mapStateToProps, {})(MenuList);
