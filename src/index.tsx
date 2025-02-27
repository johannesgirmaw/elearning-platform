import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./slicers/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConfigProvider } from "antd";

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://c9b49749b100fea4ac67e4b40482746d@o4506862760361984.ingest.us.sentry.io/4506862838677504",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: [/* /localhost/ ,*/ /^https:\/\/tutorhub\.nisirtech\.com/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});



const GOOGLE_CLINET_ID =
  "603952564380-7dmlo23ue6onvhtn4od2mt4lrho67ftv.apps.googleusercontent.com";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={GOOGLE_CLINET_ID}>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: "#FF735C",
            },
          }}
        >
          <App />
        </ConfigProvider>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
