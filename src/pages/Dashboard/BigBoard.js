/* eslint-disable no-underscore-dangle */
import { Grid, Typography } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BigBoardCircle from "../../components/BigBoardCircle/BigBoardCircle";
import ChatProvider from "../../components/ChatProvider/ChatProvider";
import {
    boardClose,
    closeCurrentBoard,
} from "../../redux/actions/dashboard.action";
import SimpleMediaQuery from "./SimpleMediaQuery";

export default function BigBoard() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.token || sessionStorage.token;
    const { boardDetails } = useSelector((state) => state.dashboard);
    const { currentUser } = useSelector((state) => state.auth);
    const [actionType, setActionType] = useState(null);

    useEffect(() => {
        if (actionType === "confirm" || actionType === null) {
            if (currentUser._id === boardDetails.senior?.user?._id) {
                const confirmed = boardDetails.freshman.every(
                    (freshman) => freshman?.confirmed,
                );
                if (confirmed) {
                    const { boardId } = boardDetails;
                    dispatch(boardClose(boardId));
                    history("/dashboard");
                    dispatch(closeCurrentBoard());
                }
            }
        }
        setActionType(null);
    }, [boardDetails, actionType, currentUser._id, dispatch, history, token]);

    const getBoardDateTime = () => {
        if (boardDetails.createdAt) {
            return `Board Created on ${boardDetails.createdAt.split("T")[0]}`;
        }
        return "";
    };

    const getBoardId = () => {
        if (boardDetails.boardId) {
            return `Board ID: ${boardDetails.boardId}`;
        }
        return "";
    };

    const getLeftGreyscaleEffect = () => {
        if (boardDetails.leftClosed === true) {
            return "grayscale(100%)";
        }
        return "grayscale(0%)";
    };

    const getRightGreyscaleEffect = () => {
        if (boardDetails.rightClosed === true) {
            return "grayscale(100%)";
        }
        return "grayscale(0%)";
    };

    const boardUser = (bHorizontal) => {
        if (bHorizontal) {
            return (
                <Grid container>
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                        >
                            <Grid item xs={4}>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="flex-end"
                                    alignItems="flex-start"
                                >
                                    <Grid item xs={12}>
                                        <Typography variant="h5">
                                            Left Hemisphere:
                                            {boardDetails.leftClosed
                                                ? " Closed"
                                                : " Open"}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>
                                            Gifters 1-4 enters on left
                                            hemisphere
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="flex-end"
                                    alignItems="center"
                                >
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="h5"
                                            style={{ position: "center" }}
                                        >
                                            <Typography>
                                                {getBoardDateTime()}
                                            </Typography>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="h4"
                                            style={{
                                                textTransform: "uppercase",
                                                textShadow:
                                                    " 2px 4px 3px rgba(0,0,0,0.15)",
                                            }}
                                        >
                                            {boardDetails?.treevalue} Board
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1">
                                            {getBoardId()}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="flex-end"
                                    alignItems="flex-end"
                                >
                                    <Grid item xs={12}>
                                        <Typography variant="h5">
                                            Right Hemisphere:
                                            {boardDetails.rightClosed
                                                ? " Closed"
                                                : " Open"}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>
                                            Gifters 5-8 enters on right
                                            hemisphere
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container style={{ marginBottom: "20px" }}>
                        <Grid item xs={4} />
                        <Grid item xs={4}>
                            <ChatProvider />
                        </Grid>
                        <Grid item xs={4} />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid
                            container
                            style={{
                                background: "#00314f",
                                textAlign: "center",
                            }}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item xs={1}>
                                GIFTERS
                            </Grid>
                            <Grid item xs={1}>
                                BUILDERS
                            </Grid>
                            <Grid item xs={1}>
                                GUIDE
                            </Grid>
                            <Grid item xs={1}>
                                LEGEND
                            </Grid>
                            <Grid item xs={1}>
                                GUIDE
                            </Grid>
                            <Grid item xs={1}>
                                BUILDERS
                            </Grid>
                            <Grid item xs={1}>
                                GIFTERS
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            style={{
                                backgroundImage: `url(images/board_bg.png)`,
                                backgroundSize: "40vw",
                                backgroundColor: "white",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        >
                            <Grid item xs={1}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                    style={{
                                        filter: getLeftGreyscaleEffect(),
                                    }}
                                >
                                    <Grid item xs={12}>
                                        <BigBoardCircle
                                            title="Gifter"
                                            item={boardDetails.freshman[0]}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <BigBoardCircle
                                            title="Gifter"
                                            item={boardDetails.freshman[1]}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <BigBoardCircle
                                            title="Gifter"
                                            item={boardDetails.freshman[2]}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <BigBoardCircle
                                            title="Gifter"
                                            item={boardDetails.freshman[3]}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={1}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                    style={{
                                        filter: getLeftGreyscaleEffect(),
                                    }}
                                >
                                    <Grid item xs={12}>
                                        <BigBoardCircle
                                            title="Builder"
                                            item={boardDetails.sophmore[0]}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <BigBoardCircle
                                            title="Builder"
                                            item={boardDetails.sophmore[1]}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={1}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                    style={{
                                        filter: getLeftGreyscaleEffect(),
                                    }}
                                >
                                    <Grid item xs={12}>
                                        <BigBoardCircle
                                            title="Guide"
                                            item={boardDetails.junior[0]}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={1}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                >
                                    <Grid item xs={12}>
                                        <BigBoardCircle
                                            title="Legend"
                                            item={boardDetails.senior}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={1}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                    style={{
                                        filter: getRightGreyscaleEffect(),
                                    }}
                                >
                                    <Grid item xs={12}>
                                        <BigBoardCircle
                                            title="Guide"
                                            item={boardDetails.junior[1]}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={1}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                    style={{
                                        filter: getRightGreyscaleEffect(),
                                    }}
                                >
                                    <Grid item xs={12}>
                                        <BigBoardCircle
                                            title="Builder"
                                            item={boardDetails.sophmore[3]}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <BigBoardCircle
                                            title="Builder"
                                            item={boardDetails.sophmore[2]}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={1}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                    style={{
                                        filter: getRightGreyscaleEffect(),
                                    }}
                                >
                                    <Grid item xs={12}>
                                        <BigBoardCircle
                                            title="Gifter"
                                            item={boardDetails.freshman[7]}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <BigBoardCircle
                                            title="Gifter"
                                            item={boardDetails.freshman[6]}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <BigBoardCircle
                                            title="Gifter"
                                            item={boardDetails.freshman[5]}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <BigBoardCircle
                                            title="Gifter"
                                            item={boardDetails.freshman[4]}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }
        return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
            >
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                        >
                            <Grid item xs={12} style={{ color: "white" }}>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="flex-end"
                                    alignItems="center"
                                >
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="h5"
                                            style={{ position: "center" }}
                                        >
                                            <Typography>
                                                {getBoardDateTime()}
                                            </Typography>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="h4"
                                            style={{
                                                textTransform: "uppercase",
                                                color: "white",
                                                textShadow:
                                                    " 2px 4px 3px rgba(0,0,0,0.3)",
                                            }}
                                        >
                                            {boardDetails?.treevalue} Board
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>{getBoardId()}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container style={{ marginBottom: "20px" }}>
                    <Grid item xs={12}>
                        <ChatProvider />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justifyContent="space-between"
                        style={{
                            backgroundImage: `url(images/board_bg.png)`,
                            backgroundSize: "100vw",
                            backgroundColor: "white",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <Grid item xs={12}>
                            <Grid
                                container
                                direction="row-reverse"
                                justifyContent="space-evenly"
                                alignItems="center"
                                style={{
                                    width: "80vw",
                                    filter: getLeftGreyscaleEffect(),
                                }}
                            >
                                <Grid item xs={3}>
                                    <BigBoardCircle
                                        title="Gifter"
                                        item={boardDetails.freshman[0]}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <BigBoardCircle
                                        title="Gifter"
                                        item={boardDetails.freshman[1]}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <BigBoardCircle
                                        title="Gifter"
                                        item={boardDetails.freshman[2]}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <BigBoardCircle
                                        title="Gifter"
                                        item={boardDetails.freshman[3]}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid
                                container
                                direction="row-reverse"
                                justifyContent="space-evenly"
                                alignItems="center"
                                style={{
                                    width: "40vw",
                                    filter: getLeftGreyscaleEffect(),
                                }}
                            >
                                <Grid item xs={6}>
                                    <BigBoardCircle
                                        title="Builder"
                                        item={boardDetails.sophmore[0]}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <BigBoardCircle
                                        title="Builder"
                                        item={boardDetails.sophmore[1]}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Grid
                                container
                                direction="row-reverse"
                                justifyContent="space-evenly"
                                alignItems="center"
                                style={{
                                    width: "20vw",
                                    filter: getLeftGreyscaleEffect(),
                                }}
                            >
                                <Grid item xs={12}>
                                    <BigBoardCircle
                                        title="Guide"
                                        item={boardDetails.junior[0]}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Grid
                                container
                                direction="row-reverse"
                                justifyContent="space-evenly"
                                alignItems="center"
                                style={{ width: "20vw" }}
                            >
                                <Grid item xs={12}>
                                    <BigBoardCircle
                                        title="Legend"
                                        item={boardDetails.senior}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Grid
                                container
                                direction="row-reverse"
                                justifyContent="space-evenly"
                                alignItems="center"
                                style={{
                                    width: "20vw",
                                    filter: getRightGreyscaleEffect(),
                                }}
                            >
                                <Grid item xs={12}>
                                    <BigBoardCircle
                                        title="Guide"
                                        item={boardDetails.junior[1]}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid
                                container
                                direction="row-reverse"
                                justifyContent="space-evenly"
                                alignItems="center"
                                style={{
                                    width: "40vw",
                                    filter: getRightGreyscaleEffect(),
                                }}
                            >
                                <Grid item xs={6}>
                                    <BigBoardCircle
                                        title="Builder"
                                        item={boardDetails.sophmore[3]}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <BigBoardCircle
                                        title="Builder"
                                        item={boardDetails.sophmore[2]}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid
                                container
                                direction="row-reverse"
                                justifyContent="space-evenly"
                                alignItems="center"
                                style={{
                                    width: "80vw",
                                    filter: getRightGreyscaleEffect(),
                                }}
                            >
                                <Grid item xs={3}>
                                    <BigBoardCircle
                                        title="Gifter"
                                        item={boardDetails.freshman[7]}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <BigBoardCircle
                                        title="Gifter"
                                        item={boardDetails.freshman[6]}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <BigBoardCircle
                                        title="Gifter"
                                        item={boardDetails.freshman[5]}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <BigBoardCircle
                                        title="Gifter"
                                        item={boardDetails.freshman[4]}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    };

    return (
        <div style={{ color: "white" }}>{boardUser(SimpleMediaQuery())}</div>
    );
}
