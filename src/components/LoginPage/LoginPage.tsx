import React, { useState, useRef } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  CssBaseline,
  Card,
  CardContent,
  Box,
  Alert,
  Collapse,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha"; // Import the reCAPTCHA component
import { setCurrentCompanyId } from "./authSlice";
import { useDispatch } from "react-redux";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [alertVisible, setAlertVisible] = useState(false); // Initialize to false
  const dispatch = useDispatch();
  const recaptchaRef = useRef<ReCAPTCHA | null>(null); // Create a ref for the reCAPTCHA component

  const handleLogin = async () => {
    try {
      setError(""); // Clear any previous error messages

      // Verify the reCAPTCHA response
      const recaptchaToken = await recaptchaRef.current?.executeAsync();

      if (recaptchaToken) {
        // reCAPTCHA verified, proceed with authentication
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
        dispatch(setCurrentCompanyId(57));
      }
    } catch (error) {
      setError("Неверный адрес электронной почты или пароль"); // Set the error message
      setAlertVisible(true); // Make sure the alert is visible
    }
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  return (
    <Box
      sx={{
        fontFamily: "Montserrat, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background:
          'url("./src/assets/images/bg2.png") center center no-repeat',
        backgroundSize: "cover",
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Card className="card">
          <CardContent>
            <Typography
              component="h1"
              variant="h5"
              sx={{ color: "white", marginBottom: 2 }}
            >
              Вход в портал САЦ ТЭК РК
            </Typography>
            <Collapse in={alertVisible}>
              <Alert
                severity="error"
                sx={{ marginBottom: 2 }}
                onClose={handleCloseAlert}
              >
                {error}
              </Alert>
            </Collapse>
            <form onSubmit={(e) => e.preventDefault()}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Почта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white", borderColor: "white" } }}
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
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white", borderColor: "white" } }}
                focused
              />
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Ld_9KMnAAAAAB_hOrFyDlbpCyPGZRV_X_zze-BF"
                size="invisible"
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
