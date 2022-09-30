import { FormControl, FormHelperText, Grid, Typography } from "@mui/material";
import { useEffect, useState, React } from "react";
import PhoneInput from "react-phone-input-2";
import { useSelector } from "react-redux";

function TextFieldTel(processText, signupDisabled) {
    const { registerErrors } = useSelector((state) => state.auth);
    const { currentUser } = useSelector((state) => state.auth);
    const perpetualUser = useSelector((state) => state.dashboard.boards);
    const [textValue, setTextValue] = useState("");
    function updateValue(value) {
        setTextValue(value);
        processText("tel", value);
    }
    useEffect(() => {
        if (currentUser !== null && currentUser !== undefined) {
            setTextValue(currentUser.tel.toString());
        }
    }, [currentUser, perpetualUser]);

    return (
        <Grid item xs={12} style={{ margin: "10px", textAlign: "-webkit-center" }}>
            <FormControl variant="outlined">
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography>Cellphone number: </Typography>
                </Grid>
                <PhoneInput
                    id="outlined-tel"
                    label="tel"
                    error={
                        registerErrors && registerErrors.tel !== null
                            ? (registerErrors.tel > 0 ? true : false)
                            : true
                    }
                    country="za"
                    onChange={(e) => updateValue(e)}
                    value={textValue}
                    enableLongNumbers
                    disabled={signupDisabled}
                />
                {registerErrors && registerErrors.tel !== null ? (
                    <FormHelperText error id="outlined-tel-error">
                        {registerErrors.tel}
                    </FormHelperText>
                ) : null}
            </FormControl>
        </Grid>
    );
}

export default TextFieldTel;
