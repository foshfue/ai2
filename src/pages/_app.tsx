import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode, FC } from "react";
import { trpc } from "../utils/trpc";

import "../styles/globals.css";

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Head from "../components/Head";


const queryClient = new QueryClient()
interface INoop {
  children: ReactNode;
}
const Noop: FC<INoop> = ({ children }) => <>{children}</>;
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {


  const Layout = (Component as any).Layout || Noop;
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Head />
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>

      </SessionProvider>
    </QueryClientProvider>
  );
};

export default trpc.withTRPC(MyApp);
