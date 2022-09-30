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

function TextFieldEmail(processText) {
    const { registerErrors } = useSelector((state) => state.auth);
    const { currentUser } = useSelector((state) => state.auth);
    const perpetualUser = useSelector((state) => state.dashboard.boards);
    const [signupDisabled, setDisabled] = useState(true);
    const [textValue, setTextValue] = useState("");

    function updateValue(value) {
        setTextValue(value);
        processText("email", value);
    }

    const handleChange = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        let disabled = false;
        if (currentUser !== null && currentUser !== undefined) {
            setTextValue(currentUser.email);
            if (currentUser.balanc === 0) {
                if (perpetualUser.length > 0) {
                    for (let i = 0; i < perpetualUser.length; i += 1) {
                        if (perpetualUser[i].board !== undefined) {
                            if (perpetualUser[i].board !== null) {
                                disabled = true;
                                break;
                            }
                        }
                    }
                }
            } else {
                disabled = true;
            }
        }
        setDisabled(disabled);
    }, [currentUser, perpetualUser]);

    return (
        <Grid item xs={12} style={{ margin: "10px", textAlign: "-webkit-center" }}>
            <CssTextField
                error={
                    registerErrors && registerErrors.email !== null
                        ? (registerErrors.email > 0 ? true : false)
                        : true
                }
                helperText={
                    registerErrors && registerErrors.email !== null
                        ? registerErrors.email
                        : null
                }
                id="outlined-email-input"
                onCut={handleChange}
                onCopy={handleChange}
                onPaste={handleChange}
                label="Email"
                type="text"
                autoComplete="email"
                onChange={(e) => updateValue(e.target.value)}
                value={textValue}
                disabled={signupDisabled}
            />
        </Grid>
    );
}

export default TextFieldEmail;
