                                                                /* ===================== IMPORTS ====================== */

import React, { useContext } from "react";
import { Box, Button, IconButton, SvgIcon, useTheme } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { ColorModeContext } from "../../theme";
import { LoginMenu } from "../form";
import { motion } from "framer-motion";
import Auth from '../../utils/auth';
                                                                /* ==================== COMPONENTS ==================== */

                                                                /* ---------------------- TOPBAR ---------------------- */
const Topbar = () => {
                                                                /* ------------------- State Variables ------------------ */
    const theme = useTheme();
	const colorMode = useContext(ColorModeContext);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

                                                                /* ---------- Event Handlers for Topbar Menu ---------- */
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

                                                                /* ------------------ Render Components ----------------- */
                                                                /* Menu for non-mobile devices                            */
    const renderMenu = (
        <Menu
            sx={{ marginTop: "50px" }}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {anchorEl && <LoginMenu setAnchorEl={setAnchorEl} />}
        </Menu>
    );

                                                                /* Menu for mobile devices                                */
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <PersonOutlinedIcon />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "flex-end",
				alignItems: "center",
				width: "100%",
				padding: theme.spacing(2),
				position: "relative",
				top: 0,
				left: 0
			}}
		>
			<Box>
				<IconButton
					sx={{ marginRight: "20px" }}
					onClick={() => colorMode.toggleColorMode()}
				>
					{colorMode.colorMode === "light" ? (
						<LightModeOutlinedIcon />
					) : (
						<DarkModeOutlinedIcon />
					)}
				</IconButton>
				<Button
					variant="contained"
					color="primary"
					sx={{
						marginRight: "20px",
						backgroundColor: theme.palette.primary.main,
						"&:hover": {
							backgroundColor: theme.palette.primary.dark
						}
					}}
					onClick={
						Auth.loggedIn() ? Auth.logout : handleProfileMenuOpen
					}
				>
					{Auth.loggedIn() ? (
						<LogoutOutlinedIcon />
					) : (
						<LoginOutlinedIcon />
					)}
				</Button>
			</Box>
			{renderMobileMenu}
			{renderMenu}
		</Box>
	);
};

                                                                /* ==================== EXPORTS ======================= */
                                                                
export default Topbar;
