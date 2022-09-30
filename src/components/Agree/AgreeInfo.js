import { Close } from "@mui/icons-material";
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    Grid,
    IconButton,
} from "@mui/material";
import { React, useState } from "react";
import Terms from "../../pages/Info/terms";
import Policy from "../Policy/Policy";

function AgreeInfo() {
    const [open, setOpen] = useState(false);
    const closeAgree = () => {
        setOpen(false);
    };

    const openAgree = () => {
        setOpen(true);
    };

    const copyModal = () => (
        <Grid container>
            <Dialog open={open} onClose={() => closeAgree()}>
                <DialogTitle id="id">
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1} />
                        <Box>
                            <IconButton onClick={() => closeAgree()}>
                                <Close />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>
                <Grid item xs={12}>
                    <Policy />
                    <Terms />
                </Grid>
                <Grid item xs={12}>
                    <Box flexGrow={1} />
                    <Button
                        onClick={() => closeAgree()}
                        variant="contained"
                        style={{
                            backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                            color: "white",
                            margin: "20px",
                        }}
                    >
                        Close
                    </Button>
                </Grid>
            </Dialog>
        </Grid>
    );
    return (
        <Grid item xs={12} style={{ margin: "10px" }}>
            <div style={{ position: "absolute" }}>{copyModal()}</div>
            <Button
                onClick={() => openAgree()}
                variant="contained"
                style={{
                    backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                    color: "white"
                }}
            >
                View Terms and Conditions
            </Button>
        </Grid>
    );
}

export default AgreeInfo;
