import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../actions/user/user.js";
import { toast } from "react-toastify";
import UserDialog from "./UserEditDialog.js";
import MessageBox from "../components/MessageBox.js";

export default function UserPage() {
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState("");
  const [id, setId] = useState("");
  const { users, loading, error } = useSelector(
    (state) => state && state?.userReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("users")) {
      dispatch(getUsers());
    }
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ p: 2 }}>
      {error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <Grid container>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Typography variant="h5" sx={{ my: 2 }}>
              User Listing
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <TableContainer>
              <Table area-label="simple-table">
                <TableHead>
                  <TableRow sx={{ background: "#0476D0" }}>
                    <TableCell>Email</TableCell>
                    <TableCell align="right">First Name</TableCell>
                    <TableCell align="right">Last Name</TableCell>
                    <TableCell align="right">Avatar</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users && users.length > 0 ? (
                    users.map((user, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{user.email} </TableCell>
                          <TableCell align="right">{user.first_name}</TableCell>
                          <TableCell align="right">{user.last_name}</TableCell>
                          <TableCell align="right">
                            <img
                              src={user.avatar}
                              alt="user-img"
                              height={60}
                              width={60}
                            ></img>
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              variant="contained"
                              sx={{ mr: 2 }}
                              onClick={() => {
                                setOpen(true);
                                setId(user.id);
                                setRowData(user);
                              }}
                            >
                              {" "}
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() => {
                                dispatch(deleteUser(user.id));
                                toast.success("Deleted Successfully!");
                              }}
                            >
                              {" "}
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5}>{"No Data Found..."} </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
      {open && (
        <UserDialog
          open={open}
          handleClose={handleClose}
          id={id}
          rowData={rowData}
        />
      )}
    </Box>
  );
}
