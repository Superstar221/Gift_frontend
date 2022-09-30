import { Grid, TextField } from "@mui/material";
import { useEffect, useState, React } from "react";
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

function TextFieldSurname(processText, signupDisabled) {
    const { registerErrors } = useSelector((state) => state.auth);
    const { currentUser } = useSelector((state) => state.auth);
    const perpetualUser = useSelector((state) => state.dashboard.boards);
    const [textValue, setTextValue] = useState("");
    function updateValue(value) {
        setTextValue(value);
        processText("surname", value);
    }
    useEffect(() => {
        if (currentUser !== null && currentUser !== undefined) {
            setTextValue(currentUser.surname);
        }
    }, [currentUser, perpetualUser]);

    return (
        <Grid item xs={12} style={{ margin: "10px", textAlign: "-webkit-center" }}>
            <CssTextField
                error={
                    registerErrors && registerErrors.surname !== null
                        ? (registerErrors.surname > 0 ? true : false)
                        : true
                }
                helperText={
                    registerErrors && registerErrors.surname !== null
                        ? registerErrors.surname
                        : null
                }
                id="outlined-last-name-input"
                label="Last Name"
                type="text"
                autoComplete="last-name"
                onChange={(e) => updateValue(e.target.value)}
                value={textValue}
                disabled={signupDisabled}
            />
        </Grid>
    );
}

export default TextFieldSurname;
