// Error Code: 0      - 000999: System Reserved
// Error Code: 001000 - 001099: /verifyEmailToken [GET]
// Error Code: 001100 - 001199: /verifyResetToken [GET]
// Error Code: 001200 - 001299: /verifyInviterToken [GET]
// Error Code: 001300 - 001399: /generateInviterToken [GET]
// Error Code: 001400 - 001499: /verifyEmailCreate [GET]
// Error Code: 001500 - 001599: /generate2FAKey [GET]
// Error Code: 001600 - 001699: /me [GET]
// Error Code: 001700 - 001799: /resetPassword [POST]
// Error Code: 001800 - 001899: /register [POST]
// Error Code: 001900 - 001999: /login [POST]
// Error Code: 002000 - 002099: /recoverPassword [POST]
// Error Code: 002100 - 002199: /generateQRCode [POST]
// Error Code: 002200 - 002299: /verifyPassCode [POST]
// Error Code: 002300 - 002399: /saveQRCodeSecret [POST]
// Error Code: 002400 - 002499: /changePassword [POST]
// Error Code: 002500 - 002599: /me [POST]
// Error Code: 002600 - 002699: /join [POST]
// Error Code: 002700 - 002799: /remove/:boardId/:userId [POST]
// Error Code: 002800 - 002899: /confirm/:boardId/:userId [POST]
// Error Code: 002900 - 002999: /close/:id [POST]
// Error Code: 003000 - 003099: /active [POST]
// Error Code: 003100 - 003199: /view/:id [POST]
// Error Code: 003200 - 003299: /quit [POST]
// Error Code: 003300 - 003399: /reactivate [POST]
// Error Code: 003400 - 003499: /quit [POST]
// Error Code: 003500 - 003599: /reactivate [POST]

const { setLoad } = require("../../redux/actions/auth.action");
const {
    default: disableButton,
} = require("../../redux/actions/disableButton.action");
const {
    default: setNotes,
} = require("../../redux/actions/notification.action");

