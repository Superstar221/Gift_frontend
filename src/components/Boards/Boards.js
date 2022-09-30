import { React } from "react";
import { Button, Grid, Typography } from "@mui/material";
import SimpleMediaQuery from "../../pages/Dashboard/SimpleMediaQuery";
import Board from "../Board/Board";
import Chat from "../Chat/Chat";

const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
};

const onClickUrl = (url) => () => openInNewTab(url);

function Boards() {
    const nHorizontal = SimpleMediaQuery();
    if (nHorizontal) {
        return (
            <Grid container>
                <Grid item xs={3}>
                    <Board value={100} />
                </Grid>
                <Grid item xs={3}>
                    <Board value={400} />
                </Grid>
                <Grid item xs={3}>
                    <Board value={1600} />
                </Grid>
                <Grid item xs={3}>
                    <Board value={5000} />
                </Grid>
                <Grid
                    item
                    xs={12}
                    style={{ marginTop: "20px" }}
                    data-id="2b7cf04fe5"
                    className="livechat_button"
                    textAlign="center"
                >
                    <Chat />
                    <a href="https://www.livechat.com/?utm_source=chat_button&utm_medium=referral&utm_campaign=lc_13437153">
                        {" "}
                    </a>
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        textAlign="center"
                    >
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                style={{
                                    margin: "5px",
                                    backgroundColor: "white",
                                    color: "#01314D",
                                }}
                                onClick={onClickUrl(
                                    "https://www.ggmovement.org/donate/",
                                )}
                            >
                                <Typography>GGM Donate</Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                style={{
                                    margin: "5px",
                                    backgroundColor: "white",
                                    color: "#01314D",
                                }}
                                onClick={onClickUrl(
                                    "https://www.ggmovement.org/loveheart/",
                                )}
                            >
                                <Typography>LoveHeart Request</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
    return (
        <Grid container>
            <Grid item xs={2} />
            <Grid item xs={8}>
                <Board value={100} />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={2} />
            <Grid item xs={8}>
                <Board value={400} />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={2} />
            <Grid item xs={8}>
                <Board value={1600} />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={2} />
            <Grid item xs={8}>
                <Board value={5000} />
            </Grid>
            <Grid item xs={2} />
            <Grid
                item
                xs={12}
                style={{ marginTop: "20px" }}
                data-id="2b7cf04fe5"
                className="livechat_button"
                textAlign="center"
            >
                <Chat />
                <a href="https://www.livechat.com/?utm_source=chat_button&utm_medium=referral&utm_campaign=lc_13437153">
                    {" "}
                </a>
            </Grid>
            <Grid item xs={12}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                >
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            style={{
                                margin: "5px",
                                backgroundColor: "white",
                                color: "#01314D",
                            }}
                            onClick={onClickUrl(
                                "https://www.ggmovement.org/donate/",
                            )}
                        >
                            <Typography>GGM Donate</Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            style={{
                                margin: "5px",
                                backgroundColor: "white",
                                color: "#01314D",
                            }}
                            onClick={onClickUrl(
                                "https://www.ggmovement.org/beneficiary/",
                            )}
                        >
                            <Typography>LoveHeart Request</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Boards;
