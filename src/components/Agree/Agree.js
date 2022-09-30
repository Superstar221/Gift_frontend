import { React } from "react";
import { Close } from "@mui/icons-material";
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    Grid,
    IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Terms from "../../pages/Info/terms";
import { openTermsModal } from "../../redux/actions/auth.action";
import { sendAgreeToTsAndCs } from "../../redux/actions/dashboard.action";
import Policy from "../Policy/Policy";

function Agree() {
    const dispatch = useDispatch();
    const history = useNavigate();

    const { auth } = useSelector((state) => state);

    const agreeToTCs = () => {
        dispatch(
            sendAgreeToTsAndCs(
                auth.login.loginname,
                auth.login.password,
                auth.login.remember,
                history,
            ),
        );
    };

    const closeAgree = () => {
        dispatch(openTermsModal(false));
    };

    const copyLinkModal = () => (
        <Grid container>
            <Dialog open={auth.agreeOpen} onClose={() => closeAgree()}>
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
                        onClick={() => agreeToTCs()}
                        color="primary"
                        variant="contained"
                        style={{
                            backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                            color: "white"
                        }}
                    >
                        Agree
                    </Button>
                    <Button
                        onClick={() => closeAgree()}
                        variant="contained"
                        style={{
                            backgroundImage: "linear-gradient(152deg, #27818b, #3b39b1)",
                            color: "white"
                        }}
                    >
                        Close
                    </Button>
                </Grid>
            </Dialog>
        </Grid>
    );

    return <Grid style={{ position: "absolute" }}>{copyLinkModal()}</Grid>;
}

export default Agree;
