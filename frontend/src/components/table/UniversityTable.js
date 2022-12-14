import React from "react";
import { filter } from "lodash";
import { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DeleteModal from '../DeleteModal';
import DeleteIcon from '@mui/icons-material/Delete';


// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Grid,
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


  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {

    setOpenDelete(false);
  };

  const handleDelete = () => {
    handleCloseDelete();
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
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - universities.length) : 0;

  const filteredUsers = applySortFilter(
    universities,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDisabled(true);
  };

  // const handleEdit = () => {
  //   setDisabled(false);
  // };

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
                        courses,
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
                              Go To Details
                            </Button>
                            
                          <Tooltip describeChild title="Delete user">
                            <IconButton size="large" color="error" onClick={() => handleOpenDelete() }>
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
                                <Typography
                                  id="modal-modal-title"
                                  textAlign={"center"}
                                  variant="h2"
                                  component="h1"
                                >
                                  University Details
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
                                              <MDBCardText>Empty Quota</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                              <TextField
                                                id="outlined-multiline-flexible"
                                                type={"number"}
                                                defaultValue={emptyQuota}
                                                disabled={disabled}
                                          
                                              />
                                            </MDBCol>
                                          </MDBRow>
                                          <hr />
                                          <MDBRow>
                                            <MDBCol sm="3">
                                              <MDBCardText>Total Quota</MDBCardText>
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
                                              <MDBCardText>Courses</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                            <TextField
                                                id="outlined-multiline-flexible"
                                                defaultValue={courses}
                                                disabled={disabled}
                                          
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
                                        size="medium"
                                        onClick={handleClose}
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
                                    <Grid item xs={1}></Grid>
                                  </Grid>
                                </Stack>
                              </Stack>
                            </Box>
                          </Modal>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
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
        <DeleteModal handleDelete={handleDelete} openDelete={openDelete} handleCloseDelete={handleCloseDelete} name={"University"}/>
      </Container>
    </>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '60%',
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
