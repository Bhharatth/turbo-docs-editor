import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { ToastProvider } from 'react-toast-notifications';

import { api } from "@/utils/api";

import "@/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ToastProvider>
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
    </ToastProvider>
  );
};

export default api.withTRPC(MyApp);
