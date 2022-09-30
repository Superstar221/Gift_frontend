import { Grid, Typography } from "@mui/material";
import { React, useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import Create2FA from "../../components/2FA/Create2FA";
import UpdateInfo from "../../components/Buttons/UpdateInfo";
import Chat from "../../components/Chat/Chat";
import EmailOptIn from "../../components/CheckBoxes/EmailOptIn";
import TextFieldConfirmEmail from "../../components/TextFields/ConfirmEmail";
import TextFieldEmail from "../../components/TextFields/Email";
import TextFieldFirstName from "../../components/TextFields/FirstName";
import TextFieldSurname from "../../components/TextFields/Surname";
import TextFieldTel from "../../components/TextFields/Tel";
import TextFieldUsername from "../../components/TextFields/Username";
import VerifyEmail from "../../components/Verification/VerifyEmail";
import {
    personalInfoCheck,
    registerChange,
} from "../../redux/actions/auth.action";
import Activate2FA from "./Activate2FA";
import ResetPassword from "./ResetPassword";

function Info() {
    const dispatch = useDispatch();
    const { register, registerErrors } = useSelector((state) => state.auth);
    const changeInput = (item, value) => {
        dispatch(registerChange(item, value));
        dispatch(personalInfoCheck(register, registerErrors, item));
    };
    const [signupDisabled, setDisabled] = useState(true);
    const { currentUser } = useSelector((state) => state.auth);
    const perpetualUser = useSelector((state) => state.dashboard.boards);

    useEffect(() => {
        let check = false;
        if (currentUser !== null && currentUser !== undefined) {
            if (currentUser.balanc === 0) {
                if (perpetualUser.length > 0) {
                    for (let i = 0; i < perpetualUser.length; i += 1) {
                        if (perpetualUser[i].board !== undefined) {
                            if (perpetualUser[i].board !== null) {
                                check = true;
                                break;
                            }
                        }
                    }
                }
            } else if (currentUser.twoFactorAuthSecret !== "true") {
                check = true;
            }
        }
        setDisabled(check);
    }, [currentUser, perpetualUser]);

    const page = () => (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{
                minWidth: "fit-content",
                // backgroundColor: "#01314D",
                minHeight: "100vh",
            }}
        >
            <Grid item xs={12} style={{ margin: "20px" }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    style={{
                        // backgroundColor: "#FFFFFF",
                        textAlign: "center",
                    }}
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        style={{
                            border: "1px solid",
                            // width: "40%",
                            borderRadius: "20px",
                            backdropFilter: "blur(calc(var(--blur-size) * (-1 * var(--is-scrolling, 0) + 1)))",
                            color: "var(hsl(0, 0%, 100%))",
                            background: "linear-gradient(162deg, var(hsl(0, 0%, 100%, 0.08)) 28.7%, var(hsl(0, 0%, 100%, 0), var(hsl(0, 0%, 100%, 0.08))))",
                            isolation: "isolate",
                            // minWidth: "450px",
                            marginTop: "50px"
                        }}
                    >

                        {/* <Typography variant="h5">Support</Typography> */}
                        <Grid
                            item
                            xs={12}
                            data-id="2b7cf04fe5"
                            className="livechat_button"
                        >
                            <Typography>Loading....</Typography>
                            <Chat />
                            <a href="https://www.livechat.com/?utm_source=chat_button&utm_medium=referral&utm_campaign=lc_13437153">
                                {" "}
                            </a>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
            <Grid item xs={12} style={{ margin: "20px" }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    style={{
                        border: "1px solid",
                        borderRadius: "20px",
                        backdropFilter: "blur(calc(var(--blur-size) * (-1 * var(--is-scrolling, 0) + 1)))",
                        color: "var(hsl(0, 0%, 100%))",
                        background: "linear-gradient(162deg, var(hsl(0, 0%, 100%, 0.08)) 28.7%, var(hsl(0, 0%, 100%, 0), var(hsl(0, 0%, 100%, 0.08))))",
                        isolation: "isolate",
                        marginTop: "50px"
                    }}
                >
                    <Create2FA />
                    {VerifyEmail()}
                </Grid>
            </Grid>
            <Grid item xs={12} style={{ margin: "20px" }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    // alignItems="flex-start"
                    style={{
                        border: "1px solid",
                        borderRadius: "20px",
                        backdropFilter: "blur(calc(var(--blur-size) * (-1 * var(--is-scrolling, 0) + 1)))",
                        color: "var(hsl(0, 0%, 100%))",
                        background: "linear-gradient(162deg, var(hsl(0, 0%, 100%, 0.08)) 28.7%, var(hsl(0, 0%, 100%, 0), var(hsl(0, 0%, 100%, 0.08))))",
                        isolation: "isolate",
                        marginTop: "50px"
                    }}
                >
                    <Typography variant="h5">Personal Info</Typography>
                    {TextFieldFirstName(changeInput, signupDisabled)}
                    {TextFieldSurname(changeInput, signupDisabled)}
                    {TextFieldEmail(changeInput)}
                    {TextFieldConfirmEmail(changeInput)}
                    {TextFieldUsername(changeInput, signupDisabled)}
                    {TextFieldTel(changeInput, signupDisabled)}
                    {EmailOptIn(changeInput)}
                    {UpdateInfo()}
                </Grid>
            </Grid>
            <Grid item xs={12} style={{
                        border: "1px solid",
                        borderRadius: "20px",
                        backdropFilter: "blur(calc(var(--blur-size) * (-1 * var(--is-scrolling, 0) + 1)))",
                        color: "var(hsl(0, 0%, 100%))",
                        background: "linear-gradient(162deg, var(hsl(0, 0%, 100%, 0.08)) 28.7%, var(hsl(0, 0%, 100%, 0), var(hsl(0, 0%, 100%, 0.08))))",
                        isolation: "isolate",
                        marginTop: "50px"
                    }}>
                <ResetPassword />
            </Grid>
            <Grid item xs={12} style={{
                        border: "1px solid",
                        borderRadius: "20px",
                        backdropFilter: "blur(calc(var(--blur-size) * (-1 * var(--is-scrolling, 0) + 1)))",
                        color: "var(hsl(0, 0%, 100%))",
                        background: "linear-gradient(162deg, var(hsl(0, 0%, 100%, 0.08)) 28.7%, var(hsl(0, 0%, 100%, 0), var(hsl(0, 0%, 100%, 0.08))))",
                        isolation: "isolate",
                        marginTop: "50px"
                    }}>
                <Activate2FA />
            </Grid>
        </Grid>
    );

    return <Grid container>{page()}</Grid>;
}

export default Info;
