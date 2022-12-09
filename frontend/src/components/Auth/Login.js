import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';
import AuthLoginForm from './AuthLoginForm';
import AuthFooter from '../ui-component/cards/AuthFooter';
import { CHOOSE_AUTH_TYPE } from '../../constants/actionTypes';
import logo from '../../assets/images/logo.png';

// assets

const Login = ({ logInRequest, authType }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const backToLanding = () => {
        dispatch({ type: CHOOSE_AUTH_TYPE, authType: ''});
        navigate('/');
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
                                            <img src={logo} alt="Paper Plane" style={{ height: '130px', width: '130px'}} />
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
                                                        color={ theme.palette.secondary.main }
                                                        gutterBottom
                                                        variant={ matchDownSM ? 'h3' : 'h2' }
                                                    >
                                                        Login as {authType}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        fontSize="16px"
                                                        textAlign={ matchDownSM ? 'center' : 'inherit' }
                                                    >
                                                        Enter your credentials to continue
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={ 12 }>
                                        <AuthLoginForm logInRequest={ logInRequest } />
                                    </Grid>
                                    <Grid item xs={ 12 }>
                                        <Button fullWidth variant="contained" color="primary" size="medium" onClick={() => backToLanding()} >
                                            Back
                                        </Button>
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

const mapStateToProps = state => {
    const authType = state.auth.authType;
    return {
        authType,
    };
};




Login.propTypes = {
  logInRequest: PropTypes.func.isRequired,
  authType: PropTypes.string,
};


export default connect(mapStateToProps, {})(Login);