import React from 'react';
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

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                }}
                validationSchema={ Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                }) }
                onSubmit={ async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                        }
                        sendCodeRequest(values.email);
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
