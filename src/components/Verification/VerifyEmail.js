import { React } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import sendVerificationEmail from "../../redux/actions/info.action";

function VerifyEmail() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.auth);

    const sendVerifyEmail = () => {
        dispatch(sendVerificationEmail());
    };
    return (
        <Grid item xs={12}>
            {currentUser !== null &&
            (currentUser.emailVerified === null ||
                currentUser.emailVerified === undefined ||
                currentUser.emailVerified === false) ? (
                <Grid
                    item
                    xs={12}
                    style={{
                        // backgroundColor: "#FFFFFF",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h5">Email Verification</Typography>
                    <Typography style={{ color: "red" }} variant="body1">
                        The email associated with your profile is not verified.
                        <br />
                        You will be unable to update your password or receive
                        emails.
                    </Typography>
                    <Button
                        onClick={() => sendVerifyEmail()}
                        variant="contained"
                        style={{
                            margin: "5px",
                            backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                            color: "white"
                        }}
                    >
                        Verify Email
                    </Button>
                </Grid>
            ) : (
                <Grid
                    item
                    xs={12}
                    style={{
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h5">Email Verification</Typography>
                    <Typography variant="body1">
                        The email associated with your profile is verified.
                        <br />
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
}

export default VerifyEmail;
