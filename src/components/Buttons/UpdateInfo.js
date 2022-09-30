import { Button, Grid } from "@mui/material";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "../../redux/actions/auth.action";
import setNotes from "../../redux/actions/notification.action";
import API from "../../redux/API";
import tryAndCatchRequestWithErrorHandling from "../errorCode/errorCode";

function UpdateInfo() {
    const dispatch = useDispatch();
    const { currentUser, register, registerErrors, disableButtonB } =
        useSelector((state) => state.auth);
    const [signupDisabled, setDisabled] = useState(true);
    const [currentData, setCurrentData] = useState({
        name: "",
        surname: "",
        username: "",
        email: "",
        tel: "",
        emailCustomerSupport: "",
        emailBoardActivity: "",
        emailMarketing: "",
    });

    async function successFunction() {
        dispatch(verifyToken());
    }
    async function preRequestFunction() {
        const set = {};
        // eslint-disable-next-line no-restricted-syntax
        for (const key in currentData) {
            if (currentData[key] !== "") {
                set[key] = currentData[key];
            }
        }

        if (set.email && set.email !== register.confirmEmail) {
            dispatch(setNotes({ error: "Confirm Email does not equal Email" }));
        } else if (
            set.emailCustomerSupport !== null &&
            set.emailCustomerSupport === false
        ) {
            dispatch(
                setNotes({
                    error: "Cannot opt out of customer support emails",
                }),
            );
        } else if (Object.keys(set).length === 0) {
            dispatch(setNotes({ error: "Nothing was changed" }));
        } else {
            setCurrentData({
                name: "",
                surname: "",
                username: "",
                email: "",
                tel: "",
                emailCustomerSupport: "",
                emailBoardActivity: "",
                emailMarketing: "",
            });

            return JSON.stringify(set);
        }
        return false;
    }

    async function requestFunction(json) {
        return API.post("user/me", json);
    }

    const clickUpdateInfo = async () => {
        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            preRequestFunction,
            requestFunction,
            2500,
            successFunction,
            null,
            null,
        );
    };

    useEffect(() => {
        if (registerErrors) {
            let different = false;
            // eslint-disable-next-line no-restricted-syntax
            for (const key in currentData) {
                if (register[key] !== "") {
                    if (currentData[key] !== register[key]) {
                        if (register[key] !== currentUser[key]) {
                            currentData[key] = register[key];
                            different = true;
                        } else {
                            currentData[key] = "";
                        }
                    }
                }
            }
            // eslint-disable-next-line no-restricted-syntax
            for (const key in currentData) {
                if (currentData[key] !== "") {
                    different = true;
                }
            }

            if (currentUser !== null && currentUser !== undefined) {
                if (
                    Object.keys(registerErrors).length === 0 &&
                    different === true
                ) {
                    setDisabled(false);
                } else {
                    setDisabled(true);
                }
            } else {
                setDisabled(true);
            }
        }
    }, [
        currentData,
        currentUser,
        disableButtonB,
        register,
        registerErrors,
        setDisabled,
        signupDisabled,
    ]);

    return (
        <Grid item xs={12} style={{ margin: "10px", textAlign: "-webkit-center" }}>
            <Button
                disabled={signupDisabled || disableButtonB}
                onClick={() => clickUpdateInfo()}
                variant="contained"
                style={{
                    backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                    color: "white"
                }}
            >
                Update Info
            </Button>
        </Grid>
    );
}

export default UpdateInfo;
