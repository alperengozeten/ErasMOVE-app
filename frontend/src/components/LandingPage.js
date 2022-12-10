import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, Stack, Typography, useMediaQuery } from '@mui/material';


// project imports
import AuthWrapper1 from './Auth/AuthWrapper1';
import AuthCardWrapper from './Auth/AuthCardWrapper';
import AuthFooter from './ui-component/cards/AuthFooter';
import { CHOOSE_AUTH_TYPE } from '../constants/actionTypes';
import logo from '../assets/images/logo.png';

// assets

const LandingPage = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const directToLogin = type => {
        dispatch({ type: CHOOSE_AUTH_TYPE, authType: type});
        navigate('/login');
    };

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={ { minHeight: '100vh' } }>
                <Grid item xs={ 12 }>
                    <Grid container justifyContent="center" alignItems="center" sx={ { minHeight: 'calc(100vh - 68px)' } }>
                        <Grid item sx={ { m: { xs: 1, sm: 3 }, mb: 0 } }>
                            <AuthCardWrapper>
                                <Grid container spacing={ 2 } alignItems="center" justifyContent="center">
                                    <Grid item sx={ { mb: 3 } }>
                                        <Link to="#">
                                            <img src={logo} alt="Paper Plane" style={{ height: '200px', width: '200px'}} />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={ 12 }>
                                        <Grid
                                            container
                                            direction={ matchDownSM ? 'column-reverse' : 'row' }
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={ 1 }>
                                                    <Typography
                                                        color={ theme.palette.error.main }
                                                        gutterBottom
                                                        variant={ 'h1' }
                                                        fontFamily={'Ink Free'}
                                                    >
                                                        ErasMOVE
                                                    </Typography>
                                                    <Typography
                                                        color={ theme.palette.secondary.main }
                                                        gutterBottom
                                                        variant={ matchDownSM ? 'h3' : 'h3' }
                                                    >
                                                        Hi, Welcome Back
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item container rowSpacing={2} justifyContent={"center"} direction={"row"} xs={ 12 }>
                                        <Grid item container xs={8} justifyContent={"center"}>
                                            <Button fullWidth variant="contained" color="primary" size="medium" onClick={() => directToLogin('Outgoing Student')} >
                                                Login as Outgoing Student
                                            </Button>
                                        </Grid>
                                        <Grid item container xs={8} justifyContent={"center"}>
                                            <Button fullWidth variant="contained" color="primary" size="medium" onClick={() => directToLogin('Incoming Student')} >
                                                Login as Incoming Student
                                            </Button>
                                        </Grid>
                                        <Grid item container xs={8} justifyContent={"center"}>
                                            <Button fullWidth variant="contained" color="primary" size="medium" onClick={() => directToLogin('Department Coordinator')} >
                                                Login as Department Coordinator
                                            </Button>
                                        </Grid>
                                        <Grid item container xs={8} justifyContent={"center"}>
                                            <Button fullWidth variant="contained" color="primary" size="medium" onClick={() => directToLogin('Course Coordinator')} >
                                                Login as Course Coordinator
                                            </Button>
                                        </Grid>
                                        <Grid item container xs={8} justifyContent={"center"}>
                                            <Button fullWidth variant="contained" color="primary" size="medium" onClick={() => directToLogin('Administrative Staff')} >
                                                Login as Administrative Staff
                                            </Button>
                                        </Grid>
                                        <Grid item container xs={8} justifyContent={"center"}>
                                            <Button fullWidth variant="contained" color="primary" size="medium" onClick={() => directToLogin('Admin')} >
                                                Login as Admin
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={ 12 } sx={ { m: 3, mt: 1 } }>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default LandingPage;