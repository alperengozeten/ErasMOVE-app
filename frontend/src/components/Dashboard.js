import { Box, Stack } from '@mui/system';
import React from 'react';
import ExcelReader from './ExcelReader';
import SaveComponentAsPDFButton from './SaveComponentAsPDFButton';
const Foo = <b>foo</b>;


const Dashboard = () => {

  return (
    <div className="dashboard">
        <Stack spacing={2}>
          <ExcelReader /> 
          <Box>
            <SaveComponentAsPDFButton component={Foo} pdfName={"foo"} />
          </Box>
        </Stack>
    </div>);
};

export default Dashboard;