import { Box, Stack } from '@mui/system';
import React from 'react';
import SaveComponentAsPDFButton from './SaveComponentAsPDFButton';
const Foo = <b>foo</b>;


const Dashboard = () => {

  return (
    <div className="dashboard">
        <Stack spacing={2}>
          <Box>
            <SaveComponentAsPDFButton component={Foo} pdfName={"foo"} />
          </Box>
        </Stack>
    </div>);
};

export default Dashboard;