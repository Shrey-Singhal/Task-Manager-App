import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "./contexts/sidebarContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ToDo from "./pages/ToDo";
import InProgress from "./pages/InProgress";
import Completed from "./pages/Completed";
import Trash from "./pages/Trash";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./contexts/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { TasksProvider } from "./contexts/tasksContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>        
        <Routes>
          <Route             
            element={
              <ProtectedRoute>
                <SidebarProvider>
                  <TasksProvider>
                    <Layout />
                  </TasksProvider>
                  
                </SidebarProvider>
              </ProtectedRoute>                         
            }>
            <Route index path='/' element={<Navigate to='/login' />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/todo" element={<ToDo />} />
            <Route path="/inprogress" element={<InProgress />} />
            <Route path="/completed" element={<Completed />} />
            <Route path="/trash" element={<Trash />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
        </Routes>
        
      </BrowserRouter>

    </AuthProvider>
      

  );
}

export default App;