import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  useTheme,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Header } from "../../../../components";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import organizationApi from "../../../../api/crm/organization";

const SuperUsersList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [orgSuperUsers, setOrgSuperUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchOrganizationsSuperUsers = async () => {
      try {
        const response = await organizationApi().getOrganizationsSuperUsers();
        const organizationUsersWithSno = response.data.map((org, index) => ({
          ...org,
          sno: index + 1, 
        }));
        setOrgSuperUsers(organizationUsersWithSno);
      } catch (error) {
        setError(error.message);
        setSnackbarSeverity("error");
        setSnackbarMessage(
          "Failed to fetch organizations superusers. Please try again."
        );
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizationsSuperUsers();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const columns = [
    {
      field: "sno",
      headerName: "S.No",
      flex: 0.5,
    },
    { field: "id", headerName: "ID", flex: 1.5 },
    {
      field: "organizationID",
      headerName: "Organization ID",
      flex: 1,
    },
    {
      field: "superUserEmail",
      headerName: "User Email",
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="All ORG. USERS" subtitle="List of all Org. Users" />
      <Box
        mt="40px"
        height="75vh"
        maxWidth="100%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-iconSeparator": {
            color: colors.primary[100],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.gray[100]} !important`,
          },
        }}
      >
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={orgSuperUsers}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row.id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            // checkboxSelection
          />
        )}
      </Box>
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

export default SuperUsersList;
