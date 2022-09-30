import { Button, Grid } from "@mui/material";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "../../redux/actions/auth.action";
import setNotes from "../../redux/actions/notification.action";
import API from "../../redux/API";
import tryAndCatchRequestWithErrorHandling from "../errorCode/errorCode";

function UpdatePassword() {
    const dispatch = useDispatch();
    const { currentUser, register, registerErrors, disableButtonB } =
        useSelector((state) => state.auth);
    const [signupDisabled, setDisabled] = useState(true);
    const [currentData] = useState({
        password: "",
        confirmPass: "",
        oldPassword: "",
    });

    const updateUsers = (inputList) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const key in inputList) {
            if (register[key]) {
                currentData[key] = register[key];
            }
        }
    };
    async function successFunction() {
        updateUsers(currentData);
        dispatch(verifyToken());
    }

    async function preRequest() {
        if (Object.keys(currentData).length === 0) {
            dispatch(setNotes({ error: "Please reload the page" }));
        } else {
            const json = JSON.stringify({
                password: currentData.password,
                oldPassword: currentData.oldPassword,
            });
            return json;
        }
        return false;
    }

    async function request(json) {
        return API.post(`user/changePassword`, json);
    }

    const setSignUp = async () => {
        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            preRequest,
            request,
            2400,
            successFunction,
            null,
            null,
        );
    };

    useEffect(() => {
        if (registerErrors) {
            let errors = false;

            // eslint-disable-next-line no-restricted-syntax
            for (const key in currentData) {
                if (register[key]) {
                    if (currentData[key] !== register[key]) {
                        currentData[key] = register[key];
                    }
                } else {
                    errors = true;
                    break;
                }
            }

            if (
                Object.keys(currentData).length === 3 &&
                Object.keys(registerErrors).length === 0 &&
                errors === false &&
                currentUser.emailVerified === true
            ) {
                setDisabled(false);
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
        <Grid item xs={12} style={{ margin: "10px" }}>
            <Button
                disabled={signupDisabled || disableButtonB}
                onClick={() => setSignUp()}
                variant="contained"
                style={{
                    backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                    color: "white"
                }}
            >
                Update Password
            </Button>
        </Grid>
    );
}

export default UpdatePassword;
