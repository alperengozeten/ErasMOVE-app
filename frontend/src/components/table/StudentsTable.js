import React from "react";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState } from "react";
import PropTypes from "prop-types";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Popover,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Tooltip,
  Modal,
  Box,
  Button,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
// components
import Label from "../label";
import Scrollbar from "./scrollbar";
// sections
import { UserListHead, UserListToolbar } from "./user";
import ApplicationDetails from "../Application/ApplicationDetails";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "department", label: "Department", alignRight: true },
  { id: "score", label: "Score", alignRight: true },
  { id: "semester", label: "Selected Semester", alignRight: true },
  { id: "placedUniversity", label: "Selected Universities", alignRight: true },
  { id: "status", label: "Status", alignRight: true },
];

//const defaultLanguages = ["English", "German", "Spanish", "French", "Turkish"];

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

const StudentsTable = ({ applications }) => {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [department, setDepartment] = useState("");

  const [hoveredId, setHoveredId] = useState(0);

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

  const handlePopoverOpen = (event, id) => {
    setHoveredId(id);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setHoveredId(0);
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - applications.length) : 0;

  const filterDepartments =
    department === ""
      ? applications
      : applications.filter(
          application => application?.outgoingStudent.department?.departmentName === department
        );

  const filteredUsers = applySortFilter(
    filterDepartments,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  const [open, setOpen] = useState(false);
  const [applicationDetailsID, setApplicationDetailsID] = React.useState(0);

  const handleClickOpen = id => {
    setApplicationDetailsID(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setApplicationDetailsID(0);
  };

  return (
    <>
      <Container>
        <Card>
          <UserListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
            setDepartment={setDepartment}
            department={department}
          />

          <Scrollbar>
            {console.log(applications)}
            {applications?.length > 0 ? (<TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {console.log(filteredUsers)}
                  {filteredUsers
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.map(row => {
                      const { id, outgoingStudent, applicationScore, admittedStatus, selectedSemester, selectedUniversities } = row;
                      return (
                        <TableRow hover key={id} tabIndex={-1} role="checkbox">
                          <TableCell padding="checkbox"></TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar alt={outgoingStudent?.name}/>
                              <Typography variant="subtitle2" noWrap>
                                {outgoingStudent?.name}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="center">{outgoingStudent?.department?.departmentName}</TableCell>

                          <TableCell align="center">{applicationScore}</TableCell>

                          <TableCell align="center">
                            {selectedSemester}
                          </TableCell>

                          <TableCell align="center">
                            <div>
                              <Typography
                                aria-owns={
                                  openPopover ? "mouse-over-popover" : undefined
                                }
                                aria-haspopup="true"
                                onMouseEnter={e => handlePopoverOpen(e, id)}
                                onMouseLeave={handlePopoverClose}
                              >
                                {selectedUniversities?.length > 0 ? `1. ${selectedUniversities[0]?.universityName}` : null}
                              </Typography>
                              <Popover
                                id="mouse-over-popover"
                                sx={{
                                  pointerEvents: "none",
                                }}
                                open={openPopover}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "left",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "left",
                                }}
                                onClose={handlePopoverClose}
                                disableRestoreFocus
                              >
                                {applications.filter(app => app.id === hoveredId)[0]?.selectedUniversities?.map(
                                  (university, index) => (
                                    <Typography key={index} sx={{ p: 2 }}>
                                      {index + 1}. {university.universityName}
                                    </Typography>
                                  )
                                  )}
                              </Popover>
                            </div>
                          </TableCell>

                          <TableCell align="center">
                            <Label
                              color={
                                (admittedStatus === "NOT ADMITTED" && "error") || "success"
                              }
                            >
                              {sentenceCase(admittedStatus)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <Tooltip
                              describeChild
                              title="Open application details"
                            >
                              <IconButton
                                size="large"
                                color="inherit"
                                onClick={() => handleClickOpen(id)}
                              >
                                <DescriptionIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          <Modal
                              open={open}
                              onClose={handleClose}
                              BackdropProps={{
                                style: { backgroundColor: "rgba(0,0,0,0.04)" },
                              }}
                            >
                              <Box sx={boxStyle}>
                                <Container>
                                  {applicationDetailsID ? (
                                    <ApplicationDetails
                                      languageEditable={true}
                                      application={
                                        applications.filter(
                                          req => req.id === applicationDetailsID
                                        )[0]
                                      }
                                    />
                                  ) : null}
                                  <Box>
                                    <Button onClick={handleClose}>Close</Button>
                                  </Box>
                                </Container>
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
            </TableContainer>): null}
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={applications.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
};

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '40%',
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
  maxHeight: "95%",
  mb: 2,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  overflowY: "scroll",
};

StudentsTable.propTypes = {
  applications: PropTypes.array,
};

StudentsTable.defaultProps = {
  applications: [],
};

export default StudentsTable;
