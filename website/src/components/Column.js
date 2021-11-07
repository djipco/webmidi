import React from "react";
import styles from "./Column.module.scss";

export default function Column({children, type,}) {
  const component = "Column";
  return (
    <div className={`
      ${component}
      ${styles.Column}
      ${type}_src-components-${component}-module
    `} >
      {children}
    </div>

  );
}
