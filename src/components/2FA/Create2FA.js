import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { disable2FAPopUp, set2FASecret } from "../../redux/actions/auth.action";
import {
    get2FAActivationKey,
    verifyQRPasscodeAndSaveSecret,
} from "../../redux/actions/dashboard.action";
import setNotes from "../../redux/actions/notification.action";

function Create2FA() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [disableButton] = useState(false);
    const [passcode, setPasscode] = useState("");
    const [useMobile, setUseMobile] = useState(false);
    const [useDesktop, setUseDesktop] = useState(false);
    const [open2FACreate, setOpen2FACreate] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const { auth } = useSelector((state) => state);

    useEffect(() => {
        if (auth.currentUser) {
            if (auth.disable2FA === false) {
                if (open2FACreate === false) {
                    dispatch(dispatch(set2FASecret(null)));
                }
                if (auth.currentUser.twoFactorAuthSecret === "false") {
                    setOpen2FACreate(true);
                }
            } else {
                setOpen2FACreate(false);
            }
        }
    }, [auth.currentUser, auth.disable2FA, dispatch, open2FACreate]);

    const getQRCode = () => {
        dispatch(get2FAActivationKey(auth.currentUser?.username));
    };

    const settingPassCode = (e) => {
        if (submitError === true && e.target.value.length === 6) {
            setSubmitError(false);
        }
        setPasscode(e.target.value);
    };

    const closeQRCode2 = () => {
        setUseDesktop(false);
        setUseMobile(false);
        dispatch(disable2FAPopUp(true));
    };

    const closeQRCode3 = () => {
        dispatch(setNotes({ error: "2FA Activation Cancelled" }));
        setUseDesktop(false);
        setUseMobile(false);
        dispatch(disable2FAPopUp(true));
    };

    const closeQRCode4 = () => {
        if (passcode.length === 6) {
            dispatch(
                verifyQRPasscodeAndSaveSecret(
                    auth.create2FADetails.base32,
                    passcode,
                    history,
                ),
            );
        } else {
            setSubmitError(true);
        }
    };

    const copyLinkModal = () => {
        if (auth.create2FADetails === null) {
            return (
                <Grid container>
                    <Dialog open={open2FACreate} maxWidth="md">
                        <Grid item xs={12}>
                            <DialogTitle>
                                <Typography variant="body1">
                                    To increase your user security we recommend
                                    you add 2FA to your profile.
                                </Typography>
                            </DialogTitle>
                        </Grid>
                        <DialogContent style={{ padding: 20 }}>
                            <Button
                                onClick={() => getQRCode()}
                                disabled={disableButton}
                                variant="contained"
                                style={{
                                    margin: "5px",
                                    backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                                    color: "white"
                                }}
                            >
                                Activate Now
                            </Button>
                            <Button
                                onClick={() => closeQRCode2()}
                                disabled={disableButton}
                                variant="contained"
                                style={{
                                    margin: "5px",
                                    backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                                    color: "white"
                                }}
                            >
                                Remind me later
                            </Button>
                        </DialogContent>
                    </Dialog>
                </Grid>
            );
        }
        if (useMobile === true) {
            return (
                <Dialog open={open2FACreate} maxWidth="md">
                    <DialogTitle>
                        <Typography variant="body1">
                            To activate 2FA on your mobile please enter the code
                            below as your setup key on your authenticator app:
                        </Typography>
                    </DialogTitle>
                    <DialogContent style={{ padding: 20 }}>
                        <Typography variant="h5">Setup Key:</Typography>
                        <TextField
                            id="outlined-setupkey-input"
                            type="SetupKey"
                            value={auth.create2FADetails.base32}
                            style={{ width: "600px" }}
                        />
                        <br />
                        <Typography variant="body1">
                            When you have scanned the device please enter the
                            corresponding 2FA code in the text box below
                        </Typography>
                        <br />
                        <Grid item xs={9}>
                            <TextField
                                id="outlined-passcode-input"
                                error={submitError}
                                helperText={
                                    submitError &&
                                    "Your passcode needs to be 6 numbers"
                                }
                                label="Passcode"
                                type="Passcode"
                                inputProps={{ maxLength: 6 }}
                                onChange={(e) => settingPassCode(e)}
                                disabled={disableButton}
                            />
                        </Grid>
                        <Button
                            onClick={() => closeQRCode4()}
                            disabled={disableButton}
                            variant="contained"
                            style={{
                                margin: "5px",
                                backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                                color: "white"
                            }}
                        >
                            Submit
                        </Button>
                        <Button
                            onClick={() => closeQRCode3()}
                            disabled={disableButton}
                            variant="contained"
                            style={{
                                margin: "5px",
                                backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                                color: "white"
                            }}
                        >
                            Remind me later
                        </Button>
                    </DialogContent>
                </Dialog>
            );
        }
        if (useDesktop === true) {
            return (
                <Dialog open={open2FACreate} maxWidth="md">
                    <DialogTitle>
                        <Typography variant="body1">
                            Using a mobile device with an authenticator app,
                            <br /> please scan this QR code:
                        </Typography>
                    </DialogTitle>
                    <DialogContent style={{ padding: 20 }}>
                        <img
                            style={{ width: "400px" }}
                            alt="qrcode"
                            src={auth.create2FADetails.qrCode}
                        />
                        <Typography variant="body1">
                            When you have scanned the device please enter the
                            <br />
                            corresponding 2FA code in the text box below
                        </Typography>
                        <br />
                        <TextField
                            id="outlined-passcode-input"
                            error={submitError}
                            helperText={
                                submitError &&
                                "Your passcode needs to be 6 numbers"
                            }
                            label="Passcode"
                            type="Passcode"
                            inputProps={{ maxLength: 6 }}
                            onChange={(e) => settingPassCode(e)}
                            disabled={disableButton}
                        />
                        <Button
                            onClick={() => closeQRCode4()}
                            disabled={disableButton}
                            variant="contained"
                            style={{
                                margin: "5px",
                                backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                                color: "white"
                            }}
                        >
                            Submit
                        </Button>
                        <Button
                            onClick={() => closeQRCode3()}
                            disabled={disableButton}
                            variant="contained"
                            style={{
                                margin: "5px",
                                backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                                color: "white"
                            }}
                        >
                            Remind me later
                        </Button>
                    </DialogContent>
                </Dialog>
            );
        }
        return (
            <Dialog open={open2FACreate} maxWidth="md">
                <DialogTitle>
                    <Typography variant="body1">
                        Please choose from one of the following to activate 2FA:
                    </Typography>
                </DialogTitle>
                <DialogContent style={{ padding: 20 }}>
                    <Button
                        variant="contained"
                        style={{
                            margin: "5px",
                            backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                            color: "white"
                        }}
                        onClick={() => setUseMobile(true)}
                        disabled={disableButton}
                    >
                        I am browsing this site on my Mobile Cellphone
                    </Button>
                    <Button
                        variant="contained"
                        style={{
                            margin: "5px",
                            backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                            color: "white"
                        }}
                        onClick={() => setUseDesktop(true)}
                        disabled={disableButton}
                    >
                        I am browsing this site on my Desktop or Personal
                        Computer
                    </Button>
                </DialogContent>
            </Dialog>
        );
    };

    return <div style={{ position: "absolute" }}>{copyLinkModal()}</div>;
}

export default Create2FA;
