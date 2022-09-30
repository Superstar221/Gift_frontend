const data = {
    name: null,
    surname: null,
    username: null,
    email: null,
    tel: null,
};

// eslint-disable-next-line default-param-last
export default function infoReducer(state = data, action) {
    const temp = { ...state };

    switch (action) {
        case "infoOnChangeFn":
            temp[action.key] = action.value;
            return temp;
        case "setValues":
            temp.email = action.email;
            temp.name = action.name;
            temp.surname = action.surname;
            temp.username = action.username;
            temp.tel = action.tel;
            return temp;
        default:
            return temp;
    }
}
