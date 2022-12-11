import React from "react";
import PropTypes from "prop-types";
// @mui
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
} from "@mui/material";
// components
import Scrollbar from "./scrollbar";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

const ToDoListTable = ({ toDoLists }) => {

  return (
    <>
      <Container>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>

                <TableBody>
                  {toDoLists.map(row => {
                    const { id, toDo } =
                      row;

                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell padding="checkbox"><HourglassBottomIcon /> </TableCell>
                        
                        <TableCell align="left">{toDo}</TableCell>

                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
};
ToDoListTable.propTypes = {
    toDoLists: PropTypes.array,
};

ToDoListTable.defaultProps = {
    toDoLists: [],
};

export default ToDoListTable;
