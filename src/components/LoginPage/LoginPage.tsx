import React, { useState } from 'react';
import { TextField, Button, Container, Typography, CssBaseline, Card, CardContent, Box } from '@mui/material';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <Box
      sx={{
        fontFamily: 'Montserrat, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'url("./src/assets/images/bg2.png") center center no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Card className="card">
          <CardContent>
            <Typography component="h1" variant="h5" sx={{ color: 'white', marginBottom: 2 }}>
              Вход в портал ИАЦНГ
            </Typography>
            <form onSubmit={(e) => e.preventDefault()}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white', borderColor: 'white' } }}
                focused
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white', borderColor: 'white' } }}
                focused
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                onClick={handleLogin}
              >
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage;
