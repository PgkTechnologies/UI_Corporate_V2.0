import React from "react";
import { applyMiddleware, createStore } from "redux";
import ReactDOM from "react-dom/client";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import "react-toastify/dist/ReactToastify.css";
import AllReducers from "./Store/Reducers";
import { webportalAppRootSaga } from "./Store/Sagas";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./utils/Auth";

// Middleware: Redux Saga
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  AllReducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware, thunk))
);
// const store = createStore(AllReducers, applyMiddleware(thunk));

sagaMiddleware.run(webportalAppRootSaga);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={3500}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
            theme="dark"
          />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
  // document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
