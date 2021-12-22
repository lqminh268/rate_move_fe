import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { API } from "../api_service";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Auth() {
  const initialState = {
    username: "",
    password: "",
  };

  const [data, setData] = React.useState(initialState);

  const [isLoginView, setIsLoginView] = React.useState(true);

  const navigate = useNavigate();

  const [token, setToken] = useCookies(["mr-token"]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const clearData = () => {
    setData({ ...initialState });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLoginView) {
      API.login(data)
        .then((res) => setToken("mr-token", res.token))
        .catch((err) => console.log(err));
    } else {
      API.register(data)
        .then((res) => console.log("success:", res))
        .then(clearData)
        .then(() => setIsLoginView(true))
        .catch((err) => console.log(err));
    }
  };

  React.useEffect(() => {
    if (token["mr-token"]) navigate("/");
  }, [token, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isLoginView ? "Sign in" : "Sign up"}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={data.username}
                onChange={handleChange}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                onChange={handleChange}
                value={data.password}
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isLoginView ? "Sign in" : "Sign up"}
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  {isLoginView ? (
                    <p variant="body2">
                      Don't have an account?{" "}
                      <Link href="#" onClick={() => setIsLoginView(false)}>
                        Sign Up
                      </Link>
                    </p>
                  ) : (
                    <p variant="body2">
                      Have an account?{" "}
                      <Link href="#" onClick={() => setIsLoginView(true)}>
                        Sign In
                      </Link>
                    </p>
                  )}
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
