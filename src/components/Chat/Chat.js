/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

window.__lc = window.__lc || {};
window.__lc.license = 13437153;

export default function Chat() {
    const currentUser = useSelector((state) => state.auth.currentUser);
    function queueChatApiCall(...args) {
        return liveChat.current._h
            ? liveChat.current._h.apply(null, args)
            : liveChat.current._q.push(args);
    }
    const liveChat = useRef({
        _q: [],
        _h: null,
        _v: "2.0",
        on: (...args) => {
            queueChatApiCall("on", [...args]);
        },
        once: (...args) => {
            queueChatApiCall("once", [...args]);
        },
        off: (...args) => {
            queueChatApiCall("off", [...args]);
        },
        get: (...args) => {
            if (!liveChat.current._h)
                throw new Error(
                    "[LiveChatWidget] You can't use getters before load.",
                );
            return queueChatApiCall("get", [...args]);
        },
        call: (...args) => {
            queueChatApiCall("call", [...args]);
        },
    });

    if (!window.LiveChatWidget) {
        window.LiveChatWidget = liveChat.current;
    }

    useEffect(() => {
        if (currentUser) {
            liveChat.current.call("set_customer_name", currentUser.name);
            liveChat.current.call("set_customer_email", currentUser.email);
        }
    }, [currentUser]);

    useEffect(() => {
        try {
            const script = document.createElement("script");

            script.src = "https://cdn.livechatinc.com/tracking.js";
            script.async = true;
            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
            };
        } catch (err) {
            return () => {};
        }
    }, []);

    return null;
}
