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
import { Link } from 'react-router-dom';

const SendCodeForm = ({ sendCodeRequest }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();

    const [email, setEmail] = useState('');
    
    const logIn = e => {
        e.preventDefault();
        sendCodeRequest(email);
    };

    return (
        <>
            <Formik
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
                {({ errors, handleBlur, isSubmitting, touched }) => (
                    <form noValidate onSubmit={ logIn }>
                        <FormControl fullWidth error={ Boolean(touched.email && errors.email) } sx={ { ...theme.typography.customInput } }>
                            <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={ email }
                                name="email"
                                onBlur={ handleBlur }
                                onChange={ e => setEmail(e.target.value) }
                                label="Email Address / Username"
                                inputProps={ {} }
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Stack direction="row" alignItems="right" justifyContent="space-between" spacing={ 1 }>
                            <Link to={'/'}>
                                <Typography variant="subtitle1" color="secondary" textAlign={'end'} sx={ { textDecoration: 'none', cursor: 'pointer' } }>
                                    Go back to login page
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
                                    Send Code
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

SendCodeForm.propTypes = {
  sendCodeRequest: PropTypes.func,
};

SendCodeForm.defaultProps = {
  sendCodeRequest: f => f,
};

export default SendCodeForm;
