import { type AppType } from "next/app";
import { api } from "compas/utils/api";
import "compas/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
