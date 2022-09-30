import {
    Button,
    Dialog,
    DialogContent,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { verifyQRPasscode } from "../../redux/actions/dashboard.action";

function Test2FA() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [passcode, setPasscode] = useState("");
    const [open2FARequest, setOpen2FARequest] = useState(false);
    const { auth } = useSelector((state) => state);
    const [passcodeError, setPasscodeError] = useState(false);

    useEffect(() => {
        setOpen2FARequest(false);
        if (auth.currentUser === null) {
            if (
                auth.disable2FA === false &&
                auth.login.loginname !== "" &&
                auth.login.password !== ""
            ) {
                setOpen2FARequest(true);
            }
        } else if (auth.disable2FA === true) {
            setOpen2FARequest(false);
        }
    }, [auth, auth.currentUser, auth.disable2FA, setOpen2FARequest]);

    const settingPassCode = (e) => {
        if (e.target.value.length === 6 && passcodeError === true) {
            setPasscodeError(false);
        }
        setPasscode(e.target.value);
    };

    const closeQRCode5 = () => {
        if (passcode.length !== 6) {
            setPasscodeError(true);
        } else {
            setOpen2FARequest(false);
            dispatch(
                verifyQRPasscode(
                    passcode,
                    auth.login.loginname,
                    auth.login.password,
                    auth.login.remember,
                    history,
                ),
            );
        }
    };

    const copyLinkModal = () => (
        <Dialog open={open2FARequest} maxWidth="md">
            <DialogContent style={{ padding: 20 }}>
                <Typography variant="body1">
                    Please enter your passcode.
                </Typography>
                <br />
                <Grid item xs={9}>
                    <TextField
                        id="outlined-passcode-input"
                        error={passcodeError}
                        helperText={
                            passcodeError && "Passcode needs to be 6 numbers"
                        }
                        label="Passcode"
                        type="Passcode"
                        inputProps={{ maxLength: 6 }}
                        onChange={(e) => settingPassCode(e)}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        style={{
                            margin: "5px",
                            backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                            color: "white"
                        }}
                        onClick={() => closeQRCode5()}
                    >
                        Submit
                    </Button>
                </Grid>
            </DialogContent>
        </Dialog>
    );

    return <div style={{ position: "absolute" }}>{copyLinkModal()}</div>;
}

export default Test2FA;
