import React from "react";
import { filter } from "lodash";
import { useState } from "react";
import PropTypes from "prop-types";

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
  Button,
  Modal,
  Box
} from "@mui/material";
// components
import Scrollbar from "./scrollbar";
// sections
import { AnnouncementHead } from "./announcement";
import { AnnouncementToolbar} from "./announcement";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "from", label: "From", alignRight: false },
  { id: "title", label: "Title", alignRight: false },
  { id: "description", label: "Description", alignRight: false },
  { id: "date", label: "Date", alignRight: false },
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

const AnnouncementTable = ({ announcements, createAnnouncementRequest, authType, userId, user }) => {
 

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [order, setOrder] = useState("asc");

  const [orderBy, setOrderBy] = useState("name");

  const [filterName] = useState("");

  // const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredUsers = applySortFilter(
    announcements,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Container>
        <Card>
        <AnnouncementToolbar user={user} authType={authType} userId={userId} createAnnouncementRequest={createAnnouncementRequest} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <AnnouncementHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />

                <TableBody>
                  {filteredUsers.map(row => {
                    const { id, announcedDate, departmentCoordinator, title, description } =
                      row;

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
                              {departmentCoordinator?.name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="center">{title}</TableCell>

                        <TableCell align="center">{description.substring(0, 30) + (description.length > 30 ? "..." : '')}</TableCell>

                        <TableCell align="center">{announcedDate}</TableCell>


                        <TableCell align="right">
                          <Button
                            variant="contained"
                            color="inherit"
                            size="small"
                            onClick={handleOpen}
                          >
                            Details
                          </Button>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            BackdropProps={{ style : {backgroundColor: "rgba(0,0,0,0.04)"}}}

                          >
                            <Box sx={style}>
                              <Typography
                                id="modal-modal-title"
                                variant="h4"
                                component="h2"
                              >
                                {departmentCoordinator?.name}
                              </Typography>
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                              >
                                {description}
                              </Typography>
                            </Box>
                          </Modal>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {/* {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )} */}
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

          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={announcements.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
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
  width: '50%',
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
};
AnnouncementTable.propTypes = {
  announcements: PropTypes.array,
  createAnnouncementRequest: PropTypes.func,
  authType: PropTypes.string,
  userId: PropTypes.string,
  user: PropTypes.object,
};

AnnouncementTable.defaultProps = {
  announcements: [],
};

export default AnnouncementTable;
