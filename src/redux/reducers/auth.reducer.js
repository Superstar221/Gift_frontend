const data = {
    currentUser: null,
    login: {
        loginname: "",
        password: "",
        remember: false,
    },
    register: {
        name: "",
        email: "",
        confirmEmail: "",
        tel: "",
        username: "",
        surname: "",
        oldPassword: "",
        password: "",
        confirmPass: "",
        referralToken: "",
        agree: "",
        emailBoardActivity: "",
        emailCustomerSupport: "",
        emailMarketing: "",
    },
    backDrop: false,
    serverMessage: null,
    disableButtonB: false,
    loginServerMessage: null,
    loginErrors: null,
    registerErrors: null,
    agreeOpen: false,
    bypassConfirmModalOpen: 0,
    clickJoinPopup: 0,
    create2FADetails: null,
    disable2FA: true,
};

// eslint-disable-next-line default-param-last
export default function loginReducer(state = data, action) {
    const temp = { ...state };
    switch (action.type) {
        case "registerReset":
            temp.register = {
                name: "",
                email: "",
                confirmEmail: "",
                tel: "",
                username: "",
                surname: "",
                oldPassword: "",
                password: "",
                confirmPass: "",
                referralToken: "",
                agree: "",
                emailBoardActivity: "",
                emailCustomerSupport: "",
                emailMarketing: "",
            };
            return temp;
        case "loginChange":
            temp.login[action.key] = action.value;
            return temp;
        case "registerChange":
            temp.register[action.key] = action.value;
            return temp;
        case "setAuthError":
            temp[action.errorType] = action.data;
            return temp;
        case "loginServerMessage":
            temp.loginServerMessage = action.data;
            return temp;
        case "bypassJoin":
            temp.bypassConfirmModalOpen = action.data;
            return temp;
        case "clickJoin":
            temp.clickJoinPopup = action.data;
            return temp;
        case "setLoad":
            temp.backDrop = temp.backDrop !== true;
            return temp;
        case "serverMessage":
            temp.serverMessage = action.data;
            return temp;
        case "disableButton":
            temp.disableButtonB = action.data;
            return temp;
        case "setUser":
            temp.currentUser = action.data;
            return temp;
        case "openTermsModal":
            temp.agreeOpen = action.data;
            return temp;
        case "2FATempSecret":
            temp.create2FADetails = action.data;
            return temp;
        case "disable2FAPopUp":
            temp.disable2FA = action.data;
            return temp;
        default:
            return temp;
    }
}
