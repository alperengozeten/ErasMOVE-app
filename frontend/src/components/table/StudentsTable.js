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
  TextField,
  Button,
  Select,
  Chip,
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

const defaultLanguages = ["English", "German", "Spanish", "French", "Turkish"];

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

  const handleOpenApplication = id => {
    console.log("id: ", id);
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

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - applications.length) : 0;

  const filterDepartments =
    department === ""
      ? applications
      : applications.filter(
          application => application.department === department
        );

  const filteredUsers = applySortFilter(
    filterDepartments,
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

  const handleEdit = () => {
    setDisabled(false);
  };

  const handleCloseEdit = () => {
    setDisabled(true);
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
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
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
                        department,
                        score,
                        selectedSemester,
                        selectedUniversities,
                        status,
                        avatarUrl,
                        languages,
                      } = row;

                      return (
                        <TableRow hover key={id} tabIndex={-1} role="checkbox">
                          <TableCell padding="checkbox"></TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar alt={name} src={avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="center">{department}</TableCell>

                          <TableCell align="center">{score}</TableCell>

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
                                onMouseEnter={handlePopoverOpen}
                                onMouseLeave={handlePopoverClose}
                              >
                                {`1. ${selectedUniversities[0]}`}
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
                                {selectedUniversities.map(
                                  (university, index) => (
                                    <Typography key={index} sx={{ p: 2 }}>
                                      {index + 1}. {university}
                                    </Typography>
                                  )
                                )}
                              </Popover>
                            </div>
                          </TableCell>

                          <TableCell align="center">
                            <Label
                              color={
                                (status === "waiting" && "error") || "success"
                              }
                            >
                              {sentenceCase(status)}
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
                                onClick={handleClickOpen}
                              >
                                <DescriptionIcon />
                              </IconButton>
                            </Tooltip>
                            <Modal
                              open={open}
                              onClose={handleClose}
                              BackdropProps={{
                                style: { backgroundColor: "rgba(0,0,0,0.04)" },
                              }}
                            >
                              <Box sx={style}>
                                <Container>
                                  <ApplicationDetails
                                    name={name}
                                    id={id}
                                    department={department}
                                    score={score}
                                    status={status}
                                    selectedSemester={selectedSemester}
                                    selectedUniversities={selectedUniversities}
                                    languages={languages}
                                  />
                                  <Box alignRight={true}>
                                    <Button onClick={handleClose}>Close</Button>
                                  </Box>
                                </Container>
                              </Box>
                            </Modal>
                          </TableCell>
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
};

StudentsTable.propTypes = {
  applications: PropTypes.array,
};

StudentsTable.defaultProps = {
  applications: [],
};

export default StudentsTable;
