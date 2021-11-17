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
              href="./docs/getting-started"
              target="_self"
            >Get started - 5 minutes!
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
            The <strong>Web MIDI API</strong> is a really exciting addition to the web platform
            allowing a web page to interact with <strong>MIDI musical instruments</strong>.
            However, while great, most developers will find the API to be
            too <em>low-level</em> for their needs. Having to perform binary arithmetic
            or needing to read the 300-page MIDI spec is no fun (trust us on this!).
            The goal behind <strong>WEBMIDI.js</strong> is to get you started with your web-based MIDI
            project as efficiently as possible.
          </p>

          <div className="media">
            <img
              src={useBaseUrl('img/front-page/webmidi-demonstration.svg')}
              alt="Demonstration of the WEBMIDI.js library"
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
          <strong>Version 3.0 is coming soon.</strong> <br/>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://mailchi.mp/eeffe50651bd/webmidijs-newsletter">Subscribe to the newsletter
          </a> <br/>
          to be notified of its availability.
        </InformationBar>
        <Presentation />
      </main>
    </Layout>
  );
}
