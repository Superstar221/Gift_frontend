import { React } from "react";
import { Grid, Typography } from "@mui/material";
import EmailOptInBoardActivity from "./EmailOptInBoardActivity";
import EmailOptInCustomerSupport from "./EmailOptInCustomerSupport";
import EmailOptInMarketing from "./EmailOptInMarketing";

function EmailOptIn(handleChange) {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ textAlign: "flex-end", margin: "10px" }}
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
                    marginTop: "50px",
                    padding: "20px"
                }}
            >
                <Grid item xs={12}>
                    <Typography>
                        I agree to receive emails about the following:
                    </Typography>
                </Grid>
                {EmailOptInCustomerSupport(handleChange)}
                {EmailOptInBoardActivity(handleChange)}
                {EmailOptInMarketing(handleChange)}
            </Grid>
        </Grid>
    );
}

export default EmailOptIn;