const errorCodes = {
    "000889": "Error sending email to user.",
    "000990": "System Error when sending confirm email.",
    "000991": "System Error when sending confirm email",
    "000992": "System Error when sending password reset email.",
    "000993": "User has disabled customer support emails.",
    "000994": "System Error when sending email verification email.",
    "000995": "System Error when sending email verification email.",
    "000996": "System Error when sending email.",
    "000997": "Your email is unverified, we will not send emails to it",
    "000998": "System Error when sending password change request email.",
    "000999": "User has disabled customer support emails.",
    "001000": "Email was successfully verified.",
    "001001":
        "System was unable to verify your email verification token at this time.",
    "001002": "Unable to find your user profile to verify.",
    "001003": "Email is already Verified.",
    "001004": "Email verification Token is expired.",
    "001005": "Email verification Token is expired.",
    "001100": "Password reset token is valid",
    "001101": "System was unable to verify the password reset token.",
    "001102": "Password reset token is invalid.",
    "001103": "Password reset token is expired.",
    "001104": "Password reset token is expired.",
    "001200": "Inviter token is still valid.",
    "001201": "System was unable to validate your inviter token at this time.",
    "001202": "Invalid inviter token.",
    "001203": "Inviter token is expired.",
    "001204": "Inviter token is expired.",
    "001205": "System was unable to validate your inviter token at this time.",
    "001300": "Inviter link successfully created.",
    "001301": "System was unable to create your inviter link at this time.",
    "001302": "There seems to be a problem with your profile.",
    "001303":
        "You are not confirmed on your first board. You will not be able to create an inviter link.",
    "001304": "The system was unable to create a referral link for you.",
    "001400": "Verify email was successfully sent.",
    "001401":
        "System was unable to create your verification email at this time.",
    "001402": "There seems to be a problem with your profile.",
    "001403": "Your email is already verified.",
    "001404":
        "We have already sent you a verification email and it is still valid.",
    "001500": "2FA Code generated successfully.",
    "001501": "System was unable to create your 2FA code at this time.",
    "001502": "There was an unknown backend error. Please try again",
    "001600": "", // User successfully retrieved.
    "001601": "System was unable to retrieve your user at this time.",
    "001602": "There is a problem with your profile.",
    "001700": "Password reset successfully",
    "001701": "System was unable to reset your password at this time.",
    "001702": "There seems to be a problem with your profile.",
    "001703": "Your password reset token is expired.",
    "001704":
        "Your email is unverified. You will not be able to reset your password.",
    "001800": "User was successfully registered.",
    "001801": "System was unable to register you at this time.",
    "001802": "The token you provided is invalid.",
    "001803": "The token you provided is expired.",
    "001804": "The token you provided is expired.",
    "001805": "The system was unable to create your user for you.",
    "001806": "We were unable to find your inviters' profile.",
    "001807":
        "The system was unable to link your profile to your inviters' profile.",
    "001900": "Login was successful",
    "001901": "System was unable to log you in at this time.",
    "001902": "Invalid Credentials.",
    "001903": "Invalid Credentials.",
    "001904": "Invalid Credentials.",
    "001905": "Invalid Credentials.",
    "001906": "You need to verify your email before you login.",
    "001907": "Your profile is disabled as you did not gift in time.",
    "002000": "Password reset email was sent to your registered email address.",
    "002001": "The system was unable to send a password reset at this time.",
    "002002": "There is no profile associated with this email.",
    "002003":
        "We recently emailed you a password reset token and it is still valid.",
    "002004": "Your email is not verified.",
    "002100": "QR Code Generated Successfully",
    "002101": "System was unable to generate your QR Code at this time.",
    "002200": "2FA passcode accepted.",
    "002201": "Entered 2FA passcode was incorrect.",
    "002300": "2FA successfully activated.",
    "002301": "System was unable to activate your 2FA at this time.",
    "002400": "Password successfully updated.",
    "002401": "System was unable to log you in at this time.",
    "002402": "Your old password cannot equal your new password.",
    "002403": "There is a problem with your profile.",
    "002404": "Your email is not verified.",
    "002405": "The entered, current password is incorrect.",
    "002500": "Personal Info has been updated successfully.",
    "002501": "System was unable to update your user info at this time.",
    "002502": "There is a problem with your profile.",
    "002503": "You have already been verified. You cannot change your details.",
    "002504":
        "You are currently waiting to be verified on a board. You cannot change your details.",
    "002600": "Board Joined successfully.",
    "002601":
        "System was unable to join a board at this time. Please refresh your browser and try again.",
    "002602": "You cannot join a board of the selected Gifting level.",
    "002603": "There is a problem with your profile.",
    "002604":
        "You have recently tried to join a board. Please wait 1 hour between joins.",
    "002605":
        "You have been flagged as leaving too many boards. This is against our community guidelines. You will need to wait to re-join",
    "002606":
        "You have been flagged as leaving too many boards. This is against our community guidelines. You will need to wait to re-join.",
    "002607": "Your level is too low to join the board.",
    "002608":
        "You need to invite two gifters and they need to gift before you can proceed.",
    "002609": "You are already on a board on this level.",
    "002610":
        "In order to join this board, please first join and gift on all prior boards.",
    "002611":
        "You have recently tried to join a board. Please wait 1 hour between joins.",
    "002612":
        "You have recently tried to join a board. Please wait 1 hour between joins.",
    "002613":
        "There are no available boards to join. Please wait and try again later.",
    "002614":
        "You have already progressed passed your Bronze board. You will not be able to join another one.",
    "002615":
        "You need to be confirmed on your higher level board, before you can join the level below it.",
    "002700": "Removed from board successfully.",
    "002701": "System was unable to remove you from a board at this time.",
    "002702":
        "The board you are trying to access is either already closed or does not exist",
    "002703": "You cannot affect a board you are not on.",
    "002704": "The user you tried to remove is not on the board.",
    "002705": "You cannot remove an already confirmed user.",
    "002706": "System was unable to remove the requested Gifter at this time.",
    "002707": "System was unable to remove the requested Gifter at this time.",
    "002708": "You cannot remove yourself or other users from this board.",
    "002709": "Only the Legend can remove Gifters from the board.",
    "002800": "Confirmed Gifter on board successfully.",
    "002801": "System was unable to confirm the Gifter at this time.",
    "002802":
        "The board you are trying to confirm someone on is either already closed or does not exist",
    "002803": "Unable to find you on the board.",
    "002804": "You are not the legend on the board.",
    "002805": "Cannot find the selected Gifter on the board.",
    "002900": "Board Closed Successfully.",
    "002901": "System was unable to close the board at this time.",
    "002902": "Could not find you on the board.",
    "002903": "The Board is not eligible to be closed.",
    "002904": "Only the legend can close the board.",
    "002905": "The board is not full enough to close.",
    "002906": "The number of users on the board doesn't match the count.",
    "002907":
        "The number of users on the board doesn't equal the minimum amount to be closed.",
    "002908":
        "There are not enough confirmed Gifters to close either side of the board.",
    "002909": "Could not find the actual board while trying to close.",
    "002910": "Could not update the legend.",
    "003000": "", // Active Boards Retrieved.
    "003001": "System was unable to retrieve your active boards at this time.",
    "003100": "", // Board Retrieved.
    "003101": "System was unable to retrieve your selected board at this time.",
    "003102": "Selected Board was not found.",
    "003200": "", // Notifications Retrieved.
    "003201": "System was unable to retrieve your Notifications at this time.",
    "003300": "", // Last Messages Seen Updated.
    "003301":
        "System was unable to update your last messages seen at this time.",
    "003400": "", // Quit GL profile.
    "003401": "System was unable to quit at this time.",
    "003402": "System was unable to quit at this time due to missing user.",
    "003403":
        "System was unable to quit at this time due to user already having quit.",
    "003404":
        "System was unable to quite at this time due to being unable to delete all profile info.",
    "003500": "", // Reactivate GL profile.
    "003501": "System was unable to reactivate profile.",
    "003502":
        "System was unable to reactivate profile as the legend could not be verified.",
    "003503":
        "System was unable to reactivate profile as the perpetual users are missing.",
    "003504":
        "System was unable to reactivate profile as you are not the Legend.",
    "003505":
        "System was unable to reactivate profile as the user has already been deleted.",
    "003506":
        "System was unable to reactivate profile as the user is not schedualed for deletion.",
};

