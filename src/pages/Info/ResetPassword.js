import { React } from "react";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import UpdatePassword from "../../components/Buttons/UpdatePassword";
import TextFieldConfirmPassword from "../../components/TextFields/ConfirmPassword";
import TextFieldCurrentPassword from "../../components/TextFields/CurrentPassword";
import TextFieldPassword from "../../components/TextFields/Password";
import {
    personalInfoUpdatePassword,
    registerChange,
} from "../../redux/actions/auth.action";

export default function ResetPassword() {
    const dispatch = useDispatch();
    const { register, registerErrors } = useSelector((state) => state.auth);

    const changeInput = (item, value) => {
        dispatch(registerChange(item, value));
        dispatch(personalInfoUpdatePassword(register, registerErrors, item));
    };

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            style={{
                // backgroundColor: "#FFFFFF",
                textAlign: "center",
            }}
        >
            <Grid item xs={12} style={{ margin: "10px" }}>
                <Typography variant="h5">Change Password</Typography>
            </Grid>
            {TextFieldCurrentPassword(changeInput)}
            {TextFieldPassword(changeInput)}
            {TextFieldConfirmPassword(changeInput)}
            {UpdatePassword()}
        </Grid>
    );
}
