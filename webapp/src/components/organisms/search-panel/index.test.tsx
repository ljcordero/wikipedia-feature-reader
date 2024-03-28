/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";
import {
  LIBRE_TRANSLATE_API_SUPPORTED_LANGUAGES,
  LibreTranslateApiSupportedLanguage,
} from "../../../constants";
import { randomIntFromInterval } from "../../../utils/math";
import { SearchPanel } from ".";
import { firstDayLastMonth } from "../../../utils/date";

const OPTIONS = LIBRE_TRANSLATE_API_SUPPORTED_LANGUAGES;

describe("Organisms: SearchPanel", () => {
  it("should not be empty", () => {
    render(<SearchPanel testId="testid" onSearch={() => {}} />);
    expect(screen.getByTestId("testid")).not.toBeEmptyDOMElement();
  });
  it("should contains calendar", () => {
    const TEST_ID = "testid";
    render(<SearchPanel testId={TEST_ID} onSearch={() => {}} />);
    const SEARCH_PANEL = screen.getByTestId(TEST_ID);
    const SEARCH_PANEL_CALENDAR = screen.getByTestId(`${TEST_ID}-calendar`);
    expect(SEARCH_PANEL).toContainElement(SEARCH_PANEL_CALENDAR);
  });
  it("should contains language dropdown", () => {
    const TEST_ID = "testid";
    render(<SearchPanel testId={TEST_ID} onSearch={() => {}} />);
    const SEARCH_PANEL = screen.getByTestId(TEST_ID);
    const SEARCH_PANEL_LANGUAGE_DROPDOWN = screen.getByTestId(
      `${TEST_ID}-language-dropdown`,
    );
    expect(SEARCH_PANEL).toContainElement(SEARCH_PANEL_LANGUAGE_DROPDOWN);
  });
  it("should contains search button", () => {
    const TEST_ID = "testid";
    render(<SearchPanel testId={TEST_ID} onSearch={() => {}} />);
    const SEARCH_PANEL = screen.getByTestId(TEST_ID);
    const SEARCH_PANEL_SEARCH_BUTTON = screen.getByTestId(
      `${TEST_ID}-search-button`,
    );
    expect(SEARCH_PANEL).toContainElement(SEARCH_PANEL_SEARCH_BUTTON);
  });
  it("should search button be disabled by default", () => {
    const TEST_ID = "testid";
    render(<SearchPanel testId={TEST_ID} onSearch={() => {}} />);
    const SEARCH_PANEL_SEARCH_BUTTON = screen.getByTestId(
      `${TEST_ID}-search-button`,
    );
    expect(SEARCH_PANEL_SEARCH_BUTTON).toBeDisabled();
  });
  it("should futures dates be disabled", async () => {
    const TEST_ID = "testid";
    render(<SearchPanel testId={TEST_ID} onSearch={() => {}} />);
    const SEARCH_PANEL_CALENDAR = screen.getByTestId(`${TEST_ID}-calendar`);
    const SEARCH_PANEL_CALENDAR_BUTTON =
      SEARCH_PANEL_CALENDAR.querySelector("button");

    fireEvent.click(SEARCH_PANEL_CALENDAR_BUTTON!);

    // wait for calendar to render
    await waitFor(async () => process.nextTick);

    const CALENDAR_NEXT_MONTH_BUTTON = document.querySelector(
      '[data-pc-section="nextbutton"]',
    );
    fireEvent.click(CALENDAR_NEXT_MONTH_BUTTON!);

    // wait for calendar to render next month dates
    await waitFor(async () => process.nextTick);

    // next month dates are futures dates, so should be disabled all
    expect(
      document.querySelector(
        '[data-pc-section="daylabel"][data-p-disabled="false"]',
      ),
    ).toBeNull();
  });
  it("should return selected date & language on search button click", async () => {
    const TEST_ID = "testid";
    const RANDOM_LANGUAGE_OPTION =
      OPTIONS[randomIntFromInterval(0, OPTIONS.length - 1)];
    const FIRST_DAY_LAST_MONTH = firstDayLastMonth();

    render(
      <SearchPanel
        testId={TEST_ID}
        onSearch={(
          language: LibreTranslateApiSupportedLanguage,
          date: Date,
        ) => {
          expect(FIRST_DAY_LAST_MONTH.getFullYear()).toBe(date.getFullYear());
          expect(FIRST_DAY_LAST_MONTH.getMonth()).toBe(date.getMonth());
          expect(FIRST_DAY_LAST_MONTH.getDate()).toBe(date.getDate());

          expect(language).toBe(RANDOM_LANGUAGE_OPTION);
        }}
      />,
    );

    // ############################################################
    // SEARCH_PANEL_CALENDAR - select first day of last month
    // ############################################################
    const SEARCH_PANEL_CALENDAR = screen.getByTestId(`${TEST_ID}-calendar`);
    const SEARCH_PANEL_CALENDAR_BUTTON =
      SEARCH_PANEL_CALENDAR.querySelector("button");

    fireEvent.click(SEARCH_PANEL_CALENDAR_BUTTON!);

    // wait for calendar to render
    await waitFor(async () => process.nextTick);

    const CALENDAR_PREV_MONTH_BUTTON = document.querySelector(
      '[data-pc-section="previousbutton"]',
    ) as HTMLElement | null;
    fireEvent.click(CALENDAR_PREV_MONTH_BUTTON!);

    // wait for calendar to render last month dates
    await waitFor(async () => process.nextTick);

    // get the first day in the calendar that is not disabled
    // return first day of the last month
    const CALENDAR_PREV_MONTH_DAY = document.querySelector(
      '[data-pc-section="daylabel"][data-p-disabled="false"]',
    ) as HTMLElement | null;
    fireEvent.click(CALENDAR_PREV_MONTH_DAY!);

    // ############################################################
    // SEARCH_PANEL_LANGUAGE_DROPDOWN - select random language
    // ############################################################
    const SEARCH_PANEL_LANGUAGE_DROPDOWN = screen.getByTestId(
      `${TEST_ID}-language-dropdown`,
    );
    fireEvent.click(SEARCH_PANEL_LANGUAGE_DROPDOWN!);

    // wait for language dropdown options to render
    await waitFor(async () => process.nextTick);

    const LANGUAGE_DROPDOWN_OPTION = screen.getByTestId(
      `${TEST_ID}-language-dropdown-option-${RANDOM_LANGUAGE_OPTION.code}`,
    );
    fireEvent.click(LANGUAGE_DROPDOWN_OPTION!);

    // wait for language dropdown selection to render
    await waitFor(async () => process.nextTick);

    // ############################################################
    // SEARCH_PANEL_SEARCH_BUTTON - search
    // ############################################################
    const SEARCH_PANEL_SEARCH_BUTTON = screen.getByTestId(
      `${TEST_ID}-search-button`,
    );

    expect(SEARCH_PANEL_SEARCH_BUTTON).not.toBeDisabled();

    fireEvent.click(SEARCH_PANEL_SEARCH_BUTTON!);
  });
});
