import React from "react";
import "antd/dist/antd.less";

import "../styles/globals.css";
import "../styles/globals.less";
import "../styles/Home.module.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
