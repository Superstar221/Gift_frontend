import { React } from "react";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
} from "@mui/material";
import { useSelector } from "react-redux";

function EmailOptInMarketing(handleChange) {
    const { currentUser, register, registerErrors } = useSelector(
        (state) => state.auth,
    );
    function getValue() {
        if (
            register &&
            currentUser !== null &&
            register.emailMarketing === ""
        ) {
            return currentUser.emailMarketing;
        }
        if (register && register.emailMarketing) {
            return register.emailMarketing;
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
                                handleChange("emailMarketing", !getValue())
                            }
                            name="emailMarketing"
                        />
                    }
                    label="Marketing (Optional)"
                />
                {registerErrors && registerErrors.emailMarketing !== null ? (
                    <FormHelperText error id="outlined-emailMarketing-error">
                        {registerErrors.emailMarketing}
                    </FormHelperText>
                ) : null}
            </FormControl>
        </Grid>
    );
}

export default EmailOptInMarketing;
