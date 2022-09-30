import { createTheme, ThemeProvider, Zoom } from "@mui/material";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import Notifications from "./components/Notifications/Notifications";
import PreLoader from "./components/Preloader/Preloader";
import "./index.css";
import root from "./redux/reducers/root";
import reportWebVitals from "./reportWebVitals";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(root, composeEnhancers(applyMiddleware(thunk)));

const theme = createTheme({
    backdrop: {
        color: "#fff",
        zIndex: 99999999,
    },
});
const RDOM = ReactDOM.createRoot(document.getElementById("root"));
RDOM.render(
    <ThemeProvider theme={theme}>
        <SnackbarProvider
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            TransitionComponent={Zoom}
            maxSnack={2}
        >
            <Provider store={store}>
                <PreLoader />
                <Notifications />
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </SnackbarProvider>
    </ThemeProvider>
);

reportWebVitals();
