import React from "react";
//import clsx from "clsx";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
//import styles from "./index.module.scss";
//import HomepageFeatures from "../components/HomepageFeatures";
import Button from "../components/Button";
import Column from "../components/Column";



/*
function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <Column>
          <div className={styles.buttons}>
            <Button
              type="button-bg-full"
              href="#"
              target="_self"
            >Explorer
            </Button>
            <Button
              type="button-bg-empty"
              href="#"
              target="_self"
            >Explorer
            </Button>
          </div>
        </Column>
      </div>


    </header>
  );
}
*/

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
                componentClass={"akdonaww"}
                type="button-bg-full"
                href="#"
                target="_self"
              >Get startted - 5 minutes!
              </Button>
              <Button
                componentClass={"akdonaww"}
                type="button-bg-empty"
                href="#"
                target="_self"
              >DOCS
              </Button>
            </div>
          </div>
          <img
            className="img"
            src="../../static/img/front-page/animation-placeholder.jpg"
            alt="placeholer-animaion"
          />
        </Column>
      </div>
    </section>
  );
}

function News({children,}) {
  return (
    <section className={"news"}>
      <div className="container">
        <p>
          {children}
        </p>
      </div>
    </section>
  );
}

function Presentation({children,}) {
  return (
    <section className={"presentation"}>
      <div className="container">
        <h2>Whats is Webmidi.js</h2>
        <Column
          type="col-2"
        >
          <p>
            The <span className="bold">Web MIDI API</span> is a really exciting
            addition to the web platform that allows web developers to
            interact with <span className="bold">MIDI</span> musical instruments
            and devices.
          </p>

          <div className="media"></div>
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
        {/* eslint-disable-next-line max-len */}
        <News>Version 3.0 is coming soon . Subscribe to our newsletter to know when it will be available</News>
        <Presentation />
      </main>
    </Layout>
  );
}
