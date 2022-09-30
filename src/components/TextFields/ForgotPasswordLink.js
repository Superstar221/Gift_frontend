import { React } from "react";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

function ForgotPasswordLink() {
    return (
        <Grid item xs={12} style={{ margin: "10px", marginTop: "20px" }}>
            <Button
                variant="contained"
                component={Link}
                to="/forgot"
                style={{
                    backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                    color: "white"
                }}
            >
                Reset Password
            </Button>
        </Grid>
    );
}

export default ForgotPasswordLink;
