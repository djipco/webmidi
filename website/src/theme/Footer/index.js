/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import clsx from "clsx";
import {useThemeConfig} from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.scss";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

function Footer() {

  const {footer} = useThemeConfig();
  // eslint-disable-next-line no-unused-vars
  const {sponsors = []} = useDocusaurusContext();
  const {copyright, style} = footer || {};

  const sponsorLogoPath = useBaseUrl("img/sponsors/edouard-montpetit-logo.svg");

  if (!footer) {
    return null;
  }

  return (
    <footer
      className={clsx("footer", styles.footer, {"footer--dark": style === "dark"})}>
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

    </footer>
  );
}
export default Footer;

