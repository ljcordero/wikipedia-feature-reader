/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import {
  FeedsContainerDisplayFormat,
  FeedsContainerDisplayFormatOption,
  FeedsContainerDisplayFormatOptions,
} from ".";
import "@testing-library/jest-dom";
import { randomIntFromInterval } from "../../../utils/math";

const OPTIONS: FeedsContainerDisplayFormatOption[] = [
  FeedsContainerDisplayFormatOptions.FOUR_FEEDS_PER_ROW,
  FeedsContainerDisplayFormatOptions.THREE_FEEDS_PER_ROW,
  FeedsContainerDisplayFormatOptions.TWO_FEEDS_PER_ROW,
];

describe("Molecules: FeedsContainerDisplayFormat", () => {
  it("should not be empty", () => {
    render(
      <FeedsContainerDisplayFormat
        testId="testid"
        options={OPTIONS}
        value={FeedsContainerDisplayFormatOptions.FOUR_FEEDS_PER_ROW}
        onChange={() => {}}
      />,
    );
    expect(screen.getByTestId("testid")).not.toBeEmptyDOMElement();
  });
  it("should render display format options thumbnail", () => {
    const TEST_ID = "testid";

    render(
      <FeedsContainerDisplayFormat
        testId={TEST_ID}
        options={OPTIONS}
        value={FeedsContainerDisplayFormatOptions.FOUR_FEEDS_PER_ROW}
        onChange={() => {}}
      />,
    );

    const FEEDS_CONTAINER_DISPLAY_FORMAT = screen.getByTestId(TEST_ID);

    for (const option of OPTIONS) {
      const OPTION_IMAGE = screen.getByTestId(
        `${TEST_ID}-option-image-${option.icon}`,
      );
      expect(FEEDS_CONTAINER_DISPLAY_FORMAT).toContainElement(OPTION_IMAGE);
      expect(OPTION_IMAGE.getAttribute("src")).toContain(
        encodeURIComponent(option.icon),
      );
    }
  });
  it("should return display format option when clicked", () => {
    const TEST_ID = "testid";
    const RANDOM_OPTION = OPTIONS[randomIntFromInterval(0, OPTIONS.length - 1)];

    render(
      <FeedsContainerDisplayFormat
        testId={TEST_ID}
        options={OPTIONS}
        value={FeedsContainerDisplayFormatOptions.FOUR_FEEDS_PER_ROW}
        onChange={(displayFormatOption) => {
          expect(displayFormatOption).toBe(RANDOM_OPTION);
        }}
      />,
    );

    const OPTION_IMAGE = screen.getByTestId(
      `${TEST_ID}-option-image-${RANDOM_OPTION.icon}`,
    );

    fireEvent.click(OPTION_IMAGE);
  });
});
