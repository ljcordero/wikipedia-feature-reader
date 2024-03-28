"use client";

import { LanguageDropdown } from "../../../components/molecules";
import {
  LIBRE_TRANSLATE_API_SUPPORTED_LANGUAGES,
  LibreTranslateApiSupportedLanguage,
} from "../../../constants";
import { yearsBefore, yesterday } from "../../../utils/date";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { useState } from "react";

export type SearchPanelProps = {
  testId?: string;
  onSearch: (language: LibreTranslateApiSupportedLanguage, date: Date) => void;
};

export const SearchPanel = ({ testId, onSearch }: SearchPanelProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<
    LibreTranslateApiSupportedLanguage | undefined
  >(undefined);
  const [selectedDate, setSelectedDate] = useState<Nullable<Date>>(null);

  const LANGUAGES = LIBRE_TRANSLATE_API_SUPPORTED_LANGUAGES.sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const MIN_DATE = yearsBefore(new Date(), 1);
  const MAX_DATE = yesterday();

  const onSearchClickHandler = () => {
    if (selectedLanguage && selectedDate) {
      onSearch(selectedLanguage, selectedDate);
    }
  };

  return (
    <div
      data-testid={testId}
      className="flex flex-column md:flex-row font-medium text-500 mb-4 gap-4"
    >
      <div className="flex flex-column w-full md:w-3">
        <label className="mb-2">Date</label>
        <Calendar
          data-testid={`${testId}-calendar`}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.value)}
          showIcon
          minDate={MIN_DATE}
          maxDate={MAX_DATE}
          readOnlyInput
        />
      </div>
      <div className="flex flex-column w-full md:w-3">
        <label className="mb-2">Language</label>
        <LanguageDropdown
          testId={`${testId}-language-dropdown`}
          value={selectedLanguage}
          placeholder="Select a Language"
          options={LANGUAGES}
          onSelect={(value) => setSelectedLanguage(value)}
        ></LanguageDropdown>
      </div>
      <div className="flex flex-column justify-content-end">
        <Button
          data-testid={`${testId}-search-button`}
          className="h-3rem"
          label="Search"
          disabled={!selectedLanguage || !selectedDate}
          onClick={onSearchClickHandler}
        />
      </div>
    </div>
  );
};
