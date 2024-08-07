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
import CopyAllIcon from "@mui/icons-material/CopyAll";
import organizationApi from "../../../../api/crm/organization";

const OrganizationList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await organizationApi().getAllOrganizations();
        const organizationsWithSno = response.data.map((org, index) => ({
          ...org,
          sno: index + 1,
        }));
        setOrganizations(organizationsWithSno);
      } catch (error) {
        setError(error.message);
        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to fetch organizations. Please try again.");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id).then(() => {
      setSnackbarMessage("ID copied to clipboard!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    }).catch(() => {
      setSnackbarMessage("Failed to copy ID.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const columns = [
    {
      field: "sno",
      headerName: "S.No",
      flex: 0.5,
    },
    {
      field: "organizationID",
      headerName: "Organization ID",
      flex: 2,
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          {params.value}
          <IconButton onClick={() => handleCopyId(params.value)}>
            <CopyAllIcon />
          </IconButton>
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "plan",
      headerName: "Subscription Plan",
      flex: 1,
    },
    {
      field: "dbname",
      headerName: "Database",
      flex: 1,
    },
    {
      field: "dbpassword",
      headerName: "Database Password",
      flex: 1,
    },
    {
      field: "active",
      headerName: "Active",
      flex: 0.5,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "deactivated_at",
      headerName: "Deactivated At",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="ORGANIZATIONS" subtitle="List of Organizations" />
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
          "& .name-column--cell": {
            color: colors.greenAccent[300],
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
            rows={organizations}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row.organizationID}
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

export default OrganizationList;
