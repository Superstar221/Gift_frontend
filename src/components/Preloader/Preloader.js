import { Backdrop, CircularProgress } from "@mui/material";
import { styled } from "@mui/styles";
import React from "react";
import { useSelector } from "react-redux";

const StyledBackDrop = styled(Backdrop)(({ theme }) => ({
    color: theme.backdrop.color,
    zIndex: theme.backdrop.zIndex,
}));

function PreLoader() {
    const { backDrop } = useSelector((state) => state.auth);
    return (
        <StyledBackDrop open={backDrop}>
            <CircularProgress />
        </StyledBackDrop>
    );
}

export default PreLoader;
