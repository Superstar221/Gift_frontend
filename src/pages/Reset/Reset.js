import { Grid } from "@mui/material";
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import ResetPassword from "../../components/Buttons/ResetPassword";
import tryAndCatchRequestWithErrorHandling from "../../components/errorCode/errorCode";
import TextFieldConfirmPassword from "../../components/TextFields/ConfirmPassword";
import TextFieldPassword from "../../components/TextFields/Password";
import {
    passwordRecoved,
    registerChange,
} from "../../redux/actions/auth.action";
import API from "../../redux/API";

export default function Reset() {
    const dispatch = useDispatch();
    const history = useNavigate();

    const [params] = useSearchParams();
    const { register, registerErrors } = useSelector((state) => state.auth);

    const changeInput = (item, value) => {
        dispatch(registerChange(item, value));
        dispatch(passwordRecoved(register, registerErrors, item));
    };

    useEffect(() => {
        async function catchFunction() {
            history("/");
        }

        async function errorFunction() {
            history("/");
        }

        async function requestFunction() {
            return API.get(
                `user/verifyResetToken?token=${params.get("token")}&id=${params.get("id")}`,
            );
        }
        const verifyReferral = async () => {
            await tryAndCatchRequestWithErrorHandling(
                dispatch,
                null,
                requestFunction,
                1100,
                null,
                errorFunction,
                catchFunction,
            );
        };

        verifyReferral();
    }, [params, dispatch, history]);

    return (
        
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
                    margin: "auto"
                }}
            >
                {TextFieldPassword(changeInput)}
                {TextFieldConfirmPassword(changeInput)}
                {ResetPassword()}
            </Grid>
    );
}
