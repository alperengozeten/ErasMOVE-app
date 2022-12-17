import React from "react";
import { filter } from "lodash";
import { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DeleteModal from "../DeleteModal";
import DeleteIcon from "@mui/icons-material/Delete";

// @mui
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  MenuItem,
  Select,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Grid,
  FormControl,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
} from "mdb-react-ui-kit";

// components
import Scrollbar from "./scrollbar";
// sections
import { UniversityListHead } from "./university";

import { UniversitiesListToolbar } from "./university";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "University Name", alignRight: false },
  { id: "type", label: "Program Type", alignRight: false },
  { id: "emptyQuota", label: "Empty Quota", alignRight: false },
  { id: "totalQuota", label: "Total Quota", alignRight: false },
  { id: "departments", label: "Departments", alignRight: false },
];
const departments = [
  {
    departmentName: "CS",
    courseList: [
      {
        courseName: "CS-101",
        description: "Algorithms and Programming I",
        ects: 6.5,
      },
      {
        courseName: "CS-102",
        description: "Algorithms and Programming II",
        ects: 6.5,
      },
      {
        courseName: "CS-121",
        description: "Fundamentals of Algorithms",
        ects: 6.5,
      },
      {
        courseName: "CS-319",
        description: "Object Oriented Software Engineering",
        ects: 6.5,
      },
      { courseName: "CS-315", description: "Programming Languages", ects: 5 },
    ],
  },
  {
    departmentName: "EEE",
    courseList: [
      {
        courseName: "EEE-101",
        description: "Algorithms and Programming I",
        ects: 6.5,
      },
      {
        courseName: "EEE-102",
        description: "Algorithms and Programming II",
        ects: 6.5,
      },
      {
        courseName: "EEE-121",
        description: "Fundamentals of Algorithms",
        ects: 6.5,
      },
      {
        courseName: "EE-319",
        description: "Object Oriented Software Engineering",
        ects: 6.5,
      },
      { courseName: "EEE-315", description: "Programming Languages", ects: 5 },
    ],
  },
];
// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      _user => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map(el => el[0]);
}

