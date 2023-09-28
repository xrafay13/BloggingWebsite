import { AppShell, Menu, Button, NavLink } from "@mantine/core";
import React from "react";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import "./dashboard.css";
import { useNavigate, Outlet } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <AppShell>
      <AppShell.Header
        style={{ backgroundColor: "crimson" }}
        height={80}
        p="xl"
      >
        <div className="header-buttons">
          <Button
            onClick={() => navigate("/dashboard/addBlog")}
            className="button"
            variant="outline"
            style={{ marginRight: "1rem", border: "3px solid white" }}
            color="white"
            radius="xl"
          >
            Add Blogs
          </Button>
          <Button
            onClick={() => navigate("/dashboard/viewBlog")}
            className="button"
            style={{ marginRight: "1rem", border: "3px solid white" }}
            variant="outline"
            color="white"
            radius="xl"
          >
            View Blogs
          </Button>

          <Button
            style={{ marginRight: "1rem", border: "3px solid white" }}
            className="button"
            variant="outline"
            color="white"
            radius="xl"
          >
            Edit Blogs
          </Button>
        </div>
      </AppShell.Header>

      <Outlet />
    </AppShell>
  );
}

export default Dashboard;
