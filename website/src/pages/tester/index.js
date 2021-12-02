import React from "react";
import Layout from "@theme/Layout";
import {Helmet} from "react-helmet";



// import useBaseUrl from "@docusaurus/useBaseUrl";
// import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

// const piano = new Nexus.Piano("#target",{
//   size: [500,125],
//   mode: "button",  // "button", "toggle", or "impulse"
//   lowNote: 24,
//   highNote: 60
// })

function Tester() {
  return (
    <Layout title="Tester">

      <Helmet>
        {/*<div id={}></div>*/}
      </Helmet>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          fontSize: "20px",
        }}>
        <p>
          Edit <code>pages/helloReact.js</code> and save to reload.
        </p>
      </div>

    </Layout>
  );
}

export default Tester;
