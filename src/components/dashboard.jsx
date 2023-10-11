import { AppShell, Menu, Button, NavLink } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import "./dashboard.css";
import { useNavigate, Outlet } from "react-router-dom";
import { auth } from "./firebase";
import { BiLogOut } from "react-icons/Bi";

function Dashboard() {
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userDisplayName = user.displayName;
        setDisplayName(userDisplayName);
        console.log(displayName);
      } else {
        console.log("User is not logged in");
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <AppShell>
      <AppShell.Header
        style={{ backgroundColor: "crimson", height: "8rem", display: "flex" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "10rem",
            marginLeft: "1rem",
          }}
        >
          {displayName && (
            <span style={{ color: "white", fontSize: "2rem" }}>
              Hello, {displayName}
            </span>
          )}
        </div>

        <div className="header-buttons">
          <Button
            onClick={() => navigate("/dashboard/addBlog")}
            variant="outline"
            style={{ marginRight: "1rem", border: "3px solid white" }}
            color="white"
            radius="xl"
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "orange";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "white";
            }}
          >
            Add Blogs
          </Button>

          <Button
            onClick={() => navigate("/dashboard/viewBlog")}
            style={{
              marginRight: "1rem",
              border: "3px solid white",
            }}
            variant="outline"
            color="white"
            radius="xl"
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "orange";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "white";
            }}
          >
            View Blogs
          </Button>

          <Button
            style={{ marginRight: "1rem", border: "3px solid white" }}
            onClick={() => navigate("/dashboard/editBlog")}
            variant="outline"
            color="white"
            radius="xl"
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "orange";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "white";
            }}
          >
            Edit Blogs
          </Button>

          <div>
            <BiLogOut
              style={{
                fontSize: "3rem",
                color: "white",
                marginLeft: "50rem",
                cursor: "pointer",
              }}
              onClick={() => {
                auth.signOut;
                navigate("/");
              }}
            />
          </div>
        </div>
      </AppShell.Header>

      <div className="content">
        <Outlet />
      </div>
    </AppShell>
  );
}

export default Dashboard;