const UniversityTable = ({ universities }) => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openAddDepartment, setOpenAddDepartment] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [departmentName, setDepartmentName] = React.useState("");
  const [courseOpen, setCourseOpen] = React.useState(false);
  const [courseName, setCourseName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [departmentValue, setDepartmentValue] = React.useState(0);
  const [ects, setEcts] = React.useState(0);

  const handleDepartmentChange = e => {
    setDepartmentValue(e.target.value);
  };
  const handleEctsChange = e => setEcts(e.target.value);

  const handleDescriptionChange = e => setDescription(e.target.value);

  const handleDepartmentNameChange = e => setDepartmentName(e.target.value);

  const handleCourseNameChange = e => setCourseName(e.target.value);

  const handleSave = () => {
    setIsEdit(false);
  };
  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOpenAddDepartment = () => {
    setOpenAddDepartment(true);
  };
  const handleAddDepartmentClose = () => {
    setOpenAddDepartment(false);
  };

  const handleDelete = () => {
    handleCloseDelete();
  };

  const handleBack = () => {
    setIsEdit(false);
  };
  const handleCourseClickOpen = () => {
    setCourseOpen(true);
  };

  const handleCourseClose = () => {
    setCourseOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = event => {
    setPage(0);
    setFilterName(event.target.value);
  };
 
  const filteredUsers = applySortFilter(
    universities,
    getComparator(order, orderBy),
    filterName
  );

  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDisabled(true);
  };

  return (
    <>
      <Container>
        <Card>
          <UniversitiesListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UniversityListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />

                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      const {
                        id,
                        name,
                        type,
                        emptyQuota,
                        totalQuota,
                        // courses,
                      } = row;

                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell padding="checkbox"></TableCell>

                          <TableCell
                            align="center"
                            component="th"
                            scope="row"
                            padding="none"
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Typography variant="inherit" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">{type}</TableCell>

                          <TableCell align="center">{emptyQuota}</TableCell>
                          <TableCell align="center">{totalQuota}</TableCell>

                          <TableCell align="right">
                            <Button
                              variant="contained"
                              color="inherit"
                              size="small"
                              onClick={handleClickOpen}
                            >
                              Details
                            </Button>

                            <Tooltip describeChild title="Delete user">
                              <IconButton
                                size="large"
                                color="error"
                                onClick={() => handleOpenDelete()}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <Stack spacing={6}>
                                {isEdit ? (
                                  <Typography
                                    id="modal-modal-title"
                                    textAlign={"center"}
                                    variant="h2"
                                    component="h1"
                                  >
                                    Edit University Details
                                  </Typography>
                                ) : (
                                  <Typography
                                    id="modal-modal-title"
                                    textAlign={"center"}
                                    variant="h2"
                                    component="h1"
                                  >
                                    University Details
                                  </Typography>
                                )}
                                <Stack alignItems={"center"} spacing={3}>
                                  <section
                                    style={{
                                      width: "100%",
                                      backgroundColor: "#eee",
                                    }}
                                  >
                                    <MDBContainer className="py-5">
                                      <MDBCard className="mb-4">
                                        <MDBCardBody>
                                          <MDBRow>
                                            <MDBCol sm="3">
                                              <MDBCardText>
                                                University Name
                                              </MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                              <TextField
                                                id="outlined-multiline-flexible"
                                                defaultValue={name}
                                                disabled={disabled}
                                              />
                                            </MDBCol>
                                          </MDBRow>
                                          <hr />
                                          <MDBRow>
                                            <MDBCol sm="3">
                                              <MDBCardText>Program</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                              <TextField
                                                id="outlined-multiline-flexible"
                                                defaultValue={type}
                                                disabled={disabled}
                                              />
                                            </MDBCol>
                                          </MDBRow>
                                          <hr />
                                          <MDBRow>
                                            <MDBCol sm="3">
                                              <MDBCardText>
                                                Empty Quota
                                              </MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                              <TextField
                                                id="outlined-multiline-flexible"
                                                type={"number"}
                                                defaultValue={emptyQuota}
                                                disabled={!isEdit}
                                              />
                                            </MDBCol>
                                          </MDBRow>
                                          <hr />
                                          <MDBRow>
                                            <MDBCol sm="3">
                                              <MDBCardText>
                                                Total Quota
                                              </MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                              <TextField
                                                id="outlined-multiline-flexible"
                                                type={"number"}
                                                defaultValue={totalQuota}
                                                disabled={disabled}
                                              />
                                            </MDBCol>
                                          </MDBRow>
                                          <hr />
                                          <MDBRow>
                                            <MDBCol sm="3">
                                              <MDBCardText>
                                                Departments
                                              </MDBCardText>
                                            </MDBCol>
                                           {isEdit ? <MDBCol sm="3">
                                              {departments.map(
                                                (department, index) => (<section key={index}>
                                                  <MDBCardText
                                                    
                                                    className="text-muted"
                                                  >
                                                    {
                                                      department.departmentName
                                                    }
                                                  </MDBCardText>
                                                  
                                                         {department.courseList.map(
                                                           (courses, index_) => (
                                                            <FormControl
                                                            key={index_}

                                                            sx={{
                                                              m: 2,
                                                              minWidth: 250,
                                                            }}
                                                          >
                                                             <MDBCardText
                                                               className="text-muted"
                                                             >
                                                               -{courses.courseName}
                                                             </MDBCardText>
                                                  
                                                             </FormControl>
                                                           )
                                                         )}
                                                </section>)
                                              )}
                                            </MDBCol> : <MDBCol sm="3">
                                              {departments.map(
                                                (department, index) => (<section key={index}>
                                                  <MDBCardText
                                                    
                                                    className="text-muted"
                                                  >
                                                    {
                                                      department.departmentName
                                                    }
                                                  </MDBCardText>
                                                
                                                </section>)
                                              )}
                                            </MDBCol> }

                                            {isEdit ? (
                                              <>
                                              <MDBCol sm="3">
                                                <Button
                                                  sx={{ margin: "auto" }}
                                                  variant="contained"
                                                  size="medium"
                                                  onClick={handleOpenAddDepartment}
                                                >
                                                  Add Department
                                                </Button>
                                              </MDBCol>
                                              <MDBCol sm="3">
                                              <Button
                                                variant="contained"
                                                size="medium"
                                                onClick={handleCourseClickOpen}
                                              >
                                                Add Course
                                              </Button>
                                            </MDBCol></>
                                            ) : (
                                              <></>
                                            )}
                                          </MDBRow>
                                        </MDBCardBody>
                                      </MDBCard>
                                    </MDBContainer>
                                  </section>
                                  <Grid container justifyContent={"center"}>
                                    <Grid item xs={3}></Grid>
                                    {isEdit ? (
                                      <>
                                        <Grid item xs={4}>
                                          <Button
                                            sx={{ margin: "auto" }}
                                            variant="contained"
                                            color="success"
                                            size="medium"
                                            onClick={handleSave}
                                          >
                                            Save
                                          </Button>
                                        </Grid>
                                        <Grid item xs={4}>
                                          <Button
                                            sx={{ margin: "auto" }}
                                            variant="contained"
                                            size="medium"
                                            onClick={handleBack}
                                          >
                                            Back
                                          </Button>{" "}
                                        </Grid>{" "}
                                      </>
                                    ) : (
                                      <>
                                        <Grid item xs={4}>
                                          <Button
                                            sx={{ margin: "auto" }}
                                            variant="contained"
                                            size="medium"
                                            onClick={handleEdit}
                                          >
                                            Edit
                                          </Button>
                                        </Grid>
                                        <Grid item xs={4}>
                                          <Button
                                            sx={{ margin: "auto" }}
                                            variant="contained"
                                            color="error"
                                            size="medium"
                                            onClick={handleClose}
                                          >
                                            Close
                                          </Button>
                                        </Grid>
                                      </>
                                    )}

                                    <Grid item xs={1}></Grid>
                                  </Grid>
                                </Stack>
                              </Stack>
                            </Box>
                          </Modal>

                          <Modal
        open={courseOpen}
        onClose={handleCourseClose}
        aria-labelledby="modal-modal-title"
        BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.2)" } }}
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={6}>
            <Typography
              id="modal-modal-title"
              textAlign={"center"}
              variant="h2"
              component="h1"
            >
              Add Course
            </Typography>
            <Stack alignItems={"center"} spacing={3}>
              <section
                style={{
                  width: "100%",
                  backgroundColor: "#eee",
                }}
              >
                <MDBContainer className="py-5">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Department</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <FormControl
                            sx={{
                              minWidth: 250,
                            }}
                          >
                            <Select
                              required
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={departmentValue}
                              size="small"
                              onChange={handleDepartmentChange}
                            >
                              <MenuItem disabled value={0}>
                                Select
                              </MenuItem>

                              {departments.map((department,index)=>(<MenuItem key={index} value={(index+1)*10}>{department.departmentName}</MenuItem>))}
                         
                            </Select>
                          </FormControl>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Course Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <TextField
                            id="outlined-multiline-flexible"
                            value={courseName}
                            onChange={handleCourseNameChange}
                            disabled={departmentValue ? false : true}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Description</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <TextField
                            id="outlined-multiline-flexible"
                            fullWidth
                            value={description}
                            onChange={handleDescriptionChange}
                            disabled={departmentValue ? false : true}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>ECTS</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <TextField
                            id="outlined-multiline-flexible"
                            type={"number"}
                            value={ects}
                            onChange={handleEctsChange}
                            disabled={departmentValue ? false : true}
                          />
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                </MDBContainer>
              </section>
              <Grid container justifyContent={"center"}>
                <Grid item xs={3}></Grid>
                <Grid item xs={4}>
                  <Button
                    sx={{ margin: "auto" }}
                    variant="contained"
                    color="success"
                    size="medium"
                    onClick={handleCourseClose}
                    disabled={ects === 0 || description ==="" || courseName ==="" || departmentValue === 0 }

                  >
                    Add
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    sx={{ margin: "auto" }}
                    variant="contained"
                    color="error"
                    size="medium"
                    onClick={handleCourseClose}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </Stack>
          </Stack>
        </Box>
      </Modal>
         <Modal
        open={openAddDepartment}
        onClose={handleAddDepartmentClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={6}>
            <Typography
              id="modal-modal-title"
              textAlign={"center"}
              variant="h2"
              component="h1"
            >
              Add Department
            </Typography>
            <Stack alignItems={"center"} spacing={3}>
              <section
                style={{
                  width: "100%",
                  backgroundColor: "#eee",
                }}
              >
                <MDBContainer className="py-5">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Department Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <TextField
                            id="outlined-multiline-flexible"
                            value={departmentName}
                            onChange={handleDepartmentNameChange}
                          />
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                </MDBContainer>
              </section>
              <Grid container justifyContent={"center"}>
                <Grid item xs={3}></Grid>
                <Grid item xs={4}>
                  <Button
                    sx={{ margin: "auto" }}
                    variant="contained"
                    color="success"
                    size="medium"
                    onClick={handleAddDepartmentClose}
                    disabled={ departmentName ===""}

                  >
                    Add
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    sx={{ margin: "auto" }}
                    variant="contained"
                    color="error"
                    size="medium"
                    onClick={handleAddDepartmentClose}
                  >
                    Close
                  </Button>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </Stack>
          </Stack>
        </Box>
      </Modal>

                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={universities.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <DeleteModal
          handleDelete={handleDelete}
          openDelete={openDelete}
          handleCloseDelete={handleCloseDelete}
          name={"University"}
        />
        
      </Container>
    </>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
  maxHeight: "90%",
  mb: 2,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  overflowY: "scroll",
};
UniversityTable.propTypes = {
  universities: PropTypes.array,
};

UniversityTable.defaultProps = {
  universities: [],
};

export default UniversityTable;
