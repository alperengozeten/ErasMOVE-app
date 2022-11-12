import { React, useState } from 'react';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    // useMediaQuery,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from '../../hooks/useScriptRef';
import AnimateButton from '../ui-component/extended/AnimateButton';

// assets

const ChangePasswordForm = ({ changePasswordRequest }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordAgain, setShowPasswordAgain] = useState(false);

    
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowPasswordAgain = () => {
        setShowPasswordAgain(!showPasswordAgain);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    code: '',
                    password: '',
                    passwordAgain: '',
                    submit: null
                }}
                validationSchema={ Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    code: Yup.string().max(255).required('Activation Code is required'),
                    password: Yup.string().max(255).required('Password is required'),
                    passwordAgain: Yup.string().max(255).required('Password Again is required'),
                }) }
                onSubmit={ async (event, values, { setErrors, setStatus, setSubmitting }) => {
                  event.preventDefault();  
                  try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);

                            const user = {
                                email: values.email,
                                code: values.code,
                                password: values.password,
                                passwordAgain: values.passwordAgain,
                            };
                            changePasswordRequest(user, navigate);
                        }
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
                        <FormControl fullWidth error={ Boolean(touched.code && errors.code) } sx={ { ...theme.typography.customInput } }>
                            <InputLabel htmlFor="outlined-adornment-email-login">Activation Code</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-code-change-pw"
                                type="text"
                                value={ values.code }
                                name="code"
                                onBlur={ handleBlur }
                                onChange={ handleChange }
                                label="Activation Code"
                                inputProps={ {} }
                            />
                            {touched.code && errors.code && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.code}
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
                        <FormControl
                            fullWidth
                            error={ Boolean(touched.passwordAgain && errors.passwordAgain) }
                            sx={ { ...theme.typography.customInput } }
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password Again</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={ showPasswordAgain ? 'text' : 'password' }
                                value={ values.passwordAgain }
                                name="passwordAgain"
                                onBlur={ handleBlur }
                                onChange={ handleChange }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={ handleClickShowPasswordAgain }
                                            onMouseDown={ handleMouseDownPassword }
                                            edge="end"
                                            size="large"
                                        >
                                            {showPasswordAgain ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="PasswordAgain"
                                inputProps={ {} }
                            />
                            {touched.passwordAgain && errors.passwordAgain && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.passwordAgain}
                                </FormHelperText>
                            )}
                        </FormControl>
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
                                    Change Password
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

ChangePasswordForm.propTypes = {
  changePasswordRequest: PropTypes.func.isRequired,
};

ChangePasswordForm.defaultProps = {
  changePasswordRequest: f => f,
};

export default ChangePasswordForm;
