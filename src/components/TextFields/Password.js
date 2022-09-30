import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from "@mui/material";
import { React, useState } from "react";
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

function TextFieldPassword(processText) {
    const { registerErrors } = useSelector((state) => state.auth);
    const [showPass, setShowPass] = useState(false);
    const setShow = () => setShowPass((value) => !value);
    return (
        <Grid item xs={12} style={{ margin: "10px" }}>
            <CssTextField
                error={
                    registerErrors && registerErrors.password !== null
                        ? (registerErrors.password > 0 ? true : false)
                        : true
                }
                helperText={
                    registerErrors && registerErrors.password !== null
                        ? registerErrors.password
                        : null
                }
                id="outlined-password"
                label="Password"
                type={!showPass && "password"}
                onChange={(e) => processText("password", e.target.value)}
                endadornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={setShow}
                            onMouseDown={setShow}
                            edge="end"
                        >
                            {showPass ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </Grid>
    );
}

export default TextFieldPassword;
