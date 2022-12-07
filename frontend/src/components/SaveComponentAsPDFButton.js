import React from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from "react-dom/server";
import jsPDF from "jspdf";
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const doc = new jsPDF();

const SaveComponentAsPDFButton = ({ pdfName, component }) => {

    const save = () => {
        doc.html(ReactDOMServer.renderToStaticMarkup(component), {
        callback: () => {
            doc.save(`${pdfName}.pdf`);
        }
        });
    };

    return (
        <Button variant="contained" onClick={save} startIcon={<SaveIcon />}>Save PDF</Button>
    );
};

SaveComponentAsPDFButton.propTypes = {
    pdfName: PropTypes.string,
    component: PropTypes.object
};
  
SaveComponentAsPDFButton.defaultProps = {
    pdfName: "pdf.pdf",
    component: PropTypes.object
};


export default SaveComponentAsPDFButton;