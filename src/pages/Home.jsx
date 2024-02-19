import React from "react";
import { useContext } from "react";
import { AppState } from "../App";
import Layout from "../component/Layout/Layout";

function Home() {
  const { user } = useContext(AppState);
  return (
    <Layout>
      <h1>Home</h1>
      <br />
      <br />
      <h2>Welcome:{user.username}</h2>
    </Layout>
  );
}

export default Home;
