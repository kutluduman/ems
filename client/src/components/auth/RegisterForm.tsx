import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import {
  registerAsync,
  selectError,
  selectToken,
} from "../../store/slices/auth";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const RegisterForm = () => {
  const navigate = useNavigate();
  const token = useAppSelector(selectToken);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>();

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
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    address: Yup.string().required("Address is required"),
    title: Yup.string().required("Title is required"),
    password: Yup.string().required("Password is is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      phoneNumber: "",
      email: "",
      address: "",
      title: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async ({
      name,
      surname,
      phoneNumber,
      email,
      address,
      title,
      password,
    }) => {
      await dispatch(
        registerAsync({
          name,
          surname,
          phoneNumber,
          email,
          address,
          title,
          password,
        })
      );
      if (token) {
        setMessage("Registration Successful!!");
        navigate("/dashboard", { replace: true });
      } else {
        setMessage(`Error registering!${error ? " " + error : ""}`);
      }
      setOpen(true);
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
                type="tel"
                label="Phone Number"
                {...getFieldProps("phoneNumber")}
                error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />

              <TextField
                fullWidth
                autoComplete="username"
                type="email"
                label="Email address"
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
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
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                label="Password"
                {...getFieldProps("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Register
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
      <Snackbar open={open} autoHideDuration={6000} message={message}>
        <Alert severity={error ? "error" : "success"} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
export default RegisterForm;