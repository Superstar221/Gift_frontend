/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { Box, Dialog, DialogTitle, Grid, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import bronze from "../../images/team/Bronze.svg";
import empty from "../../images/team/Empty.svg";
import gifter0 from "../../images/team/Gifter0.svg";
import gifter1 from "../../images/team/Gifter1.svg";
import gold from "../../images/team/Gold.svg";
import platinum from "../../images/team/Plat.svg";
import silver from "../../images/team/Silver.svg";
import {
    confirmMember,
    forfeitAccount,
    reactivateAccount,
    removeMember,
} from "../../redux/actions/dashboard.action";

// eslint-disable-next-line react/prop-types
export default function BigBoardCircle({ title, item }) {
    const { currentUser } = useSelector((state) => state.auth);
    const { boardDetails } = useSelector((state) => state.dashboard);
    const [actionType, setActionType] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const removeStart = () => {
        setAnchorEl(null);
        setOpen(true);
        setActionType("remove");
    };

    const quitStart = () => {
        setAnchorEl(null);
        setOpen(true);
        setActionType("quit");
    };

    const reactivateStart = () => {
        setAnchorEl(null);
        setOpen(true);
        setActionType("reactivate");
    };

    const confirmStart = () => {
        setAnchorEl(null);
        setOpen(true);
        setActionType("confirm");
    };

    const confirmAction = () => {
        if (actionType === "remove") {
            dispatch(
                // eslint-disable-next-line no-underscore-dangle
                removeMember(boardDetails.boardId, item.user._id, currentUser),
            );
        } else if (actionType === "confirm") {
            dispatch(confirmMember(boardDetails.boardId, item.user._id));
        } else if (actionType === "quit") {
            dispatch(forfeitAccount(boardDetails.boardId));
        } else if (actionType === "reactivate") {
            dispatch(reactivateAccount(boardDetails.boardId, item.user._id));
        }
        setOpen(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const determineIcon = (inputItem) => {
        if (inputItem) {
            if (inputItem.user?.invitedCount === 0) {
                return gifter0;
            }
            if (inputItem.user?.invitedCount === 1) {
                return gifter1;
            }
            if (inputItem.user?.level) {
                const level = inputItem.user?.level;
                if (level <= 100) {
                    return bronze;
                }
                if (level <= 400) {
                    return silver;
                }
                if (level <= 1600) {
                    return gold;
                }
                if (level <= 5000) {
                    return platinum;
                }
            } else {
                return bronze;
            }
        }
        return empty;
    };

    const actionNested = (inputItem) => {
        if (inputItem) {
            if (inputItem.user?.deletion === true) {
                return "red";
            }
        }
        return "";
    };

    const setDisplayNameStyle = (inputItem, inputCurrentUser) => {
        const style = {};

        style.position = "absolute";

        if (inputItem) {
            // eslint-disable-next-line no-underscore-dangle
            if (inputCurrentUser?._id === inputItem?.user?._id) {
                style.color = "yellow";
            } else {
                style.color = "white";
            }

            if (inputItem.confirmed) {
                if (inputItem.user?.invitedCount === 0) {
                    style.background = "black";
                } else if (inputItem.user?.invitedCount === 1) {
                    style.background = "black";
                } else {
                    style.background = "#00314f";
                }
            } else {
                style.background = "red";
            }
        } else {
            style.color = "black";
        }

        style.overflow = "hidden";
        style.textOverflow = "ellipsis";
        style.whiteSpace = "wrap";
        style.width = "90%";

        return style;
    };
    const popupOpen = Boolean(anchorEl);
    const id = popupOpen ? "simple-popover" : undefined;

    const populateUsername = () => (
        <Typography
            variant="body1"
            style={setDisplayNameStyle(item, currentUser)}
        >
            {
                // eslint-disable-next-line react/prop-types
                item?.user?.username
            }
        </Typography>
    );

    const populatePosition = () => {
        if (item === null) {
            return (
                <Typography
                    variant="body1"
                    style={setDisplayNameStyle(item, currentUser)}
                >
                    {title}
                </Typography>
            );
        }
        return <div />;
    };

    const handleCloseJoinClick = () => {
        setOpen(false);
    };

    const textForConfirmRemove = (selectedGifterIsSelf) => {
        if (actionType === "remove" && selectedGifterIsSelf === true) {
            return `Are you sure you want to remove yourself 
            (${item?.user.username}) from the board?`;
        }
        if (actionType === "remove") {
            return `Are you sure you want to ${actionType} 
                ${item?.user.username} from the board?`;
        }

        if (actionType === "quit") {
            return `Your profile from all boards will be removed and your profile will be deleted. Are you sure you want to quit Gift of Legacy? `;
        }
        return `Are you sure you want to ${actionType} 
            ${item?.user.username} on the board?`;
    };

    const btnLevel = () => {
        if (item !== null) {
            const currentUserIsLegend =
                boardDetails.senior?.user?._id === currentUser._id;
            const currentUserIsGifter = boardDetails.freshman.some(
                (boardItem) => boardItem?.user?._id === currentUser._id,
            );
            const selectedGifterIsSelf =
                currentUserIsGifter && item.user._id === currentUser._id;
            const selectedUserIsGifter = title === "Gifter";
            const canConfirm =
                item.confirmed === false &&
                currentUserIsLegend &&
                selectedUserIsGifter;
            const canRemove = canConfirm;
            const canQuit =
                item.user._id === currentUser._id &&
                (item.user.deletion === false ||
                    item.user.deletion === undefined);
            const canReactivate =
                (item.user._id === currentUser._id || currentUserIsLegend) &&
                item.user.deletion === true;
            if (open === false) {
                return (
                    <Popover
                        id={id}
                        open={popupOpen}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                    >
                        <Grid item style={{ margin: 10 }}>
                            <Typography
                                variant="h5"
                                style={{ fontFamily: "inherit" }}
                            >
                                Infobox
                            </Typography>
                            {item?.user?.tel && (
                                <Grid item xs={12}>
                                    <Typography
                                        style={{ fontFamily: "inherit" }}
                                    >
                                        Contact number: {item?.user.tel}
                                    </Typography>
                                </Grid>
                            )}

                            {item?.user?.email && (
                                <Grid item xs={12}>
                                    <Typography
                                        style={{ fontFamily: "inherit" }}
                                    >
                                        Email: {item?.user.email}
                                    </Typography>
                                </Grid>
                            )}
                            {item?.user?.name && item?.user?.surname && (
                                <Grid item xs={12}>
                                    <Typography
                                        style={{ fontFamily: "inherit" }}
                                    >
                                        Fullname: {item?.user.name}{" "}
                                        {item?.user.surname}
                                    </Typography>
                                </Grid>
                            )}
                            {item?.user?.username && (
                                <Grid item xs={12}>
                                    <Typography
                                        style={{ fontFamily: "inherit" }}
                                    >
                                        Username: {item?.user.username}
                                    </Typography>
                                </Grid>
                            )}
                            {/* {item?.referrer && (
                                <Grid item xs={12}>
                                    <Typography
                                        style={{ fontFamily: "inherit" }}
                                    >
                                        Inviter: {item?.referrer}
                                    </Typography>
                                </Grid>
                            )} */}
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-evenly"
                                alignItems="center"
                            >
                                <Grid item xs={12}>
                                    {canQuit && (
                                        <Button
                                            style={{ margin: 5 }}
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => quitStart()}
                                        >
                                            Quit Gift of Legacy
                                        </Button>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    {canReactivate && (
                                        <Button
                                            style={{ margin: 5 }}
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => reactivateStart()}
                                        >
                                            Reactivate Profile
                                        </Button>
                                    )}
                                </Grid>
                                <Grid item xs={6}>
                                    {canRemove && !item.user.confirmed && (
                                        <Button
                                            style={{ margin: 5 }}
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => removeStart()}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </Grid>
                                <Grid item xs={6}>
                                    {canConfirm && !item.user.confirmed && (
                                        <Button
                                            variant="contained"
                                            style={{
                                                background: "green",
                                                color: "white",
                                                margin: 5,
                                            }}
                                            onClick={() => confirmStart()}
                                        >
                                            Confirm
                                        </Button>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Popover>
                );
            }
            return (
                <Grid>
                    <Dialog
                        align="center"
                        direction="row"
                        border="200px"
                        onClose={handleCloseJoinClick}
                        open={open !== 0}
                    >
                        <DialogTitle color="black">
                            {1}
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
                                    onClick={confirmAction}
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
                                    onClick={handleCloseJoinClick}
                                    style={{ backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                                    color: "white" }}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Stack>
                    </Dialog>
                </Grid>
            );
        }
        return <div />;
    };

    return (
        <Grid>
            <Button aria-describedby={id} variant="text" onClick={handleClick}>
                <img
                    alt="board"
                    src={determineIcon(item)}
                    style={{
                        width: "100%",
                        backgroundColor: actionNested(item),
                    }}
                />
                {populateUsername()}
                {populatePosition()}
            </Button>
            {btnLevel()}
        </Grid>
    );
}
