import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../../redux/actions/auth.action";
import Header from "../Header";

export default function DrawerHeader() {
    const dispatch = useDispatch();
    const history = useNavigate();

    const token = localStorage.token || sessionStorage.token;

    useEffect(() => {
        if (token !== undefined) {
            if (token.length > 9) {
                dispatch(verifyToken());
            }
        }
    }, [token, dispatch, history]);
    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            style={{
                // backgroundColor: "#01314D",
                minHeight: "100vh",
            }}
        >
            <Header />
        </Grid>
    );
}
