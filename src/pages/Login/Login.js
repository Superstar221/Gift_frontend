import { Grid } from "@mui/material";
import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Test2FA from "../../components/2FA/Test2FA";
import Agree from "../../components/Agree/Agree";
import LoginComponent from "../../components/Login/Login";
import { verifyToken } from "../../redux/actions/auth.action";

function Login() {
    const dispatch = useDispatch();
    const history = useNavigate();

    const token = localStorage.token || sessionStorage.token;

    useEffect(() => {
        if (token !== undefined) {
            if (token.length > 9) {
                dispatch(verifyToken(history));
            }
        }
    }, [token, dispatch, history]);

    return (
        <Grid>
            <Agree />
            <Test2FA />
            <LoginComponent />
        </Grid>
    );
}

export default Login;
