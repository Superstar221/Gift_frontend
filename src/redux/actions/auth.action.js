import validator from "validator";
import tryAndCatchRequestWithErrorHandling from "../../components/errorCode/errorCode";
import API from "../API";
import setAuthError from "./error.action";
import setNotes from "./notification.action";

export function loginChange(key, value) {
    return {
        type: "loginChange",
        key,
        value,
    };
}

export function registerChange(key, value) {
    return {
        type: "registerChange",
        key,
        value,
    };
}

function registerReset() {
    return {
        type: "registerReset",
    };
}

export function setUser(data) {
    return {
        type: "setUser",
        data,
    };
}

export function openTermsModal(data) {
    return { type: "openTermsModal", data };
}

export function setLoad() {
    return { type: "setLoad" };
}

export function set2FASecret(data) {
    return { type: "2FATempSecret", data };
}

export function disable2FAPopUp(data) {
    return { type: "disable2FAPopUp", data };
}

export function setReferrerBypassConfimed(data) {
    return { type: "bypassJoin", data };
}

export function verifyToken(history) {
    return async (dispatch) => {
        async function successFunction(data) {
            const { user } = data;
            dispatch(setUser(user));
            if (history !== null && history !== undefined) {
                dispatch(setNotes({ success: "You are still logged in." }));
                history("/dashboard");
            }
        }

        async function requestFunction() {
            return API.get("user/me");
        }
        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            null,
            requestFunction,
            1600,
            successFunction,
            null,
            null,
        );
    };
}

