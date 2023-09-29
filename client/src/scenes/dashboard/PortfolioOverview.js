import Grid from "@mui/material/Unstable_Grid2";
import { Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";

const PortfolioOverview = () => {
    const coverContainer = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				delayChildren: 0.5,
				staggerChildren: 0.5,
				staggerDirection: 1
			}
		}
	};

	const coverItem = {
		hidden: { opacity: 0 },
		show: { opacity: 1 }
	};

    return (
        <Paper>
            <Grid
                height={"100vh"}
                container
                spacing={2}
                component={motion.div}
                variants={coverContainer}
                initial="hidden"
                animate="show"
            >
                <Grid
                    item
                    xs={12}
                    component={motion.div}
                    variants={coverItem}
                >
                    <Typography variant="h3">Portfolio Overview</Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={4}
                    component={motion.div}
                    variants={coverItem}
                    height={"75vh"}
                >
                    <Typography variant="h5">Net Liq.</Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={4}
                    component={motion.div}
                    variants={coverItem}
                    height={"75vh"}
                >
                    <Typography variant="h5">P/L YTD</Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={4}
                    component={motion.div}
                    variants={coverItem}
                    height={"75vh"}
                >
                    <Typography variant="h5">Buying Power</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PortfolioOverview;
