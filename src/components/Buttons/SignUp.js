import { Button, Grid } from "@mui/material";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerFn } from "../../redux/actions/auth.action";

function SignUp() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const { register, registerErrors, disableButtonB } = useSelector(
        (state) => state.auth,
    );
    const [signupDisabled, setDisabled] = useState(true);
    const setSignUp = () => {
        console.log(register);
        dispatch(registerFn(register, history));
    };

    useEffect(() => {
        if (registerErrors) {
            let errors = false;
            // eslint-disable-next-line no-restricted-syntax
            for (const key in register) {
                if (
                    !register[key] &&
                    key !== "oldPassword" &&
                    key !== "emailBoardActivity" &&
                    key !== "emailMarketing"
                ) {
                    errors = true;
                    break;
                }
            }
            if (Object.keys(registerErrors).length === 0 && errors === false) {
                setDisabled(false);
            } else {
                setDisabled(true);
            }
        }
    }, [register, registerErrors, setDisabled]);

    return (
        <Grid item xs={12} style={{ margin: "10px" }}>
            <Button
                // disabled={signupDisabled || disableButtonB}
                onClick={() => setSignUp()}
                variant="contained"
                style={{
                    backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                    color: "white"
                }}
            >
                Sign up
            </Button>
        </Grid>
    );
}

export default SignUp;
