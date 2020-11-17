import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import _ from "underscore";
import { getSelectedLanguages } from "../language/languageSlice";

export const chartSlice = createSlice({
  name: "chart",
  initialState: {
    data: [],
    date: "2019-04-11"
  },
  reducers: {
    add: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const { increment, decrement, add } = chartSlice.actions;

export const fetchChartData = language => {
  return dispatch => {
    fetch(`http://localhost:5000/websites?=${language}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => res.json())
      .then(websites => {
        dispatch(add(websites));
      });
  };
};

export const selectData = state => state.chart.data;

/**
 * Group total websites views by language.
 *
 * @param data Array<{
 *  tags: <{name: string}>;
 *  url: string;
 *  website_views: Array<{ date: string, count: number}>
 * }>
 * @param languages Array<{name: string, displayed: bool}>
 *
 * Return: { language: string, views: number }
 */
export const groupByLanguage = createSelector(
  [selectData, getSelectedLanguages],
  (data, languages) => {
    // TODO: Implement
    return;
  }
);

/**
 * Flattened list of daily views.
 *
 * @param data Array<{
 *  tags: <{name: string}>;
 *  url: string;
 *  website_views: Array<{ date: string, count: number}>
 * }>
 * @param languages Array<{name: string, displayed: bool}>
 *
 *
 * Return: Array<{
 *    count: number;
 *    date: string;
 *    website: string;
 * }>
 */
export const flattenWebsiteViews = createSelector(
  [selectData, getSelectedLanguages],
  (data, languages) => {
    return _.flatten(
      data
        .filter(
          website =>
            website.tags.filter(tag =>
              languages.map(lang => lang.name).includes(tag.name)
            ).length > 0
        )
        .map(website =>
          website.website_views.map(views => {
            return {
              count: views.count,
              date: views.date,
              website: website.url
            };
          })
        )
    );
  }
);

export default chartSlice.reducer;
