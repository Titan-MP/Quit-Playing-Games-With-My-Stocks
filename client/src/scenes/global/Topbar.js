                                                                /* ===================== IMPORTS ====================== */

import React, { useContext } from "react";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { ColorModeContext } from "../../theme";
import { LoginMenu } from "../form";
import { motion } from "framer-motion";


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
        console.log(event.currentTarget)
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

                                                                /* ----------------- Topbar Return -------------------- */
    return (
		<Box
			component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
			sx={{ padding: "1rem", backdropFilter: "blur(10px)" }}
		>
			<Box sx={{ flexGrow: 1 }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "flex-end"
					}}
				>
					<IconButton
						onClick={() => {
							colorMode.toggleColorMode();
						}}
					>
						{theme.palette.mode === "dark" ? (
							<LightModeOutlinedIcon />
						) : (
							<DarkModeOutlinedIcon />
						)}
					</IconButton>
					<Button
						size="large"
						aria-label="account of current user"
						aria-controls="primary-search-account-menu"
						aria-haspopup="true"
						color="inherit"
						startIcon={<LoginOutlinedIcon />}
						onClick={handleProfileMenuOpen}
					>
						Login
					</Button>
				</Box>
				{renderMobileMenu}
				{renderMenu}
			</Box>
		</Box>
	);
};

                                                                /* ==================== EXPORTS ======================= */
                                                                
export default Topbar;
