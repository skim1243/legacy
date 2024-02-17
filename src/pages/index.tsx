import Head from "next/head";
import Link from "next/link";
import Navbar from "~/components/Navbar";
import Main from "~/components/Main";

export default function Home() {
  return (
    <>
      <Navbar />
      <Main />
    </>
  );
}
