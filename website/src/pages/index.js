import React from "react";
//import clsx from "clsx";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from '@docusaurus/useBaseUrl';
import Button from "../components/Button";
import Column from "../components/Column";
import InformationBar from "../components/InformationBar";

function HomepageHero() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <section className="hero">
      <div className="container">
        <Column
          type="col-2"
        >
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
          <img
            className="img"
            src={useBaseUrl("/img/front-page/animation-placeholder.jpg")}
            alt="placeholer-animation"
          />
        </Column>
      </div>
    </section>
  );
}

function Presentation() {
  return (
    <section className={"presentation"}>
      <div className="container">
        <h2>Whats is Webmidi.js</h2>
        <Column
          type="col-2"
        >
          <p>
            The <strong>Web MIDI API</strong> is a really exciting
            addition to the web platform that allows web developers to
            interact with <strong>MIDI musical instruments</strong> and devices.
          </p>

          <div className="media">
            <img src="../../static/img/front-page/presentation-illustration-keyboard-dark.png" alt=""/>
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
          <strong>Version 3.0 is coming soon</strong>. <a href="">Subscribe to our newsletter</a> to know when it will be available
        </InformationBar>
        <Presentation />
      </main>
    </Layout>
  );
}
