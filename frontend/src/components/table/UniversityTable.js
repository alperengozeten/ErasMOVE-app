import React, { useEffect } from "react";
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
  Alert,
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
  { id: "country", label: "Country", alignRight: false },
  { id: "departments", label: "Departments", alignRight: false },
];
var departments = [
  {
    departmentName: "CS",
    maxQuota: 10,
    quota: 5,
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
    electiveCourseList: [],
  },
  {
    departmentName: "EEE",
    maxQuota: 10,
    quota: 5,
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
    electiveCourseList: [],
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
  console.log("array: ", array);
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      _user => _user.universityName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map(el => el[0]);
}

const UniversityTable = ({ erasmusUniversities, exchangeUniversities, erasmusDepartments, exchangeDepartments, addUniversity, addDepartment }) => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openAddDepartment, setOpenAddDepartment] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [departmentName, setDepartmentName] = React.useState("");
  const [departmentQuota, setDepartmentQuota] = React.useState(0);
  const [courseOpen, setCourseOpen] = React.useState(false);
  const [courseName, setCourseName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [departmentValue, setDepartmentValue] = React.useState(0);
  const [ects, setEcts] = React.useState(0);
  const [error, setError] = React.useState(false);
  const [courseError, setCourseError] = React.useState(false);

  const [isExchange, setIsExchange] = useState("Erasmus");

  useEffect(() => {
    if (isExchange === "Exchange") {
      setSelectedUniDepartments(exchangeDepartments.filter(dep => dep?.exchangeUniversity?.id === selected?.id));
    } else {
      setSelectedUniDepartments(erasmusDepartments.filter(dep => dep?.erasmusUniversity?.id === selected?.id));
    }
  }, [erasmusDepartments, exchangeDepartments]);

  const handleDepartmentChange = e => {
    setDepartmentValue(e.target.value);
  };
  const handleEctsChange = e => setEcts(e.target.value);

  const handleDescriptionChange = e => setDescription(e.target.value);

  const handleDepartmentNameChange = e => setDepartmentName(e.target.value);

  const handleDepartmentQuotaChange = e => setDepartmentQuota(e.target.value);

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
    setDepartmentName("");
    setError(false);
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
    if (
      courseName === "" ||
      description === "" ||
      departmentValue === 0 ||
      ects === 0
    ) {
      setCourseError(true);
    } else {
      setCourseName("");
      setDescription("");
      setDepartmentValue("");
      setEcts(0);
      setCourseError(false);

      setCourseOpen(false);
    }
  };
  const handleCourseBack = () => {
    setCourseName("");
    setDescription("");
    setDepartmentValue("");
    setEcts(0);
    setCourseError(false);
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

  const universities =
    isExchange === "Exchange" ? exchangeUniversities : erasmusUniversities;

  const filteredUsers =
    universities.length > 0
      ? applySortFilter(universities, getComparator(order, orderBy), filterName)
      : [];

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [selectedUniDepartments, setSelectedUniDepartments] = useState([]);

  console.log("deps", selectedUniDepartments);

  
  const handleClickOpen = id => {
    setOpen(true);
    setSelected(universities.filter(uni => uni.id === id)[0]);
    if (isExchange === "Exchange") {
      setSelectedUniDepartments(exchangeDepartments.filter(dep => dep?.exchangeUniversity?.id === universities.filter(uni => uni.id === id)[0]?.id));
    } else {
      setSelectedUniDepartments(erasmusDepartments.filter(dep => dep?.erasmusUniversity?.id === universities.filter(uni => uni.id === id)[0]?.id));
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDisabled(true);
    setSelected({});
    setSelectedUniDepartments([]);
  };

  const handleAddDepartmentRequest = () => {
    if (departmentName === "" || (isExchange === "Erasmus" && departmentQuota === 0)) {
      setError(true);
    } else {

      const erasmusDepartment = {
        departmentName: departmentName,
        maxQuota: departmentQuota,
        quota: departmentQuota,
        erasmusUniversity: {
          id: selected?.id
        }
      };

      const exchangeDepartment = {
        departmentName: departmentName,
        exchangeDepartment: {
          id: selected?.id
        }
      };

      const department = isExchange === "Erasmus" ? erasmusDepartment : exchangeDepartment;

      addDepartment(department, isExchange);
      setDepartmentName("");
      setDepartmentQuota(0);
      setError(false);
      setOpenAddDepartment(false);
    }
  };
  return (
    <>
      <Container>
        <Card>
          <UniversitiesListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
            setIsExchange={setIsExchange}
            isExchange={isExchange}
            addUniversity={addUniversity}
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
                  {console.log("filtered: ", filteredUsers)}
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      const {
                        id,
                        universityName,
                        country,
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
                                {universityName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">{country}</TableCell>

                          <TableCell align="right">
                            <Button
                              variant="contained"
                              color="inherit"
                              size="small"
                              onClick={() => handleClickOpen(id)}
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
                                                defaultValue={selected.universityName}
                                                disabled={!isEdit}
                                              />
                                            </MDBCol>
                                          </MDBRow>
                                          <hr />
                                          <MDBRow>
                                            <MDBCol sm="3">
                                              <MDBCardText>Program</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                            <FormControl fullWidth>          
                                              <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={isExchange}
                                                disabled={!isEdit}
                                                onChange={e => setIsExchange(e.target.value) }
                                              >
                                                <MenuItem value={'Erasmus'}>Erasmus</MenuItem>
                                                <MenuItem value={'Exchange'}>Exchange</MenuItem>
                                              </Select>
                                            </FormControl>
                                            </MDBCol>
                                          </MDBRow>
                                          {isExchange === "Exchange" ? 
                                          (<><hr />
                                            <MDBRow>
                                              <MDBCol sm="3">
                                                <MDBCardText>Quota</MDBCardText>
                                              </MDBCol>
                                              <MDBCol sm="9">
                                                <TextField
                                                  id="outlined-multiline-flexible"
                                                  defaultValue={selected.universityQuota}
                                                  disabled={!isEdit}
                                                  type="number"
                                                />
                                              </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                              <MDBCol sm="3">
                                                <MDBCardText>Max Quota</MDBCardText>
                                              </MDBCol>
                                              <MDBCol sm="9">
                                                <TextField
                                                  id="outlined-multiline-flexible"
                                                  defaultValue={selected.maxUniversityQuota}
                                                  disabled={!isEdit}
                                                  type="number"
                                                />
                                              </MDBCol>
                                            </MDBRow></>): null}
                                          <hr />
                                          <MDBRow>
                                            <MDBCol sm="3">
                                              <MDBCardText>
                                                Departments
                                              </MDBCardText>
                                            </MDBCol>
                                            {isEdit ? (
                                              <MDBCol sm="3">
                                                {selectedUniDepartments.map(
                                                  (department, index) => (
                                                    <section key={index}>
                                                      <MDBCardText className="text-muted">
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
                                                            <MDBCardText className="text-muted">
                                                              -
                                                              {
                                                                courses.courseName
                                                              }
                                                            </MDBCardText>
                                                          </FormControl>
                                                        )
                                                      )}
                                                    </section>
                                                  )
                                                )}
                                              </MDBCol>
                                            ) : (
                                              <MDBCol sm="3">
                                                {selectedUniDepartments.map(
                                                  (department, index) => (
                                                    <section key={index}>
                                                      <MDBCardText className="text-muted"> Department Name: 
                                                        {
                                                          department.departmentName
                                                        }
                                                      </MDBCardText>
                                                      {isExchange !== "Exchange" ? (<><MDBCardText className="text-muted"> Max Quota: 
                                                        {
                                                          department.maxQuota
                                                        }
                                                      </MDBCardText>
                                                      <MDBCardText className="text-muted"> Empty Quota: 
                                                        {
                                                          department.quota
                                                        }
                                                      </MDBCardText></>) : null}
                                                      <hr />
                                                    </section>
                                                  )
                                                )}
                                              </MDBCol>
                                            )}

                                            {isEdit ? (
                                              <>
                                                <MDBCol sm="3">
                                                  <Button
                                                    sx={{ margin: "auto" }}
                                                    variant="contained"
                                                    size="medium"
                                                    onClick={
                                                      handleOpenAddDepartment
                                                    }
                                                  >
                                                    Add Department
                                                  </Button>
                                                </MDBCol>
                                                <MDBCol sm="3">
                                                  <Button
                                                    variant="contained"
                                                    size="medium"
                                                    onClick={
                                                      handleCourseClickOpen
                                                    }
                                                  >
                                                    Add Course
                                                  </Button>
                                                </MDBCol>
                                              </>
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
                            BackdropProps={{
                              style: { backgroundColor: "rgba(0, 0, 0, 0.2)" },
                            }}
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
                                              <MDBCardText>
                                                Department*
                                              </MDBCardText>
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
                                                  error={courseError}
                                                  onChange={
                                                    handleDepartmentChange
                                                  }
                                                >
                                                  <MenuItem disabled value={0}>
                                                    Select
                                                  </MenuItem>

                                                  {departments.map(
                                                    (department, index) => (
                                                      <MenuItem
                                                        key={index}
                                                        value={(index + 1) * 10}
                                                      >
                                                        {
                                                          department.departmentName
                                                        }
                                                      </MenuItem>
                                                    )
                                                  )}
                                                </Select>
                                              </FormControl>
                                            </MDBCol>
                                          </MDBRow>
                                          <hr />
                                          <MDBRow>
                                            <MDBCol sm="3">
                                              <MDBCardText>
                                                Course Name*
                                              </MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                              <TextField
                                                id="outlined-multiline-flexible"
                                                value={courseName}
                                                onChange={
                                                  handleCourseNameChange
                                                }
                                                error={courseError}
                                              />
                                            </MDBCol>
                                          </MDBRow>
                                          <hr />
                                          <MDBRow>
                                            <MDBCol sm="3">
                                              <MDBCardText>
                                                Description*
                                              </MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                              <TextField
                                                id="outlined-multiline-flexible"
                                                fullWidth
                                                value={description}
                                                onChange={
                                                  handleDescriptionChange
                                                }
                                                error={courseError}
                                              />
                                            </MDBCol>
                                          </MDBRow>
                                          <hr />
                                          <MDBRow>
                                            <MDBCol sm="3">
                                              <MDBCardText>ECTS*</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                              <TextField
                                                id="outlined-multiline-flexible"
                                                type={"number"}
                                                value={ects}
                                                onChange={handleEctsChange}
                                                error={courseError}
                                              />
                                            </MDBCol>
                                          </MDBRow>
                                          <hr />
                                          {courseError ? (
                                            <Alert severity="error">
                                              Required places must be filled!
                                            </Alert>
                                          ) : null}
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
                                        onClick={handleCourseBack}
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
                                          <MDBRow>
                                            <MDBCol sm="3">
                                              <MDBCardText>
                                                Department Name*
                                              </MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                              <TextField
                                                id="outlined-multiline-flexible"
                                                value={departmentName}
                                                onChange={
                                                  handleDepartmentNameChange
                                                }
                                                error={error}
                                              />
                                            </MDBCol>
                                          </MDBRow>
                                          {isExchange === "Erasmus" ? (<><hr />
                                          <MDBRow>
                                            <MDBCol sm="3">
                                              <MDBCardText>
                                                Total Quota*
                                              </MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                              <TextField
                                                id="outlined-multiline-flexible"
                                                value={departmentQuota}
                                                type={"number"}
                                                onChange={
                                                  handleDepartmentQuotaChange
                                                }
                                                error={error}
                                              />
                                            </MDBCol>
                                          </MDBRow></>): null}
                                          {error ? (
                                            <Alert severity="error">
                                              Required places must be filled!
                                            </Alert>
                                          ) : null}
                                          
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
                                        onClick={handleAddDepartmentRequest}
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
                                        Back
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
  erasmusUniversities: PropTypes.array,
  exchangeUniversities: PropTypes.array,
  erasmusDepartments: PropTypes.array, 
  exchangeDepartments: PropTypes.array,
  addUniversity: PropTypes.func,
  addDepartment: PropTypes.func,
};

UniversityTable.defaultProps = {
  universities: [],
  erasmusUniversities: [],
  exchangeUniversities: [],
  erasmusDepartments: [], 
  exchangeDepartmetns: [],
};

export default UniversityTable;
