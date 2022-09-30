import tryAndCatchRequestWithErrorHandling from "../../components/errorCode/errorCode";
import API from "../API";

export default function sendVerificationEmail() {
    async function requestFunction() {
        return API.get("user/verifyEmailCreate");
    }

    return async (dispatch) => {
        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            null,
            requestFunction,
            1400,
            null,
            null,
            null,
        );
    };
}
