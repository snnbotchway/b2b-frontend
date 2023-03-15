import React from "react";
import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const settings = ["Logout"];

function Header() {
	const { navigate, clearStorage } = useContext(AppContext);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = (setting) => {
		setAnchorElUser(null);
		if (setting === "Logout") {
			clearStorage();
			navigate("/login");
		}
	};

	return (
		<AppBar position="static" style={{ backgroundColor: "#252525" }}>
			<Container maxWidth="lg">
				<Toolbar disableGutters>
					<img
						sx={{
							display: ["none", "flex"],
						}}
						style={{ maxHeight: "4vh" }}
						src="https://i.ibb.co/Jrvn2s3/b2b.png"
						alt="app-logo"
					/>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							m: 2,
							display: "flex",
							fontFamily: ["Open Sans", "sans-serif"],
							fontWeight: 700,
							color: "inherit",
							textDecoration: "none",
						}}>
						B2B Feedback
					</Typography>

					<Box sx={{ flexGrow: 0, ml: "auto" }}>
						<Tooltip title="Open settings">
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0 }}>
								<Avatar src={"none"} alt="S" />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}>
							{settings.map((setting) => (
								<MenuItem
									key={setting}
									onClick={() =>
										handleCloseUserMenu(setting)
									}>
									<Typography textAlign="center">
										{setting}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default Header;
