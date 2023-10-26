import "../styles/globals.scss";
import { GlobalTheme, Theme } from "@carbon/react";

import { AuthUserProvider } from "../context/AuthUserContext";

function MyApp({ Component, pageProps }) {
  return (
    <Theme theme="g90">
      <AuthUserProvider>
        <Component {...pageProps} />
      </AuthUserProvider>
    </Theme>
  );
}

export default MyApp;
