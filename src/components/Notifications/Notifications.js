/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-expressions */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function Notifications() {
    const { notification } = useSelector((state) => state.notes);
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        for (const key in notification) {
            notification &&
                enqueueSnackbar(notification[key], { variant: key });
        }
    }, [notification, enqueueSnackbar]);
    return <></>;
}

export default Notifications;
