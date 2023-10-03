import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import MenuToggle from "./MenuToggle";
import Navigation from "./Navigation";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const animationVariant = {
	open: (height = 1000) => ({
		clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
		transition: {
			delay: 0.5,
			type: "spring",
			stiffness: 20,
			restDelta: 2
		}
	}),
	closed: {
		clipPath: "circle(30px at 40px 40px)",
		transition: {
			delay: 0.5,
			type: "spring",
			stiffness: 400,
			damping: 40
		}
	}
};

const Sidebar = ({ onOpen, onClose }) => {
    const theme = useTheme();
	const [isOpen, toggleOpen] = useCycle(false, true);
	const containerRef = useRef(null);
	const { height } = "100%";

    React.useEffect(() => {
        if (isOpen) {
            onOpen();
        } else {
            onClose();
        }
    }, [isOpen, onOpen, onClose]);

	return (
		<Box
			sx={{
				position: "absolute",
				top: 0,
				left: 0,
				bottom: 0,
				width: "300px",
				height: "100%",
                zIndex: 1,
			}}
			component={motion.nav}
			initial={false}
			animate={isOpen ? "open" : "closed"}
			custom={height}
			ref={containerRef}
		>
            <Box
                component={motion.div}
                variants={animationVariant}
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: "300px",
                    backgroundColor: theme.palette.primary.main,
                }}
            />
			<Navigation />
			<MenuToggle toggle={() => toggleOpen()} />
		</Box>
	);
};

export default Sidebar;
