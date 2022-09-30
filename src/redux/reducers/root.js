import { combineReducers } from "redux";
import auth from "./auth.reducer";
import dashboard from "./dashboard.reducer";
import notes from "./notifications.reducer";
import chat from "./chat.reducer";
import info from "./info.reducer";

const root = combineReducers({
    auth,
    dashboard,
    notes,
    chat,
    info,
});

export default root;
