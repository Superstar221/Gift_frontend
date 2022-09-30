import { React } from "react";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
} from "@mui/material";
import { useSelector } from "react-redux";

function EmailOptInBoardActivity(handleChange) {
    const { currentUser, register, registerErrors } = useSelector(
        (state) => state.auth,
    );
    function getValue() {
        if (
            register &&
            currentUser !== null &&
            register.emailBoardActivity === ""
        ) {
            return currentUser.emailBoardActivity;
        }
        if (register && register.emailBoardActivity) {
            return register.emailBoardActivity;
        }
        return false;
    }
    return (
        <Grid item xs={12}>
            <FormControl>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={getValue()}
                            onChange={() =>
                                handleChange("emailBoardActivity", !getValue())
                            }
                            name="emailBoardActivity"
                        />
                    }
                    label="Board Activity (Optional)"
                />
                {registerErrors &&
                registerErrors.emailBoardActivity !== null ? (
                    <FormHelperText
                        error
                        id="outlined-emailBoardActivity-error"
                    >
                        {registerErrors.emailBoardActivity}
                    </FormHelperText>
                ) : null}
            </FormControl>
        </Grid>
    );
}

export default EmailOptInBoardActivity;
