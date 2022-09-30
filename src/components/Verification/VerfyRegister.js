import { Button, Grid } from "@mui/material";
import { React, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../../redux/API";
import tryAndCatchRequestWithErrorHandling from "../errorCode/errorCode";

function VerificationComponent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [params] = useSearchParams();

    useEffect(() => {
        async function catchFunction() {
            navigate("/");
        }

        async function errorFunction() {
            navigate("/");
        }
        async function requestFunction() {
            return API.get(
                `user/verifyEmailToken?token=${params.get("token")}`,
            );
        }
        const verifyReferral = async () => {
            await tryAndCatchRequestWithErrorHandling(
                dispatch,
                null,
                requestFunction,
                1000,
                null,
                errorFunction,
                catchFunction,
            );
            return null;
        };
        verifyReferral();
    }, [navigate, params, dispatch]);

    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            style={{ textAlign: "center" }}
        >
            <Grid item xs={12} style={{ textAlign: "center" }}>
                <h1>GIFT OF LEGACY</h1>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
                <h5>
                    We are verifying your token. You will get a popup with the
                    result.
                </h5>
                <Button
                    style={{
                        margin: "5px",
                        backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                        color: "white"
                    }}
                    variant="contained"
                    onClick={() => navigate("/")}
                >
                    Click here to Login
                </Button>
            </Grid>
        </Grid>
    );
}

export default VerificationComponent;
