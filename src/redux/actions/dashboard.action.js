/* eslint-disable no-underscore-dangle */
import tryAndCatchRequestWithErrorHandling from "../../components/errorCode/errorCode";
import API from "../API";
import {
    disable2FAPopUp,
    openTermsModal,
    set2FASecret,
    setUser,
    verifyToken,
} from "./auth.action";
import setAuthError from "./error.action";
import setNotes from "./notification.action";

export function setOpenDrawer(data) {
    return {
        type: "setOpenDrawer",
        data,
    };
}

function boardDetails(item) {
    return {
        type: "boardDetails",
        item,
    };
}

function setBoards(data) {
    return {
        type: "setBoards",
        data,
    };
}

function setLastSeen(lastMessageCount, level) {
    return {
        type: "setLastSeen",
        data: {
            level,
            lastMessageCount,
        },
    };
}

function setNotifications(notifications, level, lastMessageCount) {
    return {
        type: "setNotifications",
        data: {
            notifications,
            level,
            lastMessageCount,
        },
    };
}

function setReferalLink(link) {
    return {
        type: "setReferalLink",
        link,
    };
}

export function getLinkedBoards() {
    return async (dispatch) => {
        async function successFunction(data) {
            const { perpetualUsers } = data;
            dispatch(setBoards(perpetualUsers));
        }

        async function requestFunction() {
            return API.get("boards/active");
        }

        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            null,
            requestFunction,
            3000,
            successFunction,
            null,
            null,
        );
    };
}

export function getCurrentMessageLength(board, level) {
    return async (dispatch) => {
        const json = JSON.stringify({
            board,
        });

        async function successFunction(data) {
            const { count } = data;
            dispatch(setLastSeen(count, level));
        }

        async function requestFunction() {
            return API.post("chat/getMessageCount", json);
        }

        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            null,
            requestFunction,
            3200,
            successFunction,
            null,
            null,
        );
    };
}

export function setLastSeenMessages(level, boardId) {
    return async (dispatch) => {
        const json = JSON.stringify({
            level,
            boardId,
        });

        async function requestFunction() {
            return API.post("notifications/updateLastSeen", json);
        }

        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            null,
            requestFunction,
            3300,
            null,
            null,
            null,
        );
    };
}

export function getNotifications(level) {
    return async (dispatch) => {
        const json = JSON.stringify({
            level,
        });

        async function successFunction(data) {
            const { notifications, lastMessageCount } = data;
            dispatch(setNotifications(notifications, level, lastMessageCount));
        }

        async function requestFunction() {
            return API.post("notifications/get", json);
        }

        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            null,
            requestFunction,
            3200,
            successFunction,
            null,
            null,
        );
    };
}

export function deleteNotification(id, level) {
    return async (dispatch) => {
        const json = JSON.stringify({
            id,
            level,
        });

        async function successFunction(data) {
            const { notifications } = data;
            dispatch(setNotifications(notifications, level));
        }

        async function requestFunction() {
            return API.post("notifications/delete", json);
        }

        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            null,
            requestFunction,
            3200,
            successFunction,
            null,
            null,
        );
    };
}

export function joinNewBoard(level, bypass) {
    return async (dispatch) => {
        async function successFunction() {
            dispatch(getLinkedBoards());
        }

        async function preRequestFunction() {
            return {
                boardLevel: level,
                bypassReferrer: bypass,
            };
        }

        async function requestFunction(json) {
            return API.post("boards/join", json);
        }

        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            preRequestFunction,
            requestFunction,
            2600,
            successFunction,
            null,
            null,
        );
    };
}

export function getCurrentBoard(item) {
    return async (dispatch) => {
        async function successFunction(r) {
            const { board } = r;
            dispatch(boardDetails(board));
        }

        async function requestFunction() {
            return API.get(`boards/view/${item}`);
        }

        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            null,
            requestFunction,
            3100,
            successFunction,
            null,
            null,
        );
    };
}