function parseCode(base, position) {
    let code = null;
    if (position < 100) {
        code = Number.parseInt(base + position, 10)
            .toString()
            .padStart(6, 0);
    } else {
        code = Number.parseInt(position, 10);
    }
    const errorCode = errorCodes[code];
    let response = "";
    if (position === 0) {
        response = errorCode;
    } else {
        response = `${errorCode} Error Code: ${code}`;
    }
    return response;
}

async function handleResponseAndErrorCodes(
    response,
    base,
    successFunction,
    errorFunction,
) {
    if (response.status === 200) {
        const { success } = response.data;

        if (success === true) {
            if (successFunction !== null) {
                await successFunction(response.data);
            }
            const errorString = parseCode(base, 0);
            if (errorString !== "") {
                return { success: errorString };
            }
            return null;
        }
        const { duplicate } = response.data;
        if (duplicate === "email" || duplicate === "username") {
            return { warning: `Entered ${duplicate} is already used` };
        }
        const { clientErrorCode } = response.data;
        if (clientErrorCode !== undefined && clientErrorCode !== null) {
            const retter = parseCode(base, clientErrorCode);
            if (errorFunction !== null) {
                await errorFunction(response.data);
            }
            return { warning: retter };
        }
    }
    return { error: parseCode(base, 1) };
}

async function tryAndCatchRequestWithErrorHandling(
    dispatch,
    preRequest,
    request,
    base,
    successFunction,
    errorFunction,
    catchFunction,
) {
    try {
        dispatch(setLoad());
        dispatch(disableButton(true));
        console.log("registerFnactiontry");

        let payload = null;
        if (preRequest !== null) {
            payload = await preRequest();
            if (payload === false) {
                // dispatch(setNotes({ error: parseCode(base, 1) }));
                return null;
            }
        }
        const result = await request(payload);
        const notes = await handleResponseAndErrorCodes(
            result,
            base,
            successFunction,
            errorFunction,
        );

        dispatch(setNotes(notes));
    } catch (error) {
        if (catchFunction !== null) {
            await catchFunction();
        }
        // dispatch(
        //     setNotes({ error: "The system failed to handle the request" }),
        // );
    } finally {
        console.log("registerFnactionFinall");

        dispatch(disableButton(false));
        dispatch(setLoad());
    }
    return null;
}

export default tryAndCatchRequestWithErrorHandling;
