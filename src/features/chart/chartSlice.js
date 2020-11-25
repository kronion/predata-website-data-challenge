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

const sum = numbers => _.reduce(numbers, (a, b) => a + b, 0);

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
 * Return: Array<{ language: string, views: number }>
 */
export const groupByLanguage = createSelector(
  [selectData, getSelectedLanguages],
  (data, languages) => {
    const language_names = languages.map(({name}) => name)
    const language_counts = _.flatten(
      data
        // sum views *once* per website
        .map(website => ({...website, views: sum(website.website_views.map(({count}) => parseInt(count)))}))
        // explode each tag of each website (discarding *which* website it came from)
        .map(website => website.tags.map(tag => ({language: tag.name, views: website.views})))
    );
    const language_groups = _.groupBy(
      language_counts
        // filter down to selected languages
        .filter(count => language_names.includes(count.language)),
      'language'
    );
    return _.map(
      language_groups,
      (group, language) => ({language, views: sum(group.map(({views}) => views))})
    );
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
