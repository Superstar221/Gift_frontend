import { Button, Grid, Typography } from "@mui/material";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disable2FAPopUp } from "../../redux/actions/auth.action";

export default function Activate2FA() {
    const dispatch = useDispatch();

    const [disableButtonB, setDisableButtonB] = useState(false);
    const { auth } = useSelector((state) => state);

    const activate = () => {
        dispatch(disable2FAPopUp(false));
    };

    const status = () => {
        if (auth.currentUser !== null && auth.currentUser !== undefined) {
            if (auth.currentUser.twoFactorAuthSecret === "false") {
                return "Inactive";
            }
        }
        return "Already Activated";
    };

    useEffect(() => {
        setDisableButtonB(true);
        if (auth.currentUser) {
            if (auth.currentUser.twoFactorAuthSecret === "false") {
                if (auth.disable2FA === true) {
                    setDisableButtonB(false);
                }
            }
        }
    }, [auth.currentUser, auth.disable2FA]);

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            style={{
                // backgroundColor: "#FFFFFF",
                textAlign: "center",
            }}
        >
            <Grid item xs={12} style={{ margin: "10px" }}>
                <Typography variant="h5">Two Factor Authentication</Typography>
                <Typography variant="body1">Status: {status()}</Typography>
            </Grid>
            <Grid item xs={12} style={{ margin: "10px" }}>
                <Button
                    variant="contained"
                    onClick={() => activate()}
                    disabled={disableButtonB}
                    style={{
                        margin: "5px",
                        backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                        color: "white"
                    }}
                >
                    Activate
                </Button>
            </Grid>
        </Grid>
    );
}
