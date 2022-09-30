import { React } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import logo from "./logo.png";

export default function Auth() {
    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            style={{
                textAlign: "center",
                minWidth: "fit-content",
            }}
        >
            <Grid item xs={12}>
                <Paper
                    style={{
                        backgroundColor: "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <img
                        alt="login"
                        src={logo}
                        style={{
                            marginTop: "20px",
                            height: "150px"
                        }}
                    />
                    <Typography
                        variant="h5"
                        style={{
                            color: "#59b8e9",
                            fontSize: "6rem",
                            fontStyle: "italic",
                            fontFamily: "cursive"
                        }}
                    >
                        Colour your world
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Outlet />
            </Grid>
        </Grid>
    );
}
