const data = {
    notification: null,
};

// eslint-disable-next-line default-param-last
export default function notificationsReducer(state = data, action) {
    const temp = { ...state };
    switch (action.type) {
        case "setNotes":
            temp.notification = action.data;
            setTimeout(() => {
                temp.notification = null;
                return temp;
            });
            return temp;
        default:
            return temp;
    }
}
