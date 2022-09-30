const data = {
    chat: null,
    text: "",
};

// eslint-disable-next-line default-param-last
export default function chatReducer(state = data, action) {
    const temp = { ...state };
    switch (action.type) {
        case "setChat":
            temp.chat = action.data;
            return temp;
        case "chatChangeFn":
            temp.text = action.data;
            return temp;
        case "pushMessage":
            temp.chat.push(action.data);
            return temp;
        case "emptyInput":
            temp.text = "";
            return temp;
        default:
            return temp;
    }
}
