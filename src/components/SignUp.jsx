import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AlertComponent } from "./reusable/AlertComponent";
import { InputImage } from "./reusable/InputImage";

const defaultTheme = createTheme();

export default function SignUp() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const [inputsErrors, setInputsErrors] = useState({
    firstNameErr: false,
    lastNameErr: false,
    emailErr: false,
    imageErr: false,
    passwordErr: false,
    confirmPasswordErr: false,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setInputs((values) => ({ ...values, image: file.name }));
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setImagePreview(null);
    }
  };

  // invalid email address!
  const errorHandling = () => {
    setInputsErrors({
      firstNameErr: !inputs.firstName.length
        ? "First Name input is required"
        : "",
      lastNameErr: !inputs.lastName.length ? "Last Name input is required" : "",
      emailErr: !inputs.email.length
        ? "Email input is required"
        : !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs.email)
        ? "Invalid email address!"
        : "",
      imageErr: !inputs.image.length ? "image  is required" : "",
      passwordErr: !inputs.password.length
        ? "password input is required"
        : inputs.password.length <= 8
        ? "password length must be greater than 9"
        : inputs.password.length >= 12
        ? "password length must be smaller than 12"
        : "",
      confirmPasswordErr: !inputs.confirmPassword.length
        ? "confirm Password input is required"
        : inputs.confirmPassword != inputs.password
        ? "This must be equal the previous Password"
        : "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    errorHandling();

    inputs.firstName &&
      inputs.lastName &&
      inputs.email &&
      inputs.image &&
      inputs.password &&
      inputs.password.length >= 8 &&
      inputs.password.length <= 12 &&
      inputs.confirmPassword == inputs.password &&
      console.log(inputs);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />

                <AlertComponent err={inputsErrors.firstNameErr} />
              </Grid>{" "}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  autoComplete="family-name"
                />

                <AlertComponent err={inputsErrors.lastNameErr} />
              </Grid>{" "}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  autoComplete="email"
                />

                <AlertComponent err={inputsErrors.emailErr} />
              </Grid>{" "}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  onChange={handleChange}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />

                <AlertComponent err={inputsErrors.passwordErr} />
              </Grid>{" "}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  onChange={handleChange}
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                />

                <AlertComponent err={inputsErrors.confirmPasswordErr} />
              </Grid>{" "}
              <Grid
                item
                xs={12}
                style={{
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <InputImage
                  handleImageChange={handleImageChange}
                  selectedFile={selectedFile}
                  imagePreview={imagePreview}
                  err={inputsErrors.imageErr}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
