import { React } from "react";
import { FormControlLabel, Grid, Switch } from "@mui/material";
import { useSelector } from "react-redux";

function RememberMeSlider(processText) {
    const { login } = useSelector((state) => state.auth);

    return (
        <Grid item xs={6} style={{ margin: "10px" }}>
            <FormControlLabel
                control={
                    <Switch
                        checked={login.remember}
                        onChange={(e) =>
                            processText("remember", e.target.checked)
                        }
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Remember me"
            />
        </Grid>
    );
}

export default RememberMeSlider;
