/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useThemeConfig} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import styles from './styles.module.scss';
import ThemedImage from '@theme/ThemedImage';
import IconExternalLink from '@theme/IconExternalLink';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

function FooterLink({to, href, label, prependBaseUrlToHref, ...props}) {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {
    forcePrependBaseUrl: true,
  });
  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}>
      {href && !isInternalUrl(href) ? (
        <span>
          {label}
          <IconExternalLink />
        </span>
      ) : (
        label
      )}
    </Link>
  );
}

const FooterLogo = ({sources, alt, width, height}) => (
  <ThemedImage
    className="footer__logo"
    alt={alt}
    sources={sources}
    width={width}
    height={height}
  />
);

function Footer() {

  const {siteConfig} = useDocusaurusContext();
  const {footer} = useThemeConfig();
  const {copyright, links = [], logo = {}} = footer || {};

  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };

  if (!footer) {
    return null;
  }

  const sponsorLogoPath = useBaseUrl("img/sponsors/edouard-montpetit-logo.svg");

  return (
    <footer
      className={`footer ${styles.footer}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.sponsor}>
          <p>This video was produced with
            financial support from:
          </p>
          <div className={styles.sponsors}>
            <img
              src={sponsorLogoPath}
              alt="Cégep Édouard-Montpetit"
            />
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
    </footer>
  );
}
export default Footer;

