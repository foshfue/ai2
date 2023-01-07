import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import HomepageHero from "../components/Hero";
import Metrics from "../components/metrics";
import Layout from "../components/Layout";
import { CallToAction } from "../components/CallToAction";
import HourCalculator from "../components/HourCalculator";
import { Pricing } from "../components/Pricing";
import { Faqs } from "../components/Faqs";
import { PrimaryFeatures } from "../components/PrimaryFeatures";
import { Testimonials } from "../components/Testimonials";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Sumari - Youtube videos summarized by AI</title>
        <meta name="description" content="Sumari is an AI summarization assistant that empowers you to learn from YouTube videos 10x faster, so you can stay up-to-date and save time.
No more Watch Later lists, no more wasted time." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" w-full flex flex-col items-center  ">
        <HomepageHero />
        <Metrics />
        <HourCalculator />
        <Testimonials />
        <Pricing />
        <Faqs />
        <CallToAction />
      </div>
    </>
  );
};


export default Home;
// @ts-expect-error:next-line
Home.Layout = Layout;

{/* <AuthShowcase /> */ }
const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">

      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
