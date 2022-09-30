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
import { useState, React } from "react";
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

function TextFieldConfirmPassword(processText) {
    const handleChange = (e) => {
        e.preventDefault();
    };

    const { registerErrors } = useSelector((state) => state.auth);
    const [showPass, setShowPass] = useState(false);
    const setShow = () => setShowPass((value) => !value);
    return (
        <Grid item xs={12} style={{ margin: "10px" }}>
            <CssTextField
                error={
                    registerErrors && registerErrors.confirmPass !== null
                        ? (registerErrors.confirmPass > 0 ? true : false)
                        : true
                }
                helperText={
                    registerErrors && registerErrors.confirmPass !== null
                        ? registerErrors.confirmPass
                        : null
                }
                id="outlined-confirm-password"
                label="Confirm Password"
                onCut={handleChange}
                onCopy={handleChange}
                onPaste={handleChange}
                type={!showPass && "password"}
                onChange={(e) => processText("confirmPass", e.target.value)}
                endadornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={setShow}
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

export default TextFieldConfirmPassword;
