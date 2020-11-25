import React from "react";
import styles from "./Chart.module.css";

export const ChartHeader = ({ text }) => (
  <div className={styles.header}>
    <div className={styles.header__text}>{text}</div>
    <label className={styles.header__label}>Title</label>
  </div>
);
