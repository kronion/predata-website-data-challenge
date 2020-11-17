import React from "react";
import { useSelector } from "react-redux";
import { Vega } from "react-vega";
import styles from "../Chart.module.css";
import { ChartHeader } from "../ChartHeader";
import { groupByLanguage } from "../chartSlice";
import spec from "./spec";

export const BarChart = () => {
  const languages = useSelector(groupByLanguage);
  return (
    <div>
      <ChartHeader text={"Total Views By Language"} />
      <div className={styles.row}>
        {languages && <Vega spec={spec} data={{ table: languages }} />}
      </div>
    </div>
  );
};
