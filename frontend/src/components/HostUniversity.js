import { Box, Grid, Stack, Tab, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import ExcelReader from './ExcelReader';

const Universities = () => {
    const [value, setValue] = React.useState("0");

    const handleChange = (event, newValue) => {
        setValue(`${newValue}`);
    };
    return (
        <Stack spacing={2}>
            <Typography gutterBottom variant="h1" textAlign={ "center" } component="div">
                Host University
            </Typography>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ width: "100%", height: "100%" }}
            >
                <Box sx={{ width: "90%", height: "90%" }}>
                    <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList onChange={handleChange}>
                        <Tab label="University" value={"0"} />
                        <Tab label="Upload Application List" value={"1"} />
                        </TabList>
                    </Box>
                        <TabPanel value="0" index={0}>
                            <Box sx={{ flexGrow: 1 }}>
                            </Box>
                        </TabPanel>
                        <TabPanel value="1" index={1}>
                            <Box sx={{ flexGrow: 1 }}>
                                <ExcelReader /> 
                            </Box>
                        </TabPanel>
                    </TabContext>
                </Box>
            </Grid>
        </Stack>
    );
};
const mapStateToProps = state => {
    const universities = state.universities.universities;
    return {
        universities,
    };
};

Universities.propTypes = {
    universities: PropTypes.array,
};
  
Universities.defaultProps = {
    universities: [],
};

export default connect(mapStateToProps, {})(Universities);