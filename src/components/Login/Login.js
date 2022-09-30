import { React } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginChange, loginValidation } from "../../redux/actions/auth.action";
import Login from "../Buttons/Login";
import Chat from "../Chat/Chat";
import ForgotPasswordLink from "../TextFields/ForgotPasswordLink";
import TextFieldLoginPassword from "../TextFields/LoginPassword";
import TextFieldLoginUsername from "../TextFields/LoginUsername";
import RememberMeSlider from "../TextFields/RememberMeSlider";

function LoginComponent() {
    const dispatch = useDispatch();
    const { login, loginErrors } = useSelector((state) => state.auth);
    
    const changeInput = (item, value) => {
        dispatch(loginChange(item, value));
        dispatch(loginValidation(login, loginErrors, item));
    };

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
        >
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

                <Grid item xs={12} style={{ margin: "10px" }}>
                    <Typography variant="h3">Welcome back!</Typography>
                </Grid>
                {TextFieldLoginUsername(changeInput)}
                {TextFieldLoginPassword(changeInput)}
                {RememberMeSlider(changeInput)}
                {Login()}
                {ForgotPasswordLink()}
            </Grid>

            <Grid
                container
                direction="row"
                justifyContent="center"
                style={{
                    background: "transparent",
                    textAlign: "center",
                }}
            >
                {/* <Typography variant="h5">Support</Typography> */}
                <Grid
                    item
                    xs={12}
                    style={{ marginTop: "20px" }}
                    data-id="2b7cf04fe5"
                    className="livechat_button"
                    textAlign="center"
                >
                    <Typography>Loading....</Typography>
                    <Chat />
                    <a href="https://www.livechat.com/?utm_source=chat_button&utm_medium=referral&utm_campaign=lc_13437153">
                        {" "}
                    </a>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default LoginComponent;
