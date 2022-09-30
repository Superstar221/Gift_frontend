import {
    Avatar,
    Button,
    Grid,
    Menu,
    MenuItem,
    Typography,
    useTheme,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import SimpleMediaQuery from "../../../pages/Dashboard/SimpleMediaQuery";
import teleg from "./teleg.png";

export default function TopDrawer() {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const openInNewTab = (url) => {
        const newWindow = window.open(url, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
    };

    const onClickUrl = (url) => () => openInNewTab(url);

    const menuitems = (direction) => (
        <Grid container direction={direction}>
            <MenuItem component={Link} to="/dashboard">
                <Typography variant="body1">Boards</Typography>
            </MenuItem>
            <MenuItem onClick={onClickUrl("https://13437153.kb.help")}>
                <Typography variant="body1">Academy</Typography>
            </MenuItem>
            <MenuItem component={Link} to="/dashboard/personal-info">
                <Typography variant="body1">Personal Info</Typography>
            </MenuItem>
            <MenuItem onClick={onClickUrl("https://t.me/+7roMRhpJGJEzYzE0")}>
                <Avatar src={teleg} />
            </MenuItem>
            <MenuItem component={Link} to="/" onClick={logout}>
                <Typography variant="body1">Logout</Typography>
            </MenuItem>
        </Grid>
    );

    const mediaQuery = () => {
        if (SimpleMediaQuery(theme.breakpoints.down(905))) {
            return <Grid>{menuitems("row")}</Grid>;
        }
        return (
            <Grid>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    {menuitems("column")}
                </Menu>
                <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    style={{ color: "white" }}
                >
                    Menu
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    {menuitems("column")}
                </Menu>
            </Grid>
        );
    };

    return <Grid>{mediaQuery()}</Grid>;
}
