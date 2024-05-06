import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../actions/user/user";

export default function UserDialog({ open, handleClose, id, rowData }) {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      avatar: "",
    },
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (id) {
      dispatch(updateUser({ ...data, id: id }));
      toast.success("Updated Successfully!");
    }
    handleClose(false);
  };

  useEffect(() => {
    if (id) {
      reset({
        first_name: rowData.first_name,
        last_name: rowData.last_name,
        email: rowData.email,
        avatar: "https://reqres.in/img/faces/1-image.jpg",
      });
    } else {
      reset({
        first_name: "",
        last_name: "",
        email: "",
        avatar: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, rowData]);

  const clearData = () => {
    reset({
      first_name: "",
      last_name: "",
      email: "",
    });
    // setId("");
    // setRowData("");
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={() => {
          handleClose(false);
          clearData();
        }}
        fullWidth
        maxWidth="md"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{id && "Edit User"}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              sx={{ my: 1 }}
              size="small"
              id="outlined-basic"
              {...register("first_name", { required: true, maxLength: 30 })}
              label="First Name"
              variant="outlined"
            />
            {errors.first_name?.type === "required" && (
              <p style={{ color: "red", fontSize: "12px" }}>
                First Name is required
              </p>
            )}
            {errors.first_name?.type === "maxLength" && (
              <p style={{ color: "red", fontSize: "12px" }}>
                First Name should be of 30 character only.
              </p>
            )}

            <TextField
              fullWidth
              sx={{ my: 1 }}
              size="small"
              id="outlined-basic"
              {...register("last_name", { required: true, maxLength: 30 })}
              label="Last Name"
              variant="outlined"
            />
            {errors.last_name?.type === "required" && (
              <p style={{ color: "red", fontSize: "12px" }}>
                Last Name is required
              </p>
            )}
            {errors.last_name?.type === "maxLength" && (
              <p style={{ color: "red", fontSize: "12px" }}>
                Last Name should be of 30 character only.
              </p>
            )}

            <TextField
              fullWidth
              sx={{ my: 1 }}
              size="small"
              id="outlined-basic"
              {...register("email", { required: true, maxLength: 30 })}
              label="Email"
              variant="outlined"
            />
            {errors.email?.type === "required" && (
              <p style={{ color: "red", fontSize: "12px" }}>
                Email is required
              </p>
            )}
            {errors.email?.type === "maxLength" && (
              <p style={{ color: "red", fontSize: "12px" }}>
                Email should be of 30 character only.
              </p>
            )}
          </DialogContent>

          <DialogActions>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
}