export function removeMember(boardId, userId, currentUser) {
    return async (dispatch) => {
        async function successFunction() {
            if (userId === currentUser._id) {
                window.location.href = "/dashboard";
                dispatch(getLinkedBoards());
            } else {
                dispatch(getCurrentBoard(boardId));
            }
        }
        async function requestFunction() {
            return API.delete(`boards/remove/${boardId}/${userId}`);
        }
        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            null,
            requestFunction,
            2700,
            successFunction,
            null,
            null,
        );
    };
}

export function confirmMember(boardId, userId, callback) {
    return async (dispatch) => {
        async function successFunction() {
            dispatch(getCurrentBoard(boardId, callback));
        }

        async function requestFunction() {
            return API.put(`boards/confirm/${boardId}/${userId}`);
        }

        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            null,
            requestFunction,
            2800,
            successFunction,
            null,
            null,
        );
    };
}

export function forfeitAccount(boardId, callback) {
    return async (dispatch) => {
        async function successFunction() {
            dispatch(getCurrentBoard(boardId, callback));
        }

        async function requestFunction() {
            return API.post(`boards/quit`);
        }
        // Change Code
        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            null,
            requestFunction,
            3400,
            successFunction,
            null,
            null,
        );
    };
}

export function reactivateAccount(boardId, userId, callback) {
    return async (dispatch) => {
        async function successFunction() {
            dispatch(getCurrentBoard(boardId, callback));
        }

        async function requestFunction() {
            return API.post(`boards/reactivate/${boardId}/${userId}`);
        }
        // Change Code
        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            null,
            requestFunction,
            3500,
            successFunction,
            null,
            null,
        );
    };
}

export function getReferalLink() {
    return async (dispatch) => {
        function successFunction(response) {
            const { link } = response;

            if (link !== null && link !== undefined) {
                dispatch(setReferalLink(link));
            } else {
                dispatch(
                    setNotes({
                        error: "Could not generate inviter link. Error Code: 001307",
                    }),
                );
            }
        }

        async function requestFunction() {
            return API.get("user/generateInviterToken");
        }

        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            null,
            requestFunction,
            1300,
            successFunction,
            null,
            null,
        );
    };
}

export function get2FAActivationKey(username) {
    return async (dispatch) => {
        let secret = null;
        async function successSuccessFunction(response) {
            const { qrCode } = response;
            if (qrCode !== null && qrCode !== undefined) {
                // eslint-disable-next-line no-param-reassign
                secret.qrCode = qrCode;
                dispatch(set2FASecret(secret));
            } else {
                dispatch(
                    setNotes({
                        error: "Unable to Generate Key. Error Code: 000-170",
                    }),
                );
            }
        }

        async function successFunction(response) {
            async function preRequestFunction() {
                secret = response.secret;
                if (secret !== null && secret !== undefined) {
                    const { otpauth_url: otpPathUrl } = secret;
                    let text = String(otpPathUrl);
                    text = text.replace(
                        "SecretKey",
                        `Gift%20of%20Legacy%20-${username}`,
                    );
                    return JSON.stringify({ secret: text });
                }
                return false;
            }

            async function requestFunction2(json) {
                return API.post("user/generateQRCode", json);
            }

            await tryAndCatchRequestWithErrorHandling(
                dispatch,
                preRequestFunction,
                requestFunction2,
                2100,
                successSuccessFunction,
                null,
                null,
            );
        }

        async function requestFunction() {
            return API.get("user/generate2FAKey");
        }

        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            null,
            requestFunction,
            1500,
            successFunction,
            null,
            null,
        );
    };
}

