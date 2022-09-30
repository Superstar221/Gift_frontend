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

function TextFieldFirstName(processText, signupDisabled) {
    const { registerErrors } = useSelector((state) => state.auth);
    const [textValue, setTextValue] = useState("");
    const { currentUser } = useSelector((state) => state.auth);
    function updateValue(value) {
        setTextValue(value);
        processText("name", value);
    }

    useEffect(() => {
        if (currentUser !== null && currentUser !== undefined) {
            setTextValue(currentUser.name);
        }
    }, [currentUser]);

    return (
        <Grid item xs={12} style={{ margin: "10px", textAlign: "-webkit-center" }}>
            <CssTextField
                error={
                    registerErrors && registerErrors.name !== null
                        ? (registerErrors.name > 0 ? true : false)
                        : true
                }
                helperText={
                    registerErrors && registerErrors.name !== null
                        ? registerErrors.name
                        : null
                }
                id="outlined-first-name-input"
                label="First Name"
                type="text"
                autoComplete="first-name"
                onChange={(e) => updateValue(e.target.value)}
                value={textValue}
                disabled={signupDisabled}
            />
        </Grid>
    );
}

export default TextFieldFirstName;
