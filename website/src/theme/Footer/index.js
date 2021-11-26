/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.scss';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

function Footer() {

  const {footer} = useThemeConfig();
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
            <a href="https://www.cegepmontpetit.ca/" target={"_blank"}>
              <img
                src={sponsorLogoPath}
                alt="Logo cegep Edouard-Montpetit"
              />
            </a>
          </div>
        </div>
        {copyright ? (
          <div
            className={`footer__copyright ${styles.copyright}`} // Developer provided the HTML, so assume it's safe.
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: copyright,
            }}
          />
        ) : null}
      </div>

      <script id="mcjs">!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/4ad018201643381a89d30000c/0e8ce2085fb209fed1b656a74.js");</script>

    </footer>
  );
}
export default Footer;