export function sendAgreeToTsAndCs(
    emailOrUsername,
    password,
    remember,
    history,
) {
    return async (dispatch) => {
        async function preRequestFunction() {
            const json = JSON.stringify({
                emailOrUsername,
                password,
                agree: true,
            });
            return json;
        }

        async function requestFunction(json) {
            return API.post("user/login", json);
        }

        async function successFunction(generateResponse) {
            const { message, token } = generateResponse;
            dispatch(openTermsModal(false));
            if (message === "User Logged In!") {
                dispatch(setNotes({ success: "Agreed To Terms" }));
                dispatch(setAuthError(null, "loginErrors"));
                if (!remember) {
                    localStorage.removeItem("token");
                    sessionStorage.token = token;
                } else {
                    sessionStorage.removeItem("token");
                    localStorage.token = token;
                }
                dispatch(verifyToken(history));
            } else if (message === "Need Passcode") {
                dispatch(disable2FAPopUp(true));
            } else {
                dispatch(
                    setNotes({
                        error: "Unable to login. Error Code: 001907",
                    }),
                );
            }
        }

        async function errorFunction() {
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            dispatch(setUser(null));
        }

        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            preRequestFunction,
            requestFunction,
            1900,
            successFunction,
            errorFunction,
        );
    };
}

export function verifyQRPasscodeAndSaveSecret(secret, passCode) {
    return async (dispatch) => {
        async function successSuccessFunction() {
            dispatch(disable2FAPopUp(true));
            dispatch(verifyToken());
        }

        async function successFunction() {
            async function preRequestFunction2() {
                return JSON.stringify({ secret });
            }

            async function requestFunction2(json2) {
                return API.post("user/saveQRCodeSecret", json2);
            }
            await tryAndCatchRequestWithErrorHandling(
                dispatch,
                preRequestFunction2,
                requestFunction2,
                2300,
                successSuccessFunction,
                null,
                null,
            );
        }

        async function preRequestFunction() {
            return JSON.stringify({ passCode, secret });
        }

        async function requestFunction(json) {
            return API.post("user/verifyPassCode", json);
        }

        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            preRequestFunction,
            requestFunction,
            2200,
            successFunction,
            null,
            null,
        );
    };
}

export function verifyQRPasscode(
    passcode,
    emailOrUsername,
    password,
    remember,
    history,
) {
    return async (dispatch) => {
        async function preRequestFunction() {
            const json = JSON.stringify({
                emailOrUsername,
                password,
                passcode,
            });
            return json;
        }

        async function requestFunction(json) {
            return API.post("user/login", json);
        }

        async function successFunction(response) {
            const { token, message } = response;
            if (token !== null && token !== undefined) {
                dispatch(setAuthError(null, "loginErrors"));
                if (!remember) {
                    localStorage.removeItem("token");
                    sessionStorage.token = token;
                } else {
                    sessionStorage.removeItem("token");
                    localStorage.token = token;
                }
                dispatch(
                    setNotes({
                        success:
                            "Successfully authenticated with 2FA, Logging In",
                    }),
                );
                dispatch(verifyToken(history));
            } else {
                localStorage.removeItem("token");
                sessionStorage.removeItem("token");
                dispatch(setUser(null));

                if (message === "Need Agree") {
                    dispatch(
                        setNotes({
                            error: "You need to agree to our Terms and Conditions before we can log you in",
                        }),
                    );
                    dispatch(openTermsModal(true));
                } else {
                    dispatch(
                        setNotes({
                            error: "Unable to verify your passcode. Error Code: 001908",
                        }),
                    );
                }
            }
        }
        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            preRequestFunction,
            requestFunction,
            1900,
            successFunction,
            null,
            null,
        );
    };
}

export function boardClose(id) {
    return async (dispatch) => {
        async function successFunction() {
            dispatch(getLinkedBoards(true));
            dispatch(verifyToken());
        }

        async function requestFunction() {
            return API.put(`boards/close/${id}`);
        }

        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            null,
            requestFunction,
            2900,
            successFunction,
            null,
            null,
        );
    };
}

export function closeCurrentBoard() {
    return {
        type: "closeCurrentBoard",
    };
}
