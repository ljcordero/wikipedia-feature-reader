/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LanguageDropdown } from ".";
import "@testing-library/jest-dom";
import { LIBRE_TRANSLATE_API_SUPPORTED_LANGUAGES } from "../../../constants";
import { randomIntFromInterval } from "../../../utils/math";

const OPTIONS = LIBRE_TRANSLATE_API_SUPPORTED_LANGUAGES;

describe("Molecules: LanguageDropdown", () => {
  it("should not be empty", () => {
    render(<LanguageDropdown testId="testid" options={OPTIONS} />);
    expect(screen.getByTestId("testid")).not.toBeEmptyDOMElement();
  });
  it("should render placeholder pass by props", () => {
    const TEST_ID = "testid";
    const PLACEHOLDER = "placeholder";
    render(
      <LanguageDropdown
        testId={TEST_ID}
        options={OPTIONS}
        placeholder={PLACEHOLDER}
      />,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveTextContent(PLACEHOLDER);
  });
  it("should render options pass by props", async () => {
    const TEST_ID = "testid";
    render(<LanguageDropdown testId={TEST_ID} options={OPTIONS} />);

    const LANGUAGE_DROPDOWN = screen.getByTestId(TEST_ID);
    fireEvent.click(LANGUAGE_DROPDOWN);

    // wait for language dropdown options to render
    await waitFor(async () => process.nextTick);

    for (const option of OPTIONS) {
      const LANGUAGE_DROPDOWN_OPTION = screen.getByTestId(
        `${TEST_ID}-option-${option.code}`,
      );
      expect(LANGUAGE_DROPDOWN_OPTION).toHaveTextContent(option.name);
    }
  });
  it("should render value pass by props", () => {
    const TEST_ID = "testid";
    const RANDOM_OPTION = OPTIONS[randomIntFromInterval(0, OPTIONS.length - 1)];
    render(
      <LanguageDropdown
        testId={TEST_ID}
        options={OPTIONS}
        value={RANDOM_OPTION}
      />,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveTextContent(RANDOM_OPTION.name);
  });
  it("should return language option when selected", async () => {
    const TEST_ID = "testid";
    const RANDOM_OPTION = OPTIONS[randomIntFromInterval(0, OPTIONS.length - 1)];

    render(
      <LanguageDropdown
        testId={TEST_ID}
        options={OPTIONS}
        onSelect={(supportedLanguage) => {
          expect(supportedLanguage).toBe(RANDOM_OPTION);
        }}
      />,
    );

    const LANGUAGE_DROPDOWN = screen.getByTestId(TEST_ID);
    fireEvent.click(LANGUAGE_DROPDOWN);

    // wait for language dropdown options to render
    await waitFor(async () => process.nextTick);

    const LANGUAGE_DROPDOWN_OPTION = screen.getByTestId(
      `${TEST_ID}-option-${RANDOM_OPTION.code}`,
    );

    fireEvent.click(LANGUAGE_DROPDOWN_OPTION);
  });
});
