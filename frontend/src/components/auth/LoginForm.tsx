import React from 'react';
import { Box, Button, TextField, Typography, Alert, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useLoginForm } from '../../hooks/auth/useLoginForm';

interface LoginFormProps {
  onLogin: (token: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const { username, setUsername, password, setPassword, error, loading, handleSubmit } =
    useLoginForm({ onLogin });

  const { t } = useTranslation();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={3} align="center">
          {t('login')}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label={t('username')}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            required
            autoFocus
          />
          <TextField
            label={t('password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? t('loggingIn') : t('login')}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;
