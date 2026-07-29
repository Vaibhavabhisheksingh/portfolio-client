import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

import Loader from "../components/common/Loader";

import ProtectedRoute from "./ProtectedRoute";

import ScrollToTop from "../components/common/ScrollToTop";

// Lazy Loaded Pages
const Login = lazy(() => import("../pages/Login"));

const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const Projects = lazy(() => import("../pages/admin/Projects"));
const Skills = lazy(() => import("../pages/admin/Skills"));
const Experience = lazy(() => import("../pages/admin/Experience"));
const Education = lazy(() => import("../pages/admin/Education"));
const Certificates = lazy(() => import("../pages/admin/Certificates"));
const Settings = lazy(() => import("../pages/admin/Settings"));
const Socials = lazy(() => import("../pages/admin/Socials"));
const Contact = lazy(() => import("../pages/admin/Contact"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
      <ScrollToTop />
        <Routes>
          {/* Public */}

          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />

          {/* Login */}

          <Route path="/login" element={<Login />} />

          {/* Dashboard */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />

            <Route path="projects" element={<Projects />} />

            <Route path="skills" element={<Skills />} />

            <Route path="experience" element={<Experience />} />

            <Route path="education" element={<Education />} />

            <Route path="certificates" element={<Certificates />} />

            <Route path="socials" element={<Socials />} />

            <Route path="settings" element={<Settings />} />

            <Route path="contact" element={<Contact />} />
          </Route>

          {/* 404 */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;