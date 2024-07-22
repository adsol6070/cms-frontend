import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Header } from "../../../../components";
import { Formik } from "formik";
import * as yup from "yup";
import organizationApi from "../../../../api/crm/organization";

const initialValues = {
  organization: "",
  active: true,
  subscriptionPlan: "",
  address: "",
  phoneNumber: "",
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  organization: yup.string().required("Organization Name is required"),
  active: yup.boolean().required("required"),
  subscriptionPlan: yup.string().required("Plan is required"),
  address: yup.string().required("Address is required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone Number is required"),
});

const CreateOrganization = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleFormSubmit = async (values, actions) => {
    setLoading(true);
    try {
      await organizationApi().createOrganization(values);
      setSnackbarSeverity("success");
      setSnackbarMessage("Organization created successfully!");
      setSnackbarOpen(true);
      actions.resetForm({ values: initialValues });
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to create organization. Please try again.");
      setSnackbarOpen(true);
      console.error("Error creating organization:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box m="20px">
      <Header
        title="CREATE ORGANIZATION"
        subtitle="Create a New Organization"
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Organization Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.organization}
                name="organization"
                error={Boolean(touched.organization && errors.organization)}
                helperText={touched.organization && errors.organization}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Subscription Plan"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.subscriptionPlan}
                name="subscriptionPlan"
                error={Boolean(
                  touched.subscriptionPlan && errors.subscriptionPlan
                )}
                helperText={touched.subscriptionPlan && errors.subscriptionPlan}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="end"
              mt="20px"
            >
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : (
                  "Create Organization"
                )}
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateOrganization;
