/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import {useThemeConfig} from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.scss";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {Helmet} from "react-helmet";

function Footer() {

  const {footer} = useThemeConfig();
  // eslint-disable-next-line no-unused-vars
  const {sponsors = []} = useDocusaurusContext();
  const {copyright,} = footer || {};


  if (!footer) {
    return null;
  }

  const sponsorLogoPath = useBaseUrl("img/sponsors/edouard-montpetit-logo.svg");

  return (
    <footer
      className={`footer ${styles.footer}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.sponsor}>
          <p>This project is supported in part by:</p>
          <div className={styles.sponsors}>
            <a href="https://www.cegepmontpetit.ca/" target={"_blank"} rel="noreferrer">
              <img
                src={sponsorLogoPath}
                alt="Logo cegep Edouard-Montpetit"
              />
            </a>
          </div>
        </div>
        {copyright ? (
          <div
            className={`footer__copyright ${styles.copyright}`} // Dev provided HTML, assume safe.
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: copyright,
            }}
          />
        ) : null}
      </div>

      <Helmet>
        <script id="mcjs" src="/scripts/newsletter-popup.js" type="text/javascript" />
      </Helmet>

    </footer>
  );
}
export default Footer;

