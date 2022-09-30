import { React } from "react";
import { Grid, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'white',
    },
    '& label': {
        color: 'white',
    },
    '& input': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },
});

function TextFieldLoginUsername(processText) {
    const { loginErrors } = useSelector((state) => state.auth);

    return (
        <Grid item xs={12} style={{ margin: "10px" }}>
            <CssTextField
                error={
                    loginErrors && loginErrors.username !== null
                        ? (loginErrors.username > 0 ? true : false)
                        : true
                }
                helperText={
                    loginErrors && loginErrors.username !== null
                        ? loginErrors.username
                        : null
                }
                id="outlined-email-input"
                label="Email or Username"
                type="text"
                autoComplete="username"
                onChange={(e) => processText("loginname", e.target.value)}
            />
        </Grid>
    );
}

export default TextFieldLoginUsername;
