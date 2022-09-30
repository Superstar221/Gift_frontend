import { React } from "react";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerChange, testFn } from "../../redux/actions/auth.action";
import ResetPasswordEmail from "../Buttons/ResetPasswordEmail";
import TextFieldEmail from "../TextFields/Email";

function Forgot() {
    const dispatch = useDispatch();

    const { register, registerErrors } = useSelector((state) => state.auth);

    const processText = (item, value) => {
        dispatch(registerChange(item, value));
        dispatch(testFn(register, registerErrors, item));
    };

    return (
        <Grid container direction="row"
        justifyContent="center">
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                style={{
                    border: "1px solid",
                    width: "40%",
                    borderRadius: "20px",
                    backdropFilter: "blur(calc(var(--blur-size) * (-1 * var(--is-scrolling, 0) + 1)))",
                    color: "var(hsl(0, 0%, 100%))",
                    background: "linear-gradient(162deg, var(hsl(0, 0%, 100%, 0.08)) 28.7%, var(hsl(0, 0%, 100%, 0), var(hsl(0, 0%, 100%, 0.08))))",
                    isolation: "isolate",
                    minWidth: "450px",
                    marginTop: "50px"
                }}
            >
                <Grid item xs={12}>
                    <h1>Forgot your password?</h1>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        Enter your email and we send you a password reset link.
                    </Typography>
                </Grid>
                {TextFieldEmail(processText)}
                {ResetPasswordEmail()}
            </Grid>
        </Grid>
    );
}

export default Forgot;
