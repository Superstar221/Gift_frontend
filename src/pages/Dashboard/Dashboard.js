import { Button, Grid } from "@mui/material";
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Boards from "../../components/Boards/Boards";
import CarouselFrontPage from "../../components/Carousel/Carousel";
import {
    closeCurrentBoard,
    getLinkedBoards,
} from "../../redux/actions/dashboard.action";
import BigBoard from "./BigBoard";

function Dashboard() {
    const dispatch = useDispatch();
    const boardDetails = useSelector((state) => state.dashboard.boardDetails);

    function closeBoard() {
        dispatch(closeCurrentBoard());
    }

    useEffect(() => {
        dispatch(getLinkedBoards(true));
    }, [dispatch]);
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            // alignItems="center"
            // style={{
            //     minWidth: "70vw",
            //     backgroundColor: "#01314D",
            //     minHeight: "100vh",
            // }}
        >
            {boardDetails === null ? (
                <Grid item xs={12} style={{ margin: "20px" }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <CarouselFrontPage />
                        </Grid>
                        <Grid item xs={12}>
                            <Boards />
                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                <Grid item xs={12} style={{ margin: "20px" }}>
                    <Grid container>
                        <Grid item xs={1}>
                            <Button
                                size="small"
                                variant="outlined"
                                style={{ color: "white" }}
                                onClick={() => closeBoard()}
                            >
                                Back
                            </Button>
                        </Grid>
                        <Grid item xs={11} />
                        <Grid item xs={12}>
                            <BigBoard />
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
}

export default Dashboard;
