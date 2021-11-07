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

  return (
    <footer
      className={`footer ${styles.footer}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.top}>
          <div className={styles.left}>
            {(logo || copyright) && (
              <div className="footer__bottom">
                {logo && (logo.src || logo.srcDark) && (
                  <div className="margin-bottom--sm">
                    {logo.href ? (
                      <Link href={logo.href} className={styles.footerLogoLink}>
                        <FooterLogo
                          alt={logo.alt}
                          sources={sources}
                          width={logo.width}
                          height={logo.height}
                        />
                      </Link>
                    ) : (
                      <FooterLogo alt={logo.alt} sources={sources} />
                    )}
                  </div>
                )}
                <p><strong>{siteConfig.tagline}</strong></p>
              </div>
            )}
          </div>
          <div className={styles.right}>
            <div className="row footer__links">
              {links.map((linkItem, i) => (
                <div key={i} className={`col ${styles.col}`}>
                  {linkItem.title != null ? (
                    <div className="footer__title">{linkItem.title}</div>
                  ) : null}
                  {linkItem.items != null &&
                  Array.isArray(linkItem.items) &&
                  linkItem.items.length > 0 ? (
                    <ul className="footer__items">
                      {linkItem.items.map((item, key) =>
                        item.html ? (
                          <li
                            key={key}
                            className="footer__item" // Developer provided the HTML, so assume it's safe.
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                              __html: item.html,
                            }}
                          />
                        ) : (
                          <li key={item.href || item.to} className="footer__item">
                            <FooterLink {...item} />
                          </li>
                        ),
                      )}
                    </ul>
                  ) : null}
                </div>
              ))}
              </div>
          </div>
          </div>
          <div className={styles.bottom}>
            {copyright ? (
              <div
                className="footer__copyright" // Developer provided the HTML, so assume it's safe.
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: copyright,
                }}
              />
            ) : null}
          </div>
      </div>
    </footer>
  );
}
export default Footer;

