/* eslint-disable react/prop-types */
import { MenuOpen } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
    AppBar,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Drawer,
    Grid,
    IconButton,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import {
    getReferalLink,
    setOpenDrawer,
} from "../../redux/actions/dashboard.action";
import setNotes from "../../redux/actions/notification.action";
import generate from "./generate.f75a6f9d89250cf6cffbaf3b0eded497.svg";
import logo from "./logo.e480153c4010e258a2eaca0eafbd9711.svg";
import TopDrawer from "./MobileMenu/TopDrawer";
import share from "./share.png";

const drawerWidth = 240;
const drawerHeight = 75;
const drawerWidth2 = drawerWidth * 2.1;

function msToTime(ms) {
    const seconds = (ms / 1000).toFixed(0);
    if (seconds < 60) return `${seconds} seconds`;
    const minutes = (ms / (1000 * 60)).toFixed(0);
    if (minutes < 60) return `${minutes} minutes`;
    const hours = (ms / (1000 * 60 * 60)).toFixed(0);
    if (hours < 24) return `${hours} hours`;
    const days = (ms / (1000 * 60 * 60 * 24)).toFixed(0);
    return `${days} days`;
}

function Header() {
    const [openShare, setOpenShare] = useState(false);
    const theme = useTheme();
    const dispatch = useDispatch();
    const { dashboard } = useSelector((state) => state);
    const { auth } = useSelector((state) => state);
    const boards = useSelector((state) => state.dashboard.boards);
    const [open, setOpen] = React.useState(false);
    const [unverifiedEmail, setUnverifiedEmail] = React.useState(false);
    const [sideLined, setSideLined] = React.useState(false);
    const [firstConfirm, setFirstConfirm] = React.useState(false);
    const [accountDisabledWarning, setAccountDisabledWarning] =
        React.useState(false);
    const [accountDisabledError, setAccountDisabledError] =
        React.useState(false);
    const [accountDisabledCountdown, setAccountDisabledCountdown] =
        React.useState("");

    const handleDrawer = () => {
        if (open === true) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setUnverifiedEmail(false);
        setSideLined(false);
        setFirstConfirm(false);
        setAccountDisabledWarning(false);
        setAccountDisabledError(false);
        setAccountDisabledCountdown("");
        dispatch(setOpenDrawer(open));

        if (auth.currentUser) {
            if (auth.currentUser.emailVerified === false) {
                setUnverifiedEmail(true);
            }

            if (auth.currentUser.invitedCount < 2) {
                setSideLined(true);
            }

            if (
                auth.currentUser.level === 100 &&
                auth.currentUser.balanc === 0
            ) {
                let foundConfirm = false;
                if (boards.length > 0) {
                    for (let i = 0; i < boards.length; i += 1) {
                        if (
                            boards[i].confirmed !== null &&
                            boards[i].confirmed !== undefined
                        ) {
                            if (
                                boards[i].level === 100 &&
                                boards[i].confirmed === true
                            ) {
                                foundConfirm = true;
                                break;
                            }
                        }
                    }
                }
                if (foundConfirm === true) {
                    setFirstConfirm(false);
                } else {
                    setFirstConfirm(true);
                }
            }

            if (firstConfirm === true) {
                const remainingTime =
                    Date.now() - new Date(auth.currentUser.createdAt).getTime();
                if (remainingTime < 259200000) {
                    setAccountDisabledCountdown(
                        msToTime(259200000 - remainingTime),
                    );
                    setAccountDisabledWarning(true);
                } else {
                    setAccountDisabledError(true);
                }
            }
        }
    }, [open, dispatch, auth.currentUser, boards, firstConfirm]);

    const copyLinkModal = () => (
        <Dialog
            onClose={() => setOpenShare(false)}
            open={openShare}
            maxWidth="md"
        >
            <DialogTitle>
                <Typography variant="h4" textAlign="center">
                    Invitation Link:
                </Typography>
            </DialogTitle>
            <DialogContent style={{ padding: 20 }}>
                <Typography>{dashboard.invite}</Typography>
            </DialogContent>
        </Dialog>
    );

    const copyLink = () => {
        if (dashboard.invite != null) {
            try {
                navigator.clipboard
                    .writeText(dashboard.invite)
                    .then(() => {
                        dispatch(
                            setNotes({
                                success:
                                    "Successfully copied to clipboard. Please paste with ctr + v",
                            }),
                        );
                    })
                    .catch(() => {
                        setOpenShare(true);
                        dispatch(
                            setNotes({
                                success:
                                    "A pop-up has been added with your link for you to manually copy",
                            }),
                        );
                    });
            } catch (err) {
                setOpenShare(true);
                dispatch(
                    setNotes({
                        success:
                            "A pop-up has been added with your link for you copy",
                    }),
                );
            }
        } else {
            dispatch(setNotes({ error: "You need to create a link first" }));
        }
    };

    const rankStyle = {};
    rankStyle.marginLeft = "20px";
    rankStyle.marginRight = "20px";
    rankStyle.position = "center";
    if (auth.currentUser?.level === 400) {
        rankStyle.background = "rgb(215, 215, 215)";
        rankStyle.color = "black";
    } else if (auth.currentUser?.level === 1600) {
        rankStyle.background = "gold";
    } else if (auth.currentUser?.level === 100) {
        rankStyle.background = "#CD7F32";
    } else if (auth.currentUser?.level === 5000) {
        rankStyle.background = "rgb(229, 228, 226)";
        rankStyle.color = "black";
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
        >
            <div style={{ position: "absolute" }}>{copyLinkModal()}</div>

            <Grid item xs={12}>
                <AppBar open={open}>
                    <Toolbar
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            background: "#131a35",
                            height: `${drawerHeight}px`,
                        }}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawer}
                            edge="start"
                            sx={{
                                mr: 2,
                                ...(open && { width: `${drawerWidth2}px` }),
                            }}
                        >
                            <MenuOpen />
                        </IconButton>
                        {!open && <TopDrawer />}
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid item xs={12} style={{ marginTop: `${drawerHeight}px` }}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                    width="100%"
                >
                    {accountDisabledWarning ? (
                        <Grid
                            item
                            xs={3}
                            style={{
                                textAlign: "center",
                                background: "yellow",
                                color: "black",
                                padding: "10px",
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold">
                                You have {accountDisabledCountdown} to complete
                                your first gift.
                            </Typography>
                        </Grid>
                    ) : (
                        <div />
                    )}
                    {accountDisabledError ? (
                        <Grid
                            item
                            xs={12}
                            style={{
                                textAlign: "center",
                                background: "red",
                                color: "white",
                                padding: "10px",
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold">
                                Your account has been marked for deletion as you
                                have not gifted within the allocated time.
                            </Typography>
                        </Grid>
                    ) : (
                        <div />
                    )}
                    {unverifiedEmail ? (
                        <Grid
                            item
                            xs={12}
                            style={{
                                textAlign: "center",
                                background: "red",
                                color: "white",
                                padding: "10px",
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold">
                                Your email is not verified, and you will not be
                                able to get support emails, including password
                                reset.
                            </Typography>
                        </Grid>
                    ) : (
                        <div />
                    )}
                    {sideLined ? (
                        <Grid
                            item
                            xs={12}
                            style={{
                                textAlign: "center",
                                background: "#64306075",
                                color: "white",
                                padding: "10px",
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold">
                                You have not invited 2 people that have gifted
                                and will not be able to progress after your
                                first bronze board.
                            </Typography>
                        </Grid>
                    ) : (
                        <div />
                    )}
                    {firstConfirm ? (
                        <Grid
                            item
                            xs={12}
                            style={{
                                textAlign: "center",
                                background: "#64306075",
                                color: "white",
                                padding: "10px",
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold">
                                You have not been confirmed on your first board
                                and will not be able to create inviter links.
                            </Typography>
                        </Grid>
                    ) : (
                        <div />
                    )}
                </Grid>
                <Outlet />
            </Grid>
            <Drawer
                sx={{
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        backgroundColor: "#131a35",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    style={{ color: "white", backgroundColor: "#131a35" }}
                >
                    <Grid item>
                        <IconButton onClick={handleDrawerClose}>
                            <Grid>
                                <img src={logo} alt="logo" width="170" />
                            </Grid>
                            {theme.direction === "ltr" ? (
                                <ChevronLeftIcon />
                            ) : (
                                <ChevronRightIcon />
                            )}
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            variant="h4"
                            style={{ textAlign: "center" }}
                        >
                            User Info
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        style={{ textAlign: "center", marginTop: "10px" }}
                    >
                        <Typography>Username:</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        style={{ textAlign: "center", margin: "10px" }}
                    >
                        <Typography variant="h5">
                            {auth.currentUser?.username}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            style={{
                                textAlign: "right",
                                marginLeft: "10px",
                                marginTop: "25px",
                            }}
                        >
                            Rank:
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        style={{ textAlign: "center", marginTop: "25px" }}
                    >
                        <Typography style={rankStyle}>
                            ${auth.currentUser?.level}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            style={{
                                textAlign: "right",
                                // marginLeft: "10px",
                                marginTop: "25px",
                            }}
                        >
                            Gifts Received:
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        style={{ textAlign: "center", marginTop: "25px" }}
                    >
                        <Typography>${auth.currentUser?.balanc}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            style={{ textAlign: "right", marginLeft: "10px" }}
                        >
                            Invitees:
                        </Typography>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: "center" }}>
                        <Typography>
                            {auth.currentUser?.invitedCount}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            variant="h4"
                            style={{ textAlign: "center", marginTop: "25px" }}
                        >
                            Invitation Link
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item xs={6} style={{ textAlign: "center" }}>
                                <Button
                                    variant="outlined"
                                    style={{ margin: "5px" }}
                                    onClick={() => dispatch(getReferalLink())}
                                >
                                    <img
                                        alt="temp"
                                        src={generate}
                                        width="35px"
                                    />
                                </Button>
                                <Typography>Create</Typography>
                            </Grid>
                            <Grid item xs={6} style={{ textAlign: "center" }}>
                                <Button
                                    variant="outlined"
                                    style={{ margin: "5px" }}
                                    onClick={() => copyLink()}
                                >
                                    <img alt="temp" src={share} width="30px" />
                                </Button>
                                <Typography>Copy</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Drawer>
        </Grid>
    );
}

export default Header;
