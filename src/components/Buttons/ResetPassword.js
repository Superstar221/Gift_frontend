import { Button, Grid } from "@mui/material";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import API from "../../redux/API";
import tryAndCatchRequestWithErrorHandling from "../errorCode/errorCode";

function ResetPassword() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [params] = useSearchParams();
    const { register, registerErrors, disableButtonB } = useSelector(
        (state) => state.auth,
    );
    const [signupDisabled, setDisabled] = useState(true);
    const [currentData] = useState({
        password: "",
        confirmPass: "",
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
        history("/");
    }
    async function preRequestFunction() {
        return JSON.stringify({ password: currentData.password });
    }

    async function requestFunction(json) {
        return API.post(
            `user/resetPassword?token=${params.get("token")}&id=${params.get("id")}`,
            json,
        );
    }

    const setResetPassword = async () => {
        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            preRequestFunction,
            requestFunction,
            1700,
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
                Object.keys(currentData).length === 2 &&
                Object.keys(registerErrors).length === 0 &&
                errors === false
            ) {
                setDisabled(false);
            } else {
                setDisabled(true);
            }
        }
    }, [currentData, register, registerErrors, setDisabled]);

    return (
        <Grid item xs={12} style={{ margin: "10px" }}>
            <Button
                disabled={signupDisabled || disableButtonB}
                onClick={() => setResetPassword()}
                variant="contained"
                style={{
                    backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                    color: "white"
                }}
            >
                Reset Password
            </Button>
        </Grid>
    );
}

export default ResetPassword;
