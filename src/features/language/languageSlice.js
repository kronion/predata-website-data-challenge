import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import _ from "underscore";
import { fetchChartData } from "../chart/chartSlice";

export const languageSlice = createSlice({
  name: "language",
  initialState: {
    tags: {}
  },
  reducers: {
    select: (state, action) => {
      const selectedTag = state.tags.find(tag => tag.name === action.payload);
      selectedTag.displayed = !selectedTag.displayed;
    },
    add: (state, action) => {
      state.tags = _.map(action.payload, language => {
        return { name: language.name, displayed: false };
      });
    }
  }
});

export const { select, add } = languageSlice.actions;

export const fetchTagData = () => {
  return dispatch => {
    fetch("http://localhost:5000/tags", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => res.json())
      .then(languages => {
        dispatch(add(languages));
      });
  };
};

export const fetchSelectedLanguages = name => {
  return dispatch => {
    dispatch(select(name));
    dispatch(fetchChartData(name));
  };
};

export const getLanguages = state => state.language.tags;

export const getSelectedLanguages = createSelector(
  [getLanguages],
  languages => {
    return _.filter(languages, tag => tag.displayed);
  }
);

export default languageSlice.reducer;
