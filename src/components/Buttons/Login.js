import { Button, Grid } from "@mui/material";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginFn, loginValidation } from "../../redux/actions/auth.action";

function Login() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const { login, loginErrors, disableButtonB } = useSelector(
        (state) => state.auth,
    );
    const [signupDisabled, setDisabled] = useState(true);

    const doLogin = () => {
        dispatch(loginValidation(login, loginErrors));
        dispatch(loginFn(login, history));
    };

    useEffect(() => {
        if (loginErrors) {
            let errors = false;
            // eslint-disable-next-line no-restricted-syntax
            for (const key in login) {
                if (!login[key] && key !== "remember") {
                    errors = true;
                    break;
                }
            }

            if (Object.keys(loginErrors).length === 0 && errors === false) {
                setDisabled(false);
            } else {
                setDisabled(true);
            }
        }
    }, [loginErrors, setDisabled, login, disableButtonB]);

    return (
        <Grid item xs={6} style={{ margin: "10px" }}>
            <Button
                disabled={signupDisabled || disableButtonB}
                onClick={() => doLogin()}
                variant="contained"
                style={{
                    backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                    color: "white"
                }}
            >
                Login
            </Button>
        </Grid>
    );
}

export default Login;
