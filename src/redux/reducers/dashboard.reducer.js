/* eslint-disable no-case-declarations */

/* eslint-disable no-restricted-syntax */
const data = {
    boards: [],
    currentBoard: null,
    invite: null,
    boardDetails: null,
    tree: null,
    lastSeen: [],
    notifications: [],
    openDrawer: false,
};

// eslint-disable-next-line default-param-last
export default function dashboardReducer(state = data, action) {
    const temp = { ...state };
    switch (action.type) {
        case "setOpenDrawer":
            temp.openDrawer = action.data;
            return temp;
        case "setLastSeen":
            const tempArray1 = [...temp.lastSeen];
            if (tempArray1 !== null && tempArray1 !== undefined) {
                let found = false;
                for (let i = 0; i < tempArray1.length; i += 1) {
                    if (tempArray1[i].level === action.data.level) {
                        tempArray1[i].lastMessageCount =
                            action.data.lastMessageCount;
                        found = true;
                        break;
                    }
                }
                if (found === false) {
                    tempArray1.push(action.data);
                }
            } else {
                tempArray1.push(action.data);
            }
            temp.lastSeen = tempArray1;
            return temp;
        case "setBoards":
            temp.boards = action.data;
            return temp;
        case "setNotifications":
            const tempArray = [...temp.notifications];
            if (
                tempArray !== null &&
                tempArray !== undefined &&
                tempArray.length > 0
            ) {
                let found = false;
                for (let i = 0; i < tempArray.length; i += 1) {
                    if (tempArray[i].level === action.data.level) {
                        tempArray[i].notifications = action.data.notifications;
                        if (
                            action.data.lastMessageCount !== null &&
                            action.data.lastMessageCount !== undefined
                        ) {
                            tempArray[i].lastMessageCount =
                                action.data.lastMessageCount;
                        }
                        found = true;
                        break;
                    }
                }
                if (found === false) {
                    tempArray.push(action.data);
                }
            } else {
                tempArray.push(action.data);
            }
            temp.notifications = tempArray;
            return temp;
        case "setCurrentBoard":
            temp.currentBoard = action.data;
            return temp;
        case "setReferalLink":
            temp.invite = action.link;
            return temp;
        case "boardDetails":
            const details = {};
            const freshman = [];
            const sophmore = [];
            const junior = [];
            for (const key in action.item) {
                if (key.includes("Freshman")) {
                    freshman.push(action.item[key]);
                } else if (key.includes("Sophmore")) {
                    sophmore.push(action.item[key]);
                } else if (key.includes("junior")) {
                    junior.push(action.item[key]);
                } else if (key.includes("senior")) {
                    details.senior = action.item[key];
                } else if (key.includes("createdAt")) {
                    details.createdAt = action.item[key];
                } else if (key.includes("_id")) {
                    details.boardId = action.item[key];
                } else if (key.includes("leftClosed")) {
                    details.leftClosed = action.item[key];
                } else if (key.includes("rightClosed")) {
                    details.rightClosed = action.item[key];
                }
            }

            details.freshman = freshman;
            details.junior = junior;
            details.sophmore = sophmore;
            if (Number(action.item.treevalue) === 100) {
                details.treevalue = "bronze";
            } else if (Number(action.item.treevalue) === 400) {
                details.treevalue = "silver";
            } else if (Number(action.item.treevalue) === 1600) {
                details.treevalue = "gold";
            } else if (Number(action.item.treevalue) === 5000) {
                details.treevalue = "platinum";
            }

            temp.boardDetails = details;
            return temp;
        case "closeCurrentBoard":
            temp.boardDetails = null;
            return temp;
        case "setTree":
            temp.tree = action.data;
            return temp;
        default:
            return temp;
    }
}
