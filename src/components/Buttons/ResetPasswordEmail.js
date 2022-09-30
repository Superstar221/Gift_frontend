import { Button, Grid } from "@mui/material";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import setNotes from "../../redux/actions/notification.action";
import API from "../../redux/API";
import tryAndCatchRequestWithErrorHandling from "../errorCode/errorCode";

function ResetPasswordEmail() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const { register, registerErrors, disableButtonB } = useSelector(
        (state) => state.auth,
    );
    const [signupDisabled, setDisabled] = useState(true);
    const [email] = useState({
        email: "",
    });

    const updateUsers = (inputList) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const key in inputList) {
            if (register[key]) {
                email[key] = register[key];
            }
        }
    };

    async function successFunction() {
        updateUsers(email);
        history("/");
    }

    async function preRequestFunction() {
        if (Object.keys(email).length === 0) {
            dispatch(setNotes({ error: "Please reload the page" }));
            return false;
        }
        return JSON.stringify(email);
    }

    async function requestFunction(json) {
        return API.post("user/recoverPassword", json);
    }

    const setSignUp = async () => {
        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            preRequestFunction,
            requestFunction,
            2000,
            successFunction,
            null,
            null,
        );
    };

    useEffect(() => {
        if (registerErrors) {
            let errors = false;
            // eslint-disable-next-line no-restricted-syntax
            for (const key in email) {
                if (register[key]) {
                    if (email[key] !== register[key]) {
                        email[key] = register[key];
                    }
                } else {
                    errors = true;
                    break;
                }
            }

            if (
                Object.keys(email).length === 1 &&
                Object.keys(registerErrors).length === 0 &&
                errors === false
            ) {
                setDisabled(false);
            } else {
                setDisabled(true);
            }
        }
    }, [email, register, registerErrors, setDisabled]);

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
                Send Reset Password Email
            </Button>
        </Grid>
    );
}

export default ResetPasswordEmail;
