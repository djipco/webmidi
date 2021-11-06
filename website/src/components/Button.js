import React from "react";
import styles from "./Button.module.scss";

/*export default function Button({children, type, href, target}) {
  return (
    <div className={`${styles.button} ${type}`} href={href} target={target}>
      <a href="#">{children}</a>
      <div className="button--bg"></div>
    </div>
  );
}*/

export default function Button(props) {
  const component = "Button";
  const{
    children,
    href,
    type,
    target,
  } = props;
  return (
    <div
      className={`
        ${component}
        ${styles.Button}
        ${type}_src-components-${component}-module
      `}


    >
      <a href={href} target={target}>{children}</a>
      <div className={`${styles.buttonBg}`} />
    </div>
  );
}
