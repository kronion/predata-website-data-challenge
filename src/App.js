import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./App.module.css";
import { BarChart } from "./features/chart/bar/BarChart";
import { LineChart } from "./features/chart/line/LineChart";
import { Languages } from "./features/language/Languages";
import { fetchTagData } from "./features/language/languageSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTagData());
  });

  return (
    <div className={"time_series"}>
      <header className={styles.time_series__header}>
        <Languages />
      </header>
      <div className={styles.time_series__chart_row}>
        <BarChart />
        <LineChart />
      </div>
    </div>
  );
}

export default App;
