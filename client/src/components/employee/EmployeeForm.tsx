import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import {
  addEmployeeAsync,
  editEmployeeAsync,
  selectEmployee,
  selectError,
  setEmployeeInQuestion,
} from "../../store/slices/employee";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface EmployeeFormProps {
  open: boolean;
  setOpen: Function;
  setSnackbarOpen: Function;
  setMessage: Function;
}

const StyledForm = styled(Form)(({ theme }) => ({
  paddingTop: 24,
}));

const EmployeeForm = ({
  open,
  setOpen,
  setMessage,
  setSnackbarOpen,
}: EmployeeFormProps) => {
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const employee = useAppSelector(selectEmployee);

  useEffect(() => {
    if (employee) {
      setIsEditMode(true);
      setValues(employee);
    } else {
      setIsEditMode(false);
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee]);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name is required"),
    surname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name is required"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Not a valid phone number"
      ),
    address: Yup.string().required("Address is required"),
    title: Yup.string().required("Title is required"),
  });

  const formik = useFormik({
    initialValues: {
      ...employee,
    },
    validationSchema: RegisterSchema,
    onSubmit: async ({ _id, name, surname, phoneNumber, address, title }) => {
      await dispatch(
        isEditMode
          ? editEmployeeAsync({
              _id,
              name,
              surname,
              phoneNumber,
              address,
              title,
            })
          : addEmployeeAsync({
              name,
              surname,
              phoneNumber,
              address,
              title,
            })
      );

      if (error) {
        setMessage(`Error registering!${error ? " " + error : ""}`);
      } else {
        setMessage(`Employee ${employee ? "updated" : "added"} successfully!`);
        dispatch(setEmployeeInQuestion({ employee: undefined }));
        setOpen(false);
      }
      setSnackbarOpen(true);
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setValues,
    resetForm,
  } = formik;

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{isEditMode ? "Edit " : "Add"} Employee</DialogTitle>
      <DialogContent>
        <FormikProvider value={formik}>
          <StyledForm autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  label="First name"
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />

                <TextField
                  fullWidth
                  label="Last name"
                  {...getFieldProps("surname")}
                  error={Boolean(touched.surname && errors.surname)}
                  helperText={touched.surname && errors.surname}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  type="text"
                  label="Title"
                  {...getFieldProps("title")}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
                <TextField
                  fullWidth
                  type="tel"
                  label="Phone Number"
                  {...getFieldProps("phoneNumber")}
                  error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
              </Stack>

              <TextField
                fullWidth
                type="text"
                label="Address"
                {...getFieldProps("address")}
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
              />
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {isEditMode ? "Edit" : "Add"} Employee
              </LoadingButton>
            </Stack>
          </StyledForm>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  );
}
export default EmployeeForm;