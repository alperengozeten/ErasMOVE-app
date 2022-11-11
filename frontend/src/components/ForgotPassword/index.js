import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';

// project imports
import AuthWrapper1 from '../Auth/AuthWrapper1';
import AuthCardWrapper from './ForgotCardWrapper';
import ChangePasswordForm from './ChangePasswordForm';
import AuthFooter from '../ui-component/cards/AuthFooter';
import SendCodeForm from './SendCodeForm';

// assets

const ForgotPassword = ({ sendCodeRequest, changePasswordRequest }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={ { minHeight: '100vh' } }>
                <Grid item xs={ 12 }>
                    <Grid container justifyContent="center" alignItems="center" sx={ { minHeight: 'calc(100vh - 68px)' } }>
                        <Grid item sx={ { m: { xs: 1, sm: 3 }, mb: 0 } }>
                            <AuthCardWrapper>
                                <Grid container spacing={10}>
                                    <Grid item xs={6}>
                                        <Grid container spacing={ 2 } alignItems="center" justifyContent="center">
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
                                                                Activation Code
                                                            </Typography>
                                                            <Typography
                                                                variant="caption"
                                                                fontSize="16px"
                                                                textAlign={ matchDownSM ? 'center' : 'inherit' }
                                                            >
                                                                Enter your email to get activation code
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={ 12 }>
                                                <SendCodeForm sendCodeRequest={ sendCodeRequest } />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid container spacing={ 2 } alignItems="center" justifyContent="center">
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
                                                                Change Password
                                                            </Typography>
                                                            <Typography
                                                                variant="caption"
                                                                fontSize="16px"
                                                                textAlign={ 'center' }
                                                            >
                                                                Enter activation code and new password to change your password
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={ 12 }>
                                                <ChangePasswordForm changePasswordRequest={ changePasswordRequest } />
                                            </Grid>
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

ForgotPassword.propTypes = {
  sendCodeRequest: PropTypes.func,
  changePasswordRequest: PropTypes.func,
};

ForgotPassword.defaultProps = {
  sendCodeRequest: f => f,
  changePasswordRequest: f => f,
};

export default ForgotPassword;