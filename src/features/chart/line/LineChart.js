import React from "react";
import { useSelector } from "react-redux";
import { Vega } from "react-vega";
import styles from "../Chart.module.css";
import { ChartHeader } from "../ChartHeader";
import { flattenWebsiteViews } from "../chartSlice";
import spec from "./spec";

export const LineChart = () => {
  const lineChartData = useSelector(flattenWebsiteViews);
  return (
    <div>
      <ChartHeader text={"Views for Website Over Time"} />
      <div className={styles.row}>
        {lineChartData && <Vega spec={spec} data={{ table: lineChartData }} />}
      </div>
    </div>
  );
};
