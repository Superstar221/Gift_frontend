/* eslint-disable react/button-has-type */
import { Close, Save, SentimentSatisfied } from "@mui/icons-material";
import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import Picker from "emoji-picker-react";
import React, { useEffect, useState } from "react";
import { MessageList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import ChatProviderDrawer from "./ChatProviderDrawer";

const socket = io(process.env.REACT_APP_BACKEND, {
    withCredentials: true,
});

function ChatProvider() {
    const [newMessage, setNewMessage] = React.useState("");
    const [messages, setMessages] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [connectedBoardId, setConnectedBoardId] = React.useState("");
    const { currentUser } = useSelector((state) => state.auth);
    const { boardId } = useSelector((state) => state.dashboard.boardDetails);
    const { boardDetails } = useSelector((state) => state.dashboard);
    const [whisper, setWhisper] = React.useState("");
    const [isLegend, setIsLegend] = React.useState("");
    const [welcomeMessage, setWelcomeMessage] = React.useState("");
    const [showPass, setShowPass] = useState(false);
    const setShow = () => setShowPass((value) => !value);

    const onEmojiClick = (event, emojiObject) => {
        try {
            setNewMessage(newMessage + emojiObject.emoji);
        } catch (error) {
            console.log("settingNewMessage Error: ", error);
        }
    };

    const settingNewMessage = (e) => {
        try {
            setNewMessage(e.target.value);
        } catch (error) {
            console.log("settingNewMessage Error: ", error);
        }
    };

    const sendMessage = (text) => {
        try {
            if (text.length > 0) {
                if (text[0] === "/") {
                    const username = text.substring(
                        text.indexOf("/") + 1,
                        text.indexOf(" "),
                    );
                    const textWithoutUsername = text.replace(
                        `/${username} `,
                        "",
                    );
                    if (username.length > 1) {
                        let message = "";
                        if (textWithoutUsername.length > 0) {
                            const newText = `You whispered to ${username}: ${textWithoutUsername}`;
                            message = {
                                position: "right",
                                type: "text",
                                text: newText,
                                date: new Date(),
                            };
                            socket.emit(
                                "whisper",
                                username,
                                currentUser.username,
                                textWithoutUsername,
                                connectedBoardId,
                                (data) => {
                                    const errorMsg = {
                                        position: "right",
                                        type: "text",
                                        date: Date.now(),
                                        text: `${data.username}: ${data.message}`,
                                    };

                                    setMessages(messages.concat([errorMsg]));
                                },
                            );
                        } else {
                            message = {
                                position: "right",
                                type: "text",
                                text: "System: Invalid Message, will not send",
                                date: new Date(),
                            };
                        }
                        setMessages(messages.concat([message]));
                    }
                } else {
                    const newText = `You: ${text}`;
                    const message = {
                        position: "right",
                        type: "text",
                        text: newText,
                        date: new Date(),
                    };
                    setMessages(messages.concat([message]));
                    socket.emit("new message", text, boardId, (data) => {
                        const errorMsg = {
                            position: "right",
                            type: "text",
                            date: Date.now(),
                            text: `${data.username}: ${data.message}`,
                        };

                        setMessages(messages.concat([errorMsg]));
                    });
                }
                setNewMessage("");
            }
        } catch (error) {
            console.log("sendMessage Error: ", error);
        }
    };

    const sendNewWelcomeMessage = (text) => {
        try {
            socket.emit(
                "welcomeMessage",
                text,
                boardId,
                // eslint-disable-next-line no-underscore-dangle
                currentUser._id,
                (data) => {
                    const errorMsg = {
                        position: "right",
                        type: "text",
                        date: Date.now(),
                        text: `${data.username}: ${data.message}`,
                    };
                    setWelcomeMessage(errorMsg);
                },
            );
        } catch (error) {
            console.log("sendMessage Error: ", error);
        }
    };

    const sendingMessage = (e) => {
        try {
            if (e.keyCode === 13) {
                sendMessage(newMessage);
            }
        } catch (error) {
            console.log("sendingMessage Error: ", error);
        }
    };

    useEffect(() => {
        const whisperToPerson = (e) => {
            if (whisper === e) {
                const ret = newMessage.replace(`/${e}`, "");
                setWhisper("");
                setNewMessage(ret);
            } else {
                setWhisper(e);
                setNewMessage(`/${e} ${newMessage}`);
            }
        };

        socket.on("users", (data) => {
            if (data.users.length > 0) {
                const newList = data.users.map((item) => {
                    const user = item;
                    if (user !== currentUser.username) {
                        return (
                            <Button
                                size="small"
                                style={{
                                    backgroundColor: "#FFFFFF",
                                    color: "black",
                                    margin: "5px",
                                }}
                                variant="outlined"
                                onClick={() => whisperToPerson(user)}
                            >
                                {user}
                            </Button>
                        );
                    }
                    return <div />;
                });
                setUsers(newList);
            }
        });

        return () => {
            socket.off("users");
        };
    }, [currentUser.username, newMessage, whisper]);

    useEffect(() => {
        socket.on("new message", (data) => {
            const message = {
                position: "left",
                type: "text",
                date: Date.now(),
                text: `${data.username}: ${data.message}`,
            };

            setMessages(messages.concat([message]));
        });

        socket.on("messages", (data) => {
            let tempMessageList = [];
            setWelcomeMessage(data.welcomeMessage);
            data.messages.map(([username, message, date, inWhisper]) => {
                let messageBox = "";
                if (username === currentUser.username) {
                    if (inWhisper === undefined || inWhisper === null) {
                        messageBox = {
                            position: "right",
                            type: "text",
                            date: new Date(date).getTime(),
                            text: `You: ${message}`,
                        };
                    } else {
                        messageBox = {
                            position: "right",
                            type: "text",
                            date: new Date(date).getTime(),
                            text: `You whispered to ${inWhisper}: ${message}`,
                        };
                    }
                } else if (inWhisper === currentUser.username) {
                    messageBox = {
                        position: "left",
                        type: "text",
                        date: new Date(date).getTime(),
                        text: `You got a whisper from ${username}: ${message}`,
                    };
                } else {
                    messageBox = {
                        position: "left",
                        type: "text",
                        date: new Date(date).getTime(),
                        text: `${username}:\n${message}`,
                    };
                }

                tempMessageList = tempMessageList.concat([messageBox]);
                return null;
            });
            setMessages(tempMessageList);
        });

        socket.on("new whisper", (data) => {
            const message = {
                position: "left",
                type: "text",
                date: Date.now(),
                text: `Whisper from ${data.username}: ${data.message}`,
            };
            setMessages(messages.concat([message]));
        });

        return () => {
            socket.off("new message");
            socket.off("messages");
            socket.off("new whisper");
        };
    }, [currentUser.username, messages]);

    useEffect(() => {
        if (currentUser !== null && currentUser !== undefined) {
            if (boardId !== null && boardId !== undefined) {
                if (boardId !== connectedBoardId) {
                    socket.emit(
                        "add user",
                        currentUser.username,
                        boardId,
                        () => {
                            setConnectedBoardId(boardId);
                            socket.emit("get users", boardId, () => {
                                setConnectedBoardId(boardId);
                                socket.emit("get messages", boardId);
                            });
                        },
                    );
                }
            }
        }
    }, [boardId, connectedBoardId, currentUser]);

    useEffect(() => {
        if (currentUser !== null && currentUser !== undefined) {
            if (boardDetails !== null && boardDetails !== undefined) {
                if (
                    boardDetails.senior?.user?.username === currentUser.username
                ) {
                    setIsLegend(true);
                } else {
                    setIsLegend(false);
                }
            }
        }
    }, [boardDetails, currentUser]);

    function populateUsers() {
        return users.map((x) => <Grid style={{ overflow: "auto" }}>{x}</Grid>);
    }

    const copyLinkModal = () => (
        <Grid
            container
            style={{
                backgroundColor: "#00314D",
                height: "90vh",
            }}
        >
            <CssBaseline />
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="stretch"
            >
                <Grid
                    xs={12}
                    textAlign="center"
                    style={{
                        overflow: "auto",
                        backgroundColor: "#FFFFFF",
                        textAlign: "center",
                        width: "90vw",
                        margin: "20px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                    }}
                >
                    <TextField
                        multiline
                        id="outlined-username-input"
                        label="Welcome Message"
                        type="text"
                        autoComplete="username"
                        onChange={(e) => setWelcomeMessage(e.target.value)}
                        value={welcomeMessage}
                        disabled={!isLegend}
                        style={{
                            width: "95vw",
                        }}
                        InputProps={
                            isLegend
                                ? {
                                      endadornment: (
                                          <InputAdornment position="end">
                                              <IconButton
                                                  aria-label="toggle username visibility"
                                                  onClick={() =>
                                                      sendNewWelcomeMessage(
                                                          welcomeMessage,
                                                      )
                                                  }
                                                  edge="end"
                                              >
                                                  <Typography>Save</Typography>
                                                  <Save />
                                              </IconButton>
                                          </InputAdornment>
                                      ),
                                  }
                                : null
                        }
                    />
                </Grid>
                <Grid xs={2} style={{ overflow: "auto" }}>
                    <Typography textAlign="center" color="white">
                        Users
                    </Typography>
                    {populateUsers()}
                </Grid>
                <Grid xs={10} style={{ overflow: "auto" }}>
                    <Box style={{ height: "50vh" }}>
                        <MessageList
                            className="message-list"
                            lockable
                            downButtonBadge={10}
                            dataSource={messages}
                            sendMessagePreview
                            toBottomHeight="100%"
                            customProps={{
                                onDragEnter: (e) => {
                                    e.preventDefault();
                                },
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="stretch"
                style={{
                    backgroundColor: "#00314D",
                    height: "5vh",
                }}
            >
                <Grid item xs={12}>
                    <Grid container>
                        <AppBar position="relative">
                            <Toolbar
                                style={{
                                    backgroundColor: "#FFFFFF",
                                }}
                            >
                                <Grid
                                    container
                                    style={{
                                        textAlign: "center",
                                        margin: "10px",
                                    }}
                                >
                                    <Grid xs={8}>
                                        <TextField
                                            id="outlined-Text-input"
                                            label="Message"
                                            type="Message"
                                            onChange={(e) =>
                                                settingNewMessage(e)
                                            }
                                            onKeyDown={(e) => sendingMessage(e)}
                                            value={newMessage}
                                            disabled={false}
                                            maxRows={Infinity}
                                            fullWidth
                                            style={{ backgroundColor: "white" }}
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
                                                                <SentimentSatisfied />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        {showPass ? (
                                            <Picker
                                                pickerStyle={{ width: "100%" }}
                                                onEmojiClick={onEmojiClick}
                                            />
                                        ) : null}
                                    </Grid>
                                    <Grid xs={2}>
                                        <Button
                                            variant="contained"
                                            style={{
                                                backgroundColor: "#00314D",
                                            }}
                                            onClick={() =>
                                                sendMessage(newMessage)
                                            }
                                        >
                                            <Typography variant="h4">
                                                Send
                                            </Typography>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </AppBar>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

    return (
        <Grid container>
            <Grid xs={12}>{ChatProviderDrawer(copyLinkModal)}</Grid>
        </Grid>
    );
}

export default ChatProvider;
