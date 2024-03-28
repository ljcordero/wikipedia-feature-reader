"use client";

import { SelectButton } from "primereact/selectbutton";
import Image from "next/image";

export class FeedsContainerDisplayFormatOptions {
  static FOUR_FEEDS_PER_ROW: FeedsContainerDisplayFormatOption = {
    icon: "4_grids_icon",
    class: "md:col-3",
  };
  static THREE_FEEDS_PER_ROW: FeedsContainerDisplayFormatOption = {
    icon: "3_grids_icon",
    class: "md:col-4",
  };
  static TWO_FEEDS_PER_ROW: FeedsContainerDisplayFormatOption = {
    icon: "2_grids_icon",
    class: "md:col-6",
  };
}

export type FeedsContainerDisplayFormatOption = {
  icon: string;
  class: string;
};

export type FeedsContainerDisplayFormatProps = {
  testId?: string;
  value: FeedsContainerDisplayFormatOption;
  options: FeedsContainerDisplayFormatOption[];
  className?: string;
  onChange: (displayFormatOption: FeedsContainerDisplayFormatOption) => void;
};

export const FeedsContainerDisplayFormat = ({
  testId,
  value,
  options,
  className,
  onChange,
}: FeedsContainerDisplayFormatProps) => {
  const optionTemplate = (option: FeedsContainerDisplayFormatOption) => {
    return (
      <Image
        data-testid={`${testId}-option-image-${option.icon}`}
        src={`/${option.icon}.svg`}
        height={14}
        width={14}
        alt={option.icon}
      />
    );
  };

  return (
    <div
      data-testid={testId}
      className={`${className} flex-row flex-wrap gap-2 justify-content-start align-items-center`}
    >
      <label className="font-medium text-500">Display format</label>
      <SelectButton
        value={value}
        allowEmpty={false}
        onChange={(e) => onChange(e.value)}
        itemTemplate={optionTemplate}
        optionLabel="value"
        options={options}
      />
    </div>
  );
};
