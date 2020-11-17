import React from "react";
import { useSelector } from "react-redux";
import _ from "underscore";
import Checkbox from "./Checkbox";
import { getLanguages } from "./languageSlice";

export function Languages() {
  const languages = useSelector(getLanguages);

  return (
    <div>
      <div>
        {_.map(languages, language => {
          return (
            <Checkbox
              displayed={true}
              language={language}
              key={language.name}
            />
          );
        })}
      </div>
    </div>
  );
}
