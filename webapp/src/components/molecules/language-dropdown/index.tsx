"use client";

import { LibreTranslateApiSupportedLanguage } from "@/constants";
import { Dropdown, DropdownProps } from "primereact/dropdown";
import Flag from "react-flagkit";

export type LanguageDropdownProps = {
  testId?: string;
  value?: LibreTranslateApiSupportedLanguage;
  placeholder?: string;
  options: LibreTranslateApiSupportedLanguage[];
  onSelect?: (supportedLanguage: LibreTranslateApiSupportedLanguage) => void;
};

export const LanguageDropdown = ({
  testId,
  value,
  placeholder,
  options,
  onSelect,
}: LanguageDropdownProps) => {
  const languageTemplate = (option: LibreTranslateApiSupportedLanguage) => {
    return (
      <div
        data-testid={`${testId}-option-${option.code}`}
        className="flex align-items-center"
      >
        <Flag country={option.countryCode.toUpperCase()} className="mr-2" />
        <div>{option.name}</div>
      </div>
    );
  };

  const selectedLanguageTemplate = (
    option: LibreTranslateApiSupportedLanguage,
    props: DropdownProps,
  ) => {
    if (option) {
      return languageTemplate(option);
    }

    return <span>{props.placeholder}</span>;
  };

  return (
    <Dropdown
      data-testid={testId}
      value={value}
      onChange={(e) => onSelect && onSelect(e.value)}
      options={options}
      optionLabel="name"
      placeholder={placeholder}
      filter
      valueTemplate={selectedLanguageTemplate}
      itemTemplate={languageTemplate}
      className="w-full"
    />
  );
};
