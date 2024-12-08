import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./contexts/sidebarContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ToDo from "./pages/ToDo";
import InProgress from "./pages/InProgress";
import Completed from "./pages/Completed";
import Trash from "./pages/Trash";

function App() {
  return (
    <SidebarProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/todo" element={<ToDo />} />
            <Route path="/inprogress" element={<InProgress />} />
            <Route path="/completed" element={<Completed />} />
            <Route path="/trash" element={<Trash />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </SidebarProvider>
  );
}

export default App;
