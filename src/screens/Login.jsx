import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import AlertDialog from "../components/AlertDialog";
import Copyright from "../components/Copyright";
import SimpleBackdrop from "../components/SimpleBackdrop";

<Copyright />;

const theme = createTheme();

export default function Login() {
	const { isLoggedIn, navigate, storeToken } = useContext(AppContext);

	useEffect(() => {
		if (isLoggedIn()) {
			navigate("/dashboard");
		}
	}, [isLoggedIn, navigate]);

	const [backdrop, setBackdrop] = useState(false);
	const [emailErr, setEmailErr] = useState();
	const [passwordErr, setPasswordErr] = useState();
	const [error, setError] = useState();
	const [detail, setDetail] = useState();

	const handleClose = () => {
		setError("");
		setDetail("");
	};

	const handleSubmit = async (event) => {
		setBackdrop(true);
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const payload = {
			email: data.get("email"),
			password: data.get("password"),
		};
		try {
			const response = await axios.post("/account/login/", payload);
			storeToken(response.data["token"]);
			navigate("/dashboard");
		} catch (error) {
			setEmailErr(error.response.data["email"]);
			setPasswordErr(error.response.data["password"]);
			setError(error.response.data["non_field_errors"]);
			setDetail(error.response.data["detail"]);
		} finally {
			setBackdrop(false);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			{error && (
				<AlertDialog
					title="Error"
					content={error}
					button1="GO BACK"
					handleClose={handleClose}
				/>
			)}
			{detail && (
				<AlertDialog
					title="Error"
					content={detail}
					button1="GO BACK"
					handleClose={handleClose}
				/>
			)}
			{backdrop && <SimpleBackdrop />}
			<Grid container component="main" sx={{ height: "100vh" }}>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={6}
					sx={{
						backgroundImage:
							"url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",
						backgroundRepeat: "no-repeat",
						backgroundColor: (t) =>
							t.palette.mode === "light"
								? t.palette.grey[50]
								: t.palette.grey[900],
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
				<Grid
					item
					xs={12}
					sm={8}
					md={6}
					component={Paper}
					elevation={6}
					square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}>
						<img
							style={{ maxHeight: "100px" }}
							src="https://i.ibb.co/Jrvn2s3/b2b.png"
							alt="app-logo"
						/>
						<Box sx={{ mt: 3 }}>
							<Typography component="h1" variant="h5">
								Login
							</Typography>
						</Box>
						<Box
							component="form"
							noValidate
							onSubmit={handleSubmit}
							sx={{ mt: 1 }}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email"
								name="email"
								autoComplete="email"
								autoFocus
								error={Boolean(emailErr)}
								helperText={emailErr}
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								error={Boolean(passwordErr)}
								helperText={passwordErr}
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}>
								Login
							</Button>
							<Copyright sx={{ mt: 5 }} />
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}
