import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { ToastProvider } from 'react-toast-notifications';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { api } from "@/utils/api";

import "@/styles/globals.css";
import Navbar from "@gdocs/ui/components/Navbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <RecoilRoot>
    <ToastProvider>
    <SessionProvider session={session}>
      <Navbar/>
      <Component {...pageProps} />
    </SessionProvider>
    </ToastProvider>
    </RecoilRoot>
  );
};

export default api.withTRPC(MyApp);
