import React from "react";
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Button from "../components/Button";
import Column from "../components/Column";
import InformationBar from "../components/InformationBar";

function HomepageHero() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <section className="hero">
      <div className="container">

        <div className="texts">
          <div className="logo">

          </div>
          <span>{siteConfig.tagline}</span>
          <div className="cta">
            <Button
              type="button-bg-full"
              href="./docs/"
              target="_self"
            >Get started in 5 minutes!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Presentation() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <section className={"presentation"}>
      <div className="container">
        <h2>What is {siteConfig.title}?</h2>
        <Column
          type="col-2"
        >
          <p>
            The existing <strong>Web MIDI API</strong> is a really exciting addition to the web platform
            allowing a web page to interact with <strong>MIDI musical instruments</strong>.
            However, while great, most developers will find the original API to be
            too <em>low-level</em> for their needs. Having to perform binary arithmetic
            or needing to read the 300-page MIDI spec is no fun (trust us on this!).
            The goal behind <strong>WEBMIDI.js</strong> is to get you started with your web-based
            MIDI project as efficiently as possible.
          </p>

          <div className="media">
            <div
              className="imgMedia"
              src=""
              alt=""
            />
          </div>
        </Column>

      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="A JavaScript library to kickstart your MIDI projects on the web and in Node.js.">
      <HomepageHero />
      <main>
        <InformationBar>
          <strong>Version 3.0 has been released!</strong> <br/>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://mailchi.mp/eeffe50651bd/webmidijs-newsletter">Subscribe to the newsletter
          </a> <br/>
          to learn about all the new features.
        </InformationBar>
        <Presentation />
      </main>
    </Layout>
  );
}
