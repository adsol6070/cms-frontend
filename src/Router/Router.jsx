import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthLayout } from "../layouts";
import AppLayout from "../App";
import {
  Dashboard,
  Team,
  Invoices,
  Bar,
  Line,
  Pie,
  FAQ,
  Geography,
  Calendar,
  Stream,
  CreateOrganization,
  OrganizationList,
  SuperUsersList,
  Register,
  Login,
} from "../scenes";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team"
            element={
              <ProtectedRoute>
                <Team />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-organization"
            element={
              <ProtectedRoute>
                <CreateOrganization />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-organizations"
            element={
              <ProtectedRoute>
                <OrganizationList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-superusers"
            element={
              <ProtectedRoute>
                <SuperUsersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoices"
            element={
              <ProtectedRoute>
                <Invoices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bar"
            element={
              <ProtectedRoute>
                <Bar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pie"
            element={
              <ProtectedRoute>
                <Pie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stream"
            element={
              <ProtectedRoute>
                <Stream />
              </ProtectedRoute>
            }
          />
          <Route
            path="/line"
            element={
              <ProtectedRoute>
                <Line />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faq"
            element={
              <ProtectedRoute>
                <FAQ />
              </ProtectedRoute>
            }
          />
          <Route
            path="/geography"
            element={
              <ProtectedRoute>
                <Geography />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