export function loginFn(data, history) {
    return async (dispatch) => {
        function successFunction(response) {
            if (response.message !== undefined && response.message !== null) {
                if (response.message === "Need Passcode") {
                    dispatch(disable2FAPopUp(false));
                } else if (response.message === "Need Agree") {
                    dispatch(openTermsModal(true));
                }
            } else {
                dispatch(setAuthError(null, "loginErrors"));
                if (response.remember === false) {
                    localStorage.removeItem("token");
                    sessionStorage.token = response.token;
                } else {
                    sessionStorage.removeItem("token");
                    localStorage.token = response.token;
                }
                history("/dashboard");
            }
        }
        async function preRequestFunction() {
            const errors = {};

            // eslint-disable-next-line no-restricted-syntax
            for (const key in data) {
                if (key !== "remember") {
                    if (!data[key]) {
                        errors[key] = `${key} is empty`;
                    }
                }
            }

            if (
                Object.keys(errors).length < 1 ||
                Object.keys(errors) === null
            ) {
                dispatch(setAuthError(null, "loginErrors"));
                const json = JSON.stringify({
                    emailOrUsername: data.loginname,
                    password: data.password,
                });
                return json;
            }
            dispatch(setAuthError(errors, "loginErrors"));
            return false;
        }

        async function requestFunction(json) {
            return API.post("user/login", json);
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

export function testFn(register, registerErrors, item) {
    return (dispatch) => {
        const errors = {};

        function performValidation(inputItem, outputFunction) {
            if (item === inputItem) {
                outputFunction();
            } else if (registerErrors) {
                if (registerErrors[inputItem]) {
                    errors[inputItem] = registerErrors[inputItem];
                }
            }
        }

        function nameValidations() {
            if (validator.isEmpty(register[item])) {
                errors[item] = "First Name is empty";
            } else if (validator.isEmail(register[item])) {
                errors[item] = "Cannot use email as username";
            } else if (!validator.isAlpha(register[item])) {
                errors[item] = "Alpha Characters Only";
            }
        }

        function surnameValidations() {
            if (validator.isEmpty(register[item])) {
                errors[item] = "Surname is empty";
            } else if (validator.isEmail(register[item])) {
                errors[item] = "Cannot use email as username";
            } else if (!validator.isAlpha(register[item])) {
                errors[item] = "Alpha Characters Only";
            }
        }

        function usernameValidations() {
            if (validator.isEmpty(register[item])) {
                errors[item] = "Username is empty";
            } else if (!validator.isLength(register[item], { min: 5 })) {
                errors[item] = "Username needs to be atleast 5 Characters";
            } else if (validator.isEmail(register[item])) {
                errors[item] = "Cannot use Email as username";
            }
        }

        function emailValidations() {
            if (validator.isEmpty(register[item])) {
                errors[item] = "Email is empty";
            } else if (!validator.isEmail(register[item])) {
                errors[item] = "Email is invalid";
            }
        }

        function telValidations() {
            if (validator.isEmpty(register[item])) {
                errors[item] = "Mobile Number is empty";
            }
        }

        function passwordValidations() {
            if (validator.isEmpty(register[item])) {
                errors[item] = "Password is Empty";
            } else if (!validator.isStrongPassword(register[item])) {
                errors[item] =
                    "You need at least complex password with atleast 8 characters";
            }
        }

        function confirmPassValidations() {
            if (register.password && register.confirmPass) {
                if (register.password !== register.confirmPass) {
                    errors.confirmPass = "passwords don't match";
                }
            }
        }

        function agreeValidations() {
            if (register.agree === false) {
                errors.agree = "You need to agree to the terms and conditions";
            }
        }

        function confirmEmailValidations() {
            if (register.email && register.confirmEmail) {
                if (register.email !== register.confirmEmail) {
                    errors[item] = "Emails don't match";
                }
            }
        }

        function emailCustomerSupportValications() {
            if (register.emailCustomerSupport === false) {
                errors.emailCustomerSupport =
                    "You need to agree to be contacted by support";
            }
        }

        performValidation("name", nameValidations);
        performValidation("surname", surnameValidations);
        performValidation("username", usernameValidations);
        performValidation("email", emailValidations);
        performValidation("tel", telValidations);
        performValidation("password", passwordValidations);
        performValidation("confirmPass", confirmPassValidations);
        performValidation("agree", agreeValidations);
        performValidation("confirmEmail", confirmEmailValidations);
        performValidation(
            "emailCustomerSupport",
            emailCustomerSupportValications,
        );
        dispatch(setAuthError(errors, "registerErrors"));
    };
}

export function passwordRecoved(register, registerErrors, item) {
    return (dispatch) => {
        const errors = {};
        function performValidation(inputItem, outputFunction) {
            if (item === inputItem) {
                outputFunction();
            } else if (registerErrors) {
                if (registerErrors[inputItem]) {
                    errors[inputItem] = registerErrors[inputItem];
                }
            }
        }

        function passwordValidations() {
            if (validator.isEmpty(register[item])) {
                errors[item] = "Password is Empty";
            } else if (!validator.isStrongPassword(register[item])) {
                errors[item] = "Password needs to be complex";
            }

            if (register.confirmPass !== "") {
                if (register[item] !== register.confirmPass) {
                    errors.confirmPass = "Passwords don't match";
                } else {
                    delete errors.confirmPass;
                }
            }
        }

        function confirmPassValidations() {
            if (register.password && register[item]) {
                if (register.password !== register[item]) {
                    errors[item] = "Passwords don't match";
                }
            }
        }

        performValidation("password", passwordValidations);
        performValidation("confirmPass", confirmPassValidations);
        dispatch(setAuthError(errors, "registerErrors"));
    };
}

export function loginValidation(register, registerErrors, item) {
    return (dispatch) => {
        const errors = {};
        function performValidation(inputItem, outputFunction) {
            if (item === inputItem) {
                outputFunction();
            } else if (registerErrors) {
                if (registerErrors[inputItem]) {
                    errors[inputItem] = registerErrors[inputItem];
                }
            }
        }

        function passwordValidations() {
            if (validator.isEmpty(register[item])) {
                errors[item] = "Password is Empty";
            }
        }

        function usernameValidations() {
            if (validator.isEmpty(register[item])) {
                errors[item] = "Email or Username is Empty";
            }
        }

        performValidation("password", passwordValidations);
        performValidation("username", usernameValidations);
        dispatch(setAuthError(errors, "loginErrors"));
    };
}

export function personalInfoCheck(data, registerErrors, item) {
    return (dispatch) => {
        const errors = {};
        function performValidation(inputItem, outputFunction) {
            if (item === inputItem) {
                outputFunction();
            } else if (registerErrors) {
                if (registerErrors[inputItem]) {
                    errors[inputItem] = registerErrors[inputItem];
                }
            }
        }

        function nameValidations() {
            if (validator.isEmpty(data[item])) {
                errors[item] = "First Name is empty";
            } else if (validator.isEmail(data[item])) {
                errors[item] = "Cannot use email as username";
            } else if (!validator.isAlpha(data[item])) {
                errors[item] = "Alpha Characters Only";
            }
        }

        function surnameValidations() {
            if (validator.isEmpty(data[item])) {
                errors[item] = "Surname is empty";
            } else if (validator.isEmail(data[item])) {
                errors[item] = "Cannot use email as username";
            } else if (!validator.isAlpha(data[item])) {
                errors[item] = "Alpha Characters Only";
            }
        }

        function usernameValidations() {
            if (validator.isEmpty(data[item])) {
                errors[item] = "Username is empty";
            } else if (!validator.isLength(data[item], { min: 5 })) {
                errors[item] = "Username needs to be atleast 5 Characters";
            } else if (validator.isEmail(data[item])) {
                errors[item] = "Cannot use Email as username";
            }
        }

        function emailValidations() {
            if (validator.isEmpty(data[item])) {
                errors[item] = "Email is empty";
            } else if (!validator.isEmail(data[item])) {
                errors[item] = "Email is invalid";
            }
        }

        function telValidations() {
            if (validator.isEmpty(data[item])) {
                errors[item] = "Mobile Number is empty";
            }
        }

        function confirmEmailValidations() {
            if (data.email && data.confirmEmail) {
                if (data.email !== data.confirmEmail) {
                    errors[item] = "Emails don't match";
                }
            } else if (data.email && !data.confirmEmail) {
                errors[item] = "Confirm Email is Blank";
            }
        }

        function emailCustomerSupportValications() {
            if (data.emailCustomerSupport === false) {
                errors.emailCustomerSupport =
                    "You need to agree to be contacted by support";
            }
        }

        performValidation(
            "emailCustomerSupport",
            emailCustomerSupportValications,
        );

        performValidation("name", nameValidations);
        performValidation("surname", surnameValidations);
        performValidation("username", usernameValidations);
        performValidation("email", emailValidations);
        performValidation("confirmEmail", confirmEmailValidations);
        performValidation("tel", telValidations);
        dispatch(setAuthError(errors, "registerErrors"));
    };
}

export function personalInfoUpdatePassword(register, registerErrors, item) {
    return (dispatch) => {
        const errors = {};
        function performValidation(inputItem, outputFunction) {
            if (item === inputItem) {
                outputFunction();
            } else if (registerErrors) {
                if (registerErrors[inputItem]) {
                    errors[inputItem] = registerErrors[inputItem];
                }
            }
        }

        function oldPasswordValidations() {
            if (validator.isEmpty(register[item])) {
                errors[item] = "Password is Empty";
            }

            if (register.newPassword !== "") {
                if (register.oldPassword === register.newPassword) {
                    errors.oldPassword = "Cannot reuse the same password";
                    if (
                        errors.newPassword === "Cannot reuse the same password"
                    ) {
                        delete errors.newPassword;
                    }
                }
            }
        }

        function passwordValidations() {
            if (validator.isEmpty(register[item])) {
                errors[item] = "Password is Empty";
            } else if (!validator.isStrongPassword(register[item])) {
                errors[item] = "Password needs to be complex";
            }

            if (register.oldPassword !== "") {
                if (register.newPassword === register.oldPassword) {
                    errors.newPassword = "Cannot reuse the same password";
                    if (
                        errors.oldPassword === "Cannot reuse the same password"
                    ) {
                        delete errors.oldPassword;
                    }
                }
            }

            if (register.confirmPass !== "") {
                if (register[item] !== register.confirmPass) {
                    errors.confirmPass = "Passwords don't match";
                } else {
                    delete errors.confirmPass;
                }
            }
        }

        function confirmPassValidations() {
            if (register.password && register[item]) {
                if (register.password !== register[item]) {
                    errors[item] = "Passwords don't match";
                }
            }
        }
        performValidation("oldPassword", oldPasswordValidations);
        performValidation("password", passwordValidations);
        performValidation("confirmPass", confirmPassValidations);
        dispatch(setAuthError(errors, "registerErrors"));
    };
}

export function registerFn(data, history) {
    return async (dispatch) => {
        async function successFunction() {
            // history("/verifyRegister");
            dispatch(registerReset());
        }

        async function preRequestFunction() {
            const localData = data;
            delete localData.confirmPass;
            delete localData.confirmEmail;
            delete localData.oldPassword;

            // eslint-disable-next-line no-restricted-syntax
            for (const key in localData) {
                if (localData[key] === "") {
                    localData[key] = false;
                }
            }
            return localData;
        }

        async function requestFunction(localData) {
            return API.post("user/register", localData);
        }

        await tryAndCatchRequestWithErrorHandling(
            dispatch,
            preRequestFunction,
            requestFunction,
            1800,
            successFunction,
            null,
            null,
        );
    };
}
