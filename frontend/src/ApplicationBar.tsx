// src/AppBarWithLogout.tsx
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "./AuthContext";

type ApplicationBarProps = {
  onLogout: () => void;
};

const ApplicationBar: React.FC<ApplicationBarProps> = ({ onLogout }) =>  {
  const { token, handleLogout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Neuro Hire
        </Typography>
        {token && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default ApplicationBar;