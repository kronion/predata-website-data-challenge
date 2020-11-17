import React from "react";
import { useDispatch } from "react-redux";
import { fetchSelectedLanguages } from "./languageSlice";

export default function Checkbox({ language }) {
  const { name, displayed } = language;
  const dispatch = useDispatch();
  return (
    <label key={name} htmlFor={name}>
      <input
        type="checkbox"
        label={name}
        id={name}
        key={name}
        checked={displayed}
        onChange={() => dispatch(fetchSelectedLanguages(name))}
      />
      <span>{name}</span>
    </label>
  );
}
