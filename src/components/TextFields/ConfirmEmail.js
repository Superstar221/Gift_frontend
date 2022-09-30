import { Grid, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import React from "react";
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

function TextFieldConfirmEmail(onChangeHandler) {
    const { register, registerErrors } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        e.preventDefault();
    };

    return (
        <Grid item xs={12} style={{ margin: "10px" }}>
            {register.email && (
                <CssTextField
                
                    error={
                        registerErrors && registerErrors.confirmEmail !== null
                            ? (registerErrors.confirmEmail > 0 ? true : false)
                            : true
                    }
                    helperText={
                        registerErrors && registerErrors.confirmEmail !== null
                            ? registerErrors.confirmEmail
                            : null
                    }
                    id="outlined-confirm-email-input"
                    label="Confirm Email"
                    type="required"
                    onCut={handleChange}
                    onCopy={handleChange}
                    onPaste={handleChange}
                    onChange={(e) =>
                        onChangeHandler("confirmEmail", e.target.value)
                    }
                />
            )}
        </Grid>
    );
}

export default TextFieldConfirmEmail;
