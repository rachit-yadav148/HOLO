import * as React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Typography,
  Snackbar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Optional: import { AuthContext } from '../contexts/AuthContext';

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [formState, setFormState] = React.useState(0); // 0 = Login, 1 = Register
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  // const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (formState === 1) {
        // const result = await handleRegister(name, username, password);
        setMessage('Registered successfully!');
        setUsername('');
        setPassword('');
        setName('');
        setFormState(0);
        setError('');
        setOpen(true);
      } else {
        // const result = await handleLogin(username, password);
        setMessage('Logged in successfully!');
        setError('');
        setOpen(true);

        // ✅ Redirect to home page after a short delay
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      }
    } catch (err) {
      const message = err?.response?.data?.message || 'Something went wrong.';
      setError(message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          backgroundImage: `url("/bg_img.jpg")`, // ✅ Image should be in `public/bg_img.jpg`
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: { xs: '100%', sm: '400px' },
            height: '100vh',
            px: 4,
            py: 8,
            borderRadius: 0,
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Button
                variant={formState === 0 ? 'contained' : 'outlined'}
                onClick={() => setFormState(0)}
              >
                Sign In
              </Button>
              <Button
                variant={formState === 1 ? 'contained' : 'outlined'}
                onClick={() => setFormState(1)}
              >
                Sign Up
              </Button>
            </Box>

            <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                id="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Typography variant="body2" color="error" mt={1}>
                  {error}
                </Typography>
              )}
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAuth}
              >
                {formState === 0 ? 'Login' : 'Register'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        message={message}
        onClose={() => setOpen(false)}
      />
    </ThemeProvider>
  );
}
