import React from "react";
import styles from "./InformationBar.module.scss";

export default function InformationBar({children, type,}) {
  const component = "InformationBar";
  return (
    <div className={`
      ${component}
      ${styles.InformationBar}
      ${type}_src-components-${component}-module
    `} >
      <div className="container">
        <p>
          {children}
        </p>
      </div>
    </div>

  );
}
