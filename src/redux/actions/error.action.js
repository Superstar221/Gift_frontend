export default function setAuthError(data, errorType) {
    return {
        type: "setAuthError",
        errorType,
        data,
    };
}
