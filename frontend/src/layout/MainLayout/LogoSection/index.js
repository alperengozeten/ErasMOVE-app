import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Grid, Typography } from '@mui/material';

// project imports
import config from '../../../config';
import logo from '../../../assets/images/logo.png';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={'/main'}>
        <Grid container>
            <Grid item container justifyContent={'center'} xs={5}>
                <img src={logo} alt="Paper Plane" style={{ height: '40px', width: '40px'}} />
            </Grid>
            <Grid item container alignItems={'center'} xs={5}>
                <Typography
                    color={ 'error' }
                    gutterBottom
                    variant={ 'h2' }
                    fontFamily={'Ink Free'}
                >
                    ErasMOVE
                </Typography>
            </Grid>

        </Grid>
    </ButtonBase>
);

export default LogoSection;
