import { React } from "react";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
} from "@mui/material";
import { useSelector } from "react-redux";

function AgreeCheckBox(handleChange) {
    const { register, registerErrors } = useSelector((state) => state.auth);
    return (
        <Grid item xs={12} style={{ margin: "10px" }}>
            <FormControl>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={!!(register && register.agree === true)}
                            onChange={() =>
                                handleChange("agree", !register.agree)
                            }
                            name="agree"
                        />
                    }
                    label="I agree to the terms and conditions"
                />
                {registerErrors && registerErrors.agree !== null ? (
                    <FormHelperText error id="outlined-agree-error">
                        {registerErrors.agree}
                    </FormHelperText>
                ) : null}
            </FormControl>
        </Grid>
    );
}

export default AgreeCheckBox;
