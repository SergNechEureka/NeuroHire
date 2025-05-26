import React from "react";
import { Box, Button, TextField, Typography, Alert, Paper } from "@mui/material";

import { useLoginForm } from "./useLoginForm";

interface LoginFormProps {
  onLogin: (token: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => { 
    const {
        username,
        setUsername,
        password,
        setPassword,
        error,
        loading,
        handleSubmit
    } = useLoginForm({ onLogin });

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Paper elevation={3} sx={{ p: 4, width: 400 }}>
                <Typography variant="h5" mb={3} align="center">Login</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                        autoFocus
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        sx={{ mt: 2 }}
                    >
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </form>
            </Paper>
        </Box>
    );
};

export default LoginForm;