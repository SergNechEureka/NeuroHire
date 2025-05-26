// src/AppBarWithLogout.tsx
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "./AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

type ApplicationBarProps = {
  onLogout: () => void;
};

const ApplicationBar: React.FC<ApplicationBarProps> = ({ onLogout }) =>  {
  const { token, handleLogout } = useAuth();
    const { t } = useTranslation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Neuro Hire
        </Typography>
        {token && (
          <Button color="inherit" onClick={handleLogout}>
            {t("logout")}
          </Button>
        )}
        <LanguageSwitcher />
      </Toolbar>
    </AppBar>
  );
}

export default ApplicationBar;