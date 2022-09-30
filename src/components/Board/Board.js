/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import { Close, NotificationsActive } from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogTitle,
    Grid,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReferrerBypassConfimed } from "../../redux/actions/auth.action";
import {
    deleteNotification,
    getCurrentBoard,
    getCurrentMessageLength,
    getNotifications,
    joinNewBoard,
} from "../../redux/actions/dashboard.action";

function Board({ value }) {
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.dashboard.boards);
    const notifications = useSelector((state) => state.dashboard.notifications);
    const lastSeen = useSelector((state) => state.dashboard.lastSeen);
    const authState = useSelector((state) => state.auth);
    // const canAccessBoard = authState.currentUser?.level >= value;
    const [canView, setCanView] = useState(null);
    const thisBoard = boards.find((board) => board.level === value);
    const [open, setOpen] = useState(false);
    const [disableButtonA, setDisableButtonA] = useState(false);
    const [disableButtonB, setDisableButtonB] = useState(false);
    const [chosenLevel, setChosenLevel] = useState(0);
    const { bypassConfirmModalOpen } = useSelector((state) => state.auth);
    const [numberOfAlerts, setNumberOfAlerts] = useState(-1);
    const [showPass, setShowPass] = useState(true);
    const [unreadMessages, setUnreadMessages] = useState(true);

    useEffect(() => {
        if (thisBoard?.board) {
            dispatch(getNotifications(value));
            dispatch(getCurrentMessageLength(thisBoard.board, value));
            setCanView(true);
        } else {
            setCanView(false);
        }
    }, [dispatch, thisBoard, value]);

    const toggleShowPass = () => {
        setShowPass(!showPass);
    };

    function canAccessBoard() {
        if (authState.currentUser?.level >= value) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        let notificationCount = 0;
        let lastSeenCount = 0;
        let totalCount = 0;
        let foundA = false;
        let foundB = false;

        if (
            thisBoard !== null &&
            thisBoard !== undefined &&
            thisBoard.level !== null &&
            thisBoard.level !== undefined
        ) {
            if (
                notifications !== null &&
                notifications !== undefined &&
                notifications.length > 0
            ) {
                let found = false;
                for (let i = 0; i < notifications.length; i += 1) {
                    if (
                        notifications[i].notifications !== null &&
                        notifications[i].notifications !== undefined
                    ) {
                        if (notifications[i].level === value) {
                            totalCount += notifications[i].notifications.length;
                            found = true;
                            foundA = true;
                            notificationCount =
                                notifications[i].lastMessageCount;
                            break;
                        }
                    }
                }
                if (found === false) {
                    totalCount = 0;
                }
            }

            if (
                lastSeen !== null &&
                lastSeen !== undefined &&
                lastSeen.length > 0
            ) {
                for (let j = 0; j < lastSeen.length; j += 1) {
                    if (lastSeen[j].level === value) {
                        lastSeenCount = lastSeen[j].lastMessageCount;
                        if (lastSeenCount - notificationCount > 0) {
                            totalCount += 1;
                        }
                        foundB = true;
                        break;
                    }
                }
            }
            if (foundA && foundB) {
                setUnreadMessages(lastSeenCount - notificationCount);
                setNumberOfAlerts(totalCount);
            }
        }
    }, [chosenLevel, lastSeen, notifications, thisBoard, value]);

    const toggleOpen = () => {
        setOpen(false);
    };

    const toggleOpenTrue = () => {
        setChosenLevel(value);
        setDisableButtonA(false);
        setDisableButtonB(false);
        setOpen(true);
    };

    const handleSendJoinClick = () => {
        setDisableButtonA(true);
        setOpen(false);
        dispatch(joinNewBoard(chosenLevel, false));
    };

    const handleCloseJoinClick = () => {
        setOpen(false);
    };

    const handleCloseBypass = () => {
        dispatch(setReferrerBypassConfimed(0));
    };

    const handleSendBypass = () => {
        setDisableButtonA(true);
        dispatch(setReferrerBypassConfimed(0));
        dispatch(joinNewBoard(value, true));
    };

    const getGreyscaleEffect = () => {
        if (canAccessBoard()) {
            return "grayscale(0%)";
        }
        return "grayscale(75%)";
    };

    const notifies = (level) => {
        if (level === undefined || level === null) {
            return null;
        }

        const temper = notifications.map((item) => {
            if (item.level === level) {
                return item.notifications.map((notify) => (
                    <Alert
                        severity="info"
                        onClose={() => {
                            // eslint-disable-next-line no-underscore-dangle
                            dispatch(deleteNotification(notify._id, level));
                        }}
                        style={{ margin: "5px" }}
                    >
                        {notify.message}
                    </Alert>
                ));
            }
            return null;
        });
        if (unreadMessages > 0) {
            temper.push(
                <Alert severity="info" style={{ margin: "5px" }}>
                    You have {unreadMessages} unread messages.
                </Alert>,
            );
        }
        return temper;
    };

    const getBoardsName = (level) => {
        if (level === 100) return "Bronze";
        if (level === 400) return "Silver";
        if (level === 1600) return "Gold";
        if (level === 5000) return "Platinum";
        return "Cannot be obtained";
    };

    const getButtonColor = (level) => {
        if (level === 100) return "#8f5233";
        if (level === 400) return "#6f6f6f";
        if (level === 1600) return "#fb8f23";
        if (level === 5000) return "#5d9eb0";
        return "#01314D";
    };

    const joinWarningA = () => `You are joining a new ${getBoardsName(
        chosenLevel,
    )} Board.
    The Gift value is $${chosenLevel}. Please ensure your gift is
    ready to be gifted to the Legend before you proceed.`;

    const joinWarningB = () => `As a Gifter, it is your responsibility to 
        contact the Legend as soon as possible. 
    No communication within 48 hours could potentially lead to board removal.`;

    // eslint-disable-next-line consistent-return
    const getModal = () => {
        if (open !== false) {
            return (
                <div position="absolute">
                    <Dialog
                        align="center"
                        direction="row"
                        border="200px"
                        onClose={toggleOpen}
                        open={open}
                    >
                        <DialogTitle
                            style={{}}
                        >
                            {joinWarningA()}
                        </DialogTitle>
                        <DialogTitle
                            style={{}}
                        >
                            {joinWarningB()}
                        </DialogTitle>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-around"
                            style={{}}
                        >
                            <Box m={1} pt={1}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSendJoinClick}
                                    disabled={disableButtonA}
                                    style={{}}
                                >
                                    <Typography style={{}}>
                                        Confirm
                                    </Typography>
                                </Button>
                            </Box>
                            <Box m={1} pt={1}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCloseJoinClick}
                                    disabled={disableButtonA}
                                    style={{ }}
                                >
                                    <Typography style={{}}>
                                        Cancel
                                    </Typography>
                                </Button>
                            </Box>
                        </Stack>
                    </Dialog>
                </div>
            );
        }
        if (bypassConfirmModalOpen !== 0 && value === bypassConfirmModalOpen) {
            return (
                <div position="absolute">
                    <Dialog
                        align="center"
                        direction="row"
                        border="200px"
                        onClose={handleCloseBypass}
                        open={bypassConfirmModalOpen !== 0}
                    >
                        <DialogTitle color="red">
                            You cannot join your inviters board at this time.
                        </DialogTitle>
                        <DialogTitle>
                            Please confirm you want to join another board that
                            does not have your inviter on.
                        </DialogTitle>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-around"
                        >
                            <Box m={1} pt={1}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSendBypass}
                                    disabled={disableButtonB}
                                    style={{ backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                                    color: "white" }}
                                >
                                    Confirm
                                </Button>
                            </Box>
                            <Box m={1} pt={1}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCloseBypass}
                                    disabled={disableButtonB}
                                    style={{ backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                                    color: "white" }}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Stack>
                    </Dialog>
                </div>
            );
        }
    };

    return (
        <Grid container>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{
                    margin: "auto",
                    marginTop: "20px",
                    backgroundImage: `url(images/${value}.png)`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: `${getGreyscaleEffect()}`,
                }}
            >
                {getModal()}
                <Grid item xs={12}>
                    <Typography
                        style={{ marginTop: "20px", color: "#00314D" }}
                        variant="h4"
                    >
                        {getBoardsName(value)}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        style={{ color: "#00314D" }}
                        variant="subtitle1"
                    >
                        ${value} Gift Value
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {canAccessBoard() ? (
                        canView && thisBoard ? (
                            <div>
                                {numberOfAlerts === 0 &&
                                unreadMessages === 0 ? (
                                    <Grid item xs={12}>
                                        <Button
                                            variant="outlined"
                                            style={{
                                                backgroundColor: `${getButtonColor(
                                                    value,
                                                )}`,
                                                color: "white",
                                                marginBottom: "-10px",
                                                position: "relative",
                                                top: "5px",
                                            }}
                                            onClick={() =>
                                                dispatch(
                                                    getCurrentBoard(
                                                        thisBoard.board,
                                                    ),
                                                )
                                            }
                                        >
                                            <Typography variant="body1">
                                                View
                                            </Typography>
                                        </Button>
                                    </Grid>
                                ) : (
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Button
                                                variant="outlined"
                                                style={{
                                                    backgroundColor: `${getButtonColor(
                                                        value,
                                                    )}`,
                                                    color: "white",
                                                    marginBottom: "-10px",
                                                    position: "relative",
                                                    top: "5px",
                                                }}
                                                onClick={() =>
                                                    dispatch(
                                                        getCurrentBoard(
                                                            thisBoard.board,
                                                        ),
                                                    )
                                                }
                                            >
                                                <Typography variant="body1">
                                                    View
                                                </Typography>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={3}>
                                            {"  "}
                                        </Grid>
                                        <Grid item xs={3}>
                                            <IconButton
                                                variant="outlined"
                                                style={{
                                                    backgroundColor: `${getButtonColor(
                                                        value,
                                                    )}`,
                                                    color: "white",
                                                    marginBottom: "-10px",
                                                    position: "relative",
                                                    top: "5px",
                                                }}
                                                onClick={toggleShowPass}
                                            >
                                                {numberOfAlerts > 0 ||
                                                unreadMessages ? (
                                                    <NotificationsActive />
                                                ) : (
                                                    <Close />
                                                )}
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                )}
                            </div>
                        ) : (
                            <Button
                                variant="outlined"
                                style={{
                                    backgroundColor: `${getButtonColor(value)}`,
                                    color: "white",
                                    marginBottom: "-10px",
                                    position: "relative",
                                    top: "5px",
                                }}
                                onClick={toggleOpenTrue}
                            >
                                <Typography variant="body1">Join</Typography>
                            </Button>
                        )
                    ) : (
                        <Button
                            variant="outlined"
                            style={{
                                backgroundColor: "white",
                                color: "black",
                                marginBottom: "-10px",
                                position: "relative",
                                top: "5px",
                            }}
                            disabled
                        >
                            <Typography variant="body1">Locked</Typography>
                        </Button>
                    )}
                </Grid>
            </Grid>

            <Grid
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{
                    margin: "auto",
                    marginTop: "20px",
                }}
            >
                {showPass ? null : (
                    <Grid item xs={12}>
                        {notifies(thisBoard.level)}
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}

export default Board;
