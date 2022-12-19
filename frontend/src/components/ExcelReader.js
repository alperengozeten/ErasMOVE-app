
import { Alert } from '@mui/material';
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import * as XLSX from 'xlsx';
import PropTypes from 'prop-types';
import { CREATE_APPLICATIONS_FROM_EXCEL_REQUEST } from '../constants/actionTypes';

function ExcelReader({ submitExcel }) {
  
  // on change states
  const [excelFile, setExcelFile]=useState(null);
  const [excelFileError, setExcelFileError]=useState(null); 
  const [alert, setAlert]=useState(false);

  const dispatch = useDispatch();
 
  // submit

  // handle File
  const fileType=['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  const handleFile = e=>{
    let selectedFile = e.target.files[0];
    if(selectedFile){
      console.log(selectedFile.type);
      if(selectedFile && fileType.includes(selectedFile.type)){
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload= e => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        }; 
      }
      else{
        setExcelFileError('Please select only excel file types');
        setAlert(true);
        setExcelFile(null);
      }
    }
    else{
      console.log('plz select your file');
    }
  };

  // submit function
  const handleSubmit= e=>{
    e.preventDefault();
    if(excelFile!==null && !excelFileError){
      const workbook = XLSX.read(excelFile,{type:'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet=workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      const applications = data.map(student => {
        return {
          firstName: student["First Name"],
          lastName: student["Lastname"],
          studentId: student["Student ID Number"],
          selectedSemester: student["Duration Preferred"],
          department: student["Department"],
          cgpa: student["UECGPA"],
          totalPoint: student["Total Points"],
          selectedUniversities: [
            student["Preferred University #1"],
            student["Preferred University #2"],
            student["Preferred University #3"],
            student["Preferred University #4"],
            student["Preferred University #5"]
          ]
        };
      });
      console.log(applications);
      submitExcel(applications);
    } else if(excelFileError) {
      setAlert(true);
    }
  };
  
  return (
    <div className="container">

      {/* upload file section */}
      <div className='form'>
        <form className='form-group' autoComplete="off" onSubmit={handleSubmit}>
          <label><h5>Upload Excel file</h5></label>
          <br></br>
          <input type='file' className='form-control' onChange={handleFile} required></input>                  
            { excelFileError && alert &&
              <Alert sx={{marginTop: '10px'}} severity="error" onClose={() => setAlert(false)} >{excelFileError}</Alert>
            }
          <button type='submit' className='btn btn-success' style={{marginTop:5+'px'}}>Submit</button>
        </form>
      </div>
    </div>
  );
}

ExcelReader.propTypes = {
  submitExcel: PropTypes.func,
};

export default ExcelReader;