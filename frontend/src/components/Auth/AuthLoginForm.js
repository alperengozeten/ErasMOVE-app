import { React, useState } from 'react';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    // useMediaQuery,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from '../../hooks/useScriptRef';
import AnimateButton from '../ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';

const AuthLoginForm = ({ logInRequest, typeForReq }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();

    const [checked, setChecked] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={ 2 }>
                <Grid item xs={ 12 } container alignItems="center" justifyContent="center">
                    <Box sx={ { mb: 2 } }>
                        <Typography variant="subtitle1">Sign in with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null
                }}
                validationSchema={ Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required'),
                }) }
                onSubmit={ async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                        }
                        const user = {
                            email: values.email,
                            password: values.password,
                            typeForReq: typeForReq
                        };
                        logInRequest(user, navigate);
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                } }
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={ handleSubmit }>
                        <FormControl fullWidth error={ Boolean(touched.email && errors.email) } sx={ { ...theme.typography.customInput } }>
                            <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={ values.email }
                                name="email"
                                onBlur={ handleBlur }
                                onChange={ handleChange }
                                label="Email Address"
                                inputProps={ {} }
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={ Boolean(touched.password && errors.password) }
                            sx={ { ...theme.typography.customInput } }
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={ showPassword ? 'text' : 'password' }
                                value={ values.password }
                                name="password"
                                onBlur={ handleBlur }
                                onChange={ handleChange }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={ handleClickShowPassword }
                                            onMouseDown={ handleMouseDownPassword }
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={ {} }
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={ 1 }>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={ checked }
                                        onChange={ event => setChecked(event.target.checked) }
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Link to={'/forgotPassword'}>
                                <Typography variant="subtitle1" color="secondary" sx={ { textDecoration: 'none', cursor: 'pointer' } }>
                                    Forgot Password?
                                </Typography>
                            </Link>
                        </Stack>
                        {errors.submit && (
                            <Box sx={ { mt: 3 } }>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={ { mt: 2 } }>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={ isSubmitting }
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Sign in
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

AuthLoginForm.propTypes = {
  logInRequest: PropTypes.func.isRequired,
  typeForReq: PropTypes.string,
};

AuthLoginForm.defaultProps = {
  logInRequest: f => f,
};

export default AuthLoginForm;
