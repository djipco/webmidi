import React from "react";
//import clsx from "clsx";
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Button from "../components/Button";
import Column from "../components/Column";
import InformationBar from "../components/InformationBar";

/*
const textContent = {
  presentation: `
The <strong>Web MIDI API</strong> is a really exciting
addition to the web platform that allows web developers to
interact with <strong>MIDI musical instruments</strong> and devices.
  `,

}
*/


function HomepageHero() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <section className="hero">
      <div className="container">

        <div className="texts">
          <h1>{siteConfig.title}</h1>
          <span>{siteConfig.tagline}</span>
          <div className="cta">
            <Button
              type="button-bg-full"
              href="./docs/getting-started"
              target="_self"
            >Get started - 5 minutes!
            </Button>
            <Button
              type="button-bg-empty"
              href="./docs"
              target="_self"
            >DOCS
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
        <h2>Whats is {siteConfig.title}</h2>
        <Column
          type="col-2"
        >
          <p>
            The <strong>Web MIDI API</strong> is a really exciting
            addition to the web platform that allows web developers to
            interact with <strong>MIDI musical instruments</strong> and devices.
          </p>

          <div className="media">
            <img
              src={useBaseUrl('img/front-page/presentation-illustration-keyboard-dark.png')}
              alt="A keyboard illustration"
            />
          </div>
        </Column>
      </div>
        <div className="illustration">
          <div className="container">
            <img
              src={useBaseUrl('img/front-page/webmidi-demonstration.svg')}
              alt="Demonstration of the WEBMIDI.js library"/>
          </div>
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
