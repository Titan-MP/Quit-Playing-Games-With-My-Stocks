import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";
import AddStockPosition from "../../components/AddStockPosition";
import { useQuery } from "@apollo/client";
import { QUERY_USER_POSITIONS } from "../../utils/queries";
import Auth from "../../utils/auth";
import PositionCards from "../../components/PositionCards";

const PositionsHeading = () => {
    return (
        <Grid
            container
            alignItems="center"
        >
            <Grid xs>
                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Positions
                </Typography>
            </Grid>
            <Grid>
                <AddStockPosition />
            </Grid>
        </Grid>
    );
};

const PositionsSection = () => {

    const { data: positionsData} = useQuery(
        QUERY_USER_POSITIONS,
        {
            variables: { user: Auth.getProfile().data._id }
        }
    );

    return (
        <React.Fragment>
            <PositionsHeading />
            {positionsData.positions.length > 0 && (
                <PositionCards positions={positionsData.positions} />
            )}
            {positionsData.positions.length === 0 && (
                <Typography variant="body1">You have no positions.</Typography>
            )}
        </React.Fragment>
    );
};

export default PositionsSection;
