import React from "react";
import Layout from "@theme/Layout";

function API() {
  return (

    <Layout title="API">
      <div>

        <iframe id="frame"
          title="Alternative API Docs Frame"
          width="100%"
          height="100vh"
          src="https://djipco.github.io/webmidi/api/v3/">
        </iframe>

      </div>
    </Layout>

  );
}

export default API;
