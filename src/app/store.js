import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "../features/chart/chartSlice";
import languageReducer from "../features/language/languageSlice";

export default configureStore({
    reducer: {
        chart: chartReducer,
        language: languageReducer,
    },
});
