import { Close } from "@mui/icons-material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import Picker from "emoji-picker-react";
import { React, useEffect, useState } from "react";
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

function TextFieldUsername(processText, signupDisabled) {
    const { registerErrors } = useSelector((state) => state.auth);
    const { currentUser } = useSelector((state) => state.auth);
    const perpetualUser = useSelector((state) => state.dashboard.boards);

    const [textValue, setTextValue] = useState("");
    const [showPass, setShowPass] = useState(false);

    const setShow = () => setShowPass((value) => !value);

    const onEmojiClick = (event, emojiObject) => {
        setTextValue(textValue + emojiObject.emoji);
        processText("username", textValue + emojiObject.emoji);
    };

    function updateValue(value) {
        setTextValue(value);
        processText("username", value);
    }

    useEffect(() => {
        if (currentUser !== null && currentUser !== undefined) {
            setTextValue(currentUser.username);
        }
    }, [currentUser, perpetualUser]);

    return (
        <Grid container style={{ textAlign: "-webkit-center" }}>
            <Grid item xs={12} style={{ margin: "10px" }}>
                <CssTextField
                    error={
                        registerErrors && registerErrors.username !== null
                            ? (registerErrors.username > 0 ? true : false)
                            : true
                    }
                    helperText={
                        registerErrors && registerErrors.username !== null
                            ? registerErrors.username
                            : null
                    }
                    id="outlined-username-input"
                    label="Username"
                    type="text"
                    autoComplete="username"
                    onChange={(e) => updateValue(e.target.value)}
                    value={textValue}
                    disabled={signupDisabled}
                    InputProps={{
                        endadornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle username visibility"
                                    onClick={setShow}
                                    edge="end"
                                >
                                    {showPass ? (
                                        <Close />
                                    ) : (
                                        <SentimentSatisfiedAltIcon />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                {showPass ? <Picker onEmojiClick={onEmojiClick} /> : null}
            </Grid>
        </Grid>
    );
}

export default TextFieldUsername;
