import { Grid } from "@mui/material";
import { useEffect, React } from "react";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { registerChange, testFn } from "../../redux/actions/auth.action";
import API from "../../redux/API";
import AgreeCheckBox from "../Agree/AgreeCheckBox";
import AgreeInfo from "../Agree/AgreeInfo";
import SignUp from "../Buttons/SignUp";
import EmailOptIn from "../CheckBoxes/EmailOptIn";
import tryAndCatchRequestWithErrorHandling from "../errorCode/errorCode";
import TextFieldConfirmEmail from "../TextFields/ConfirmEmail";
import TextFieldConfirmPassword from "../TextFields/ConfirmPassword";
import TextFieldEmail from "../TextFields/Email";
import TextFieldFirstName from "../TextFields/FirstName";
import TextFieldPassword from "../TextFields/Password";
import TextFieldSurname from "../TextFields/Surname";
import TextFieldTel from "../TextFields/Tel";
import TextFieldUsername from "../TextFields/Username";

function RegisterComp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, registerErrors } = useSelector((state) => state.auth);

    const [params] = useSearchParams();

    useEffect(() => {

        async function failFunction() {
            navigate("/");
        }

        async function catchFunction() {
            navigate("/");
        }

        async function preRequestFunction() {
            const token = params.get("token");
            if (token !== undefined && token !== null) {
                dispatch(registerChange("referralToken", token));
                return token;
            }
            // navigate("/");
            return false;
        }

        async function requestFunction(token) {
            console.log("verifytoken");
            return API.get(`user/verifyInviterToken?token=${token}`);
        }

        const verifyReferral = async () => {
            await tryAndCatchRequestWithErrorHandling(
                dispatch,
                preRequestFunction,
                requestFunction,
                1200,
                null,
                failFunction,
                catchFunction,
            );
            return null;
        };

        verifyReferral();
    }, [navigate, params, dispatch, register]);

    const processText = (item, value) => {
        dispatch(registerChange(item, value));
        dispatch(testFn(register, registerErrors, item));
    };

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-end"
            style={{ textAlign: "center" }}
        >
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
                    marginTop: "50px"
                }}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                >
                    {TextFieldFirstName(processText)}
                    {TextFieldSurname(processText)}
                </Grid>
                {TextFieldUsername(processText)}
                {TextFieldEmail(processText)}
                {TextFieldConfirmEmail(processText)}
                {TextFieldTel(processText)}
                {TextFieldPassword(processText)}
                {TextFieldConfirmPassword(processText)}
                {AgreeInfo()}
                {AgreeCheckBox(processText)}
                {EmailOptIn(processText)}
                {SignUp()}
            </Grid>
        </Grid>
    );
}

export default RegisterComp;
