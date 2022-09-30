import { ChatBubble, Close } from "@mui/icons-material";
import { AppBar, Button, Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLastSeenMessages } from "../../redux/actions/dashboard.action";

export default function ChatProviderDrawer(contents) {
    const { treevalue, boardId } = useSelector(
        (state) => state.dashboard.boardDetails,
    );
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const getBoardsNumber = (boardName) => {
        if (boardName === "bronze") return 100;
        if (boardName === "silver") return 400;
        if (boardName === "gold") return 1600;
        if (boardName === "platinum") return 5000;
        return "Cannot be obtained";
    };

    const handleDrawerOpen = () => {
        dispatch(setLastSeenMessages(getBoardsNumber(treevalue), boardId));
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Grid container>
            <CssBaseline />
            <Drawer variant="persistent" anchor="bottom" open={open}>
                <Grid container>
                    <Grid xs={12}>
                        <IconButton onClick={handleDrawerClose}>
                            <Close />
                        </IconButton>
                    </Grid>
                    <Grid xs={12}>{contents()}</Grid>
                </Grid>
            </Drawer>
            <AppBar
                position="relative"
                open={open}
                style={{ backgroundColor: "white" }}
            >
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        style={{ margin: "10px" }}
                    >
                        <Button
                            onClick={handleDrawerOpen}
                            variant="outlined"
                            style={{ backgroundColor: "#00314D" }}
                        >
                            <Typography variant="h6" color="white">
                                Open Board Chat
                                <ChatBubble />
                            </Typography>
                        </Button>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Grid>
    );
}
