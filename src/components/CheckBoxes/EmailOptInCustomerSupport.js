import { React } from "react";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
} from "@mui/material";
import { useSelector } from "react-redux";

function EmailOptInCustomerSupport(handleChange) {
    const { currentUser, register, registerErrors } = useSelector(
        (state) => state.auth,
    );
    function getValue() {
        if (
            register &&
            currentUser !== null &&
            register.emailCustomerSupport === ""
        ) {
            return currentUser.emailCustomerSupport;
        }
        if (register && register.emailCustomerSupport) {
            return register.emailCustomerSupport;
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
                                handleChange(
                                    "emailCustomerSupport",
                                    !getValue(),
                                )
                            }
                            name="emailCustomerSupport"
                        />
                    }
                    label="Customer Support (Required)"
                />
                {registerErrors &&
                registerErrors.emailCustomerSupport !== null ? (
                    <FormHelperText
                        error
                        id="outlined-emailCustomerSupport-error"
                    >
                        {registerErrors.emailCustomerSupport}
                    </FormHelperText>
                ) : null}
            </FormControl>
        </Grid>
    );
}

export default EmailOptInCustomerSupport;
