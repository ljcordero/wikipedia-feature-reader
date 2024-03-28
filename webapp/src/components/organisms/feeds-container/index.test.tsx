/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";
import { randomIntFromInterval } from "../../../utils/math";
import { FeedsContainer } from ".";
import {
  FeedsContainerDisplayFormatOption,
  FeedsContainerDisplayFormatOptions,
} from "../../../components/molecules";
import { WIKIPEDIA_FEEDS_MOCK } from "../../../lib/mocks";
import { validateFeedCardContentMatch } from "../../../components/molecules/feed-card/index.test";

const DEFAULT_DISPLAY_FORMAT =
  FeedsContainerDisplayFormatOptions.THREE_FEEDS_PER_ROW;

describe("Organisms: FeedsContainer", () => {
  it("should not be empty DOM - undefined feeds", () => {
    const TEST_ID = "testid";

    render(
      <FeedsContainer
        testId={TEST_ID}
        hasMore={true}
        displayFormat={DEFAULT_DISPLAY_FORMAT}
        onLoadMore={() => {}}
        onFeedCardClick={() => {}}
      />,
    );

    expect(screen.getByTestId(`${TEST_ID}-empty`)).not.toBeEmptyDOMElement();
  });
  it("should not be empty DOM - empty feeds", () => {
    const TEST_ID = "testid";

    render(
      <FeedsContainer
        testId={TEST_ID}
        feeds={[]}
        hasMore={true}
        displayFormat={DEFAULT_DISPLAY_FORMAT}
        onLoadMore={() => {}}
        onFeedCardClick={() => {}}
      />,
    );

    expect(screen.getByTestId(`${TEST_ID}-empty`)).not.toBeEmptyDOMElement();
  });
  it("should render progress spinner", () => {
    const TEST_ID = "testid";
    const FEEDS = WIKIPEDIA_FEEDS_MOCK;

    render(
      <FeedsContainer
        testId={TEST_ID}
        feeds={FEEDS}
        hasMore={true}
        displayFormat={DEFAULT_DISPLAY_FORMAT}
        onLoadMore={() => {}}
        onFeedCardClick={() => {}}
      />,
    );

    expect(screen.queryByTestId(`${TEST_ID}-progress-spinner`)).not.toBeNull();
  });
  it("should not render progress spinner", () => {
    const TEST_ID = "testid";
    const FEEDS = WIKIPEDIA_FEEDS_MOCK;

    render(
      <FeedsContainer
        testId={TEST_ID}
        feeds={FEEDS}
        hasMore={false}
        displayFormat={DEFAULT_DISPLAY_FORMAT}
        onLoadMore={() => {}}
        onFeedCardClick={() => {}}
      />,
    );

    expect(screen.queryByTestId(`${TEST_ID}-progress-spinner`)).toBeNull();
  });
  it("should render class pass by props", () => {
    const TEST_ID = "testid";
    const FEEDS = WIKIPEDIA_FEEDS_MOCK;
    const CLASS_NAME = "class";

    render(
      <FeedsContainer
        testId={TEST_ID}
        feeds={FEEDS}
        className={CLASS_NAME}
        hasMore={true}
        displayFormat={DEFAULT_DISPLAY_FORMAT}
        onLoadMore={() => {}}
        onFeedCardClick={() => {}}
      />,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveClass(CLASS_NAME);
  });
  it("should render feed cards", () => {
    const TEST_ID = "testid";
    const FEEDS = WIKIPEDIA_FEEDS_MOCK;

    render(
      <FeedsContainer
        testId={TEST_ID}
        feeds={FEEDS}
        hasMore={true}
        displayFormat={DEFAULT_DISPLAY_FORMAT}
        onLoadMore={() => {}}
        onFeedCardClick={() => {}}
      />,
    );

    const FEED_CARDS = screen.getAllByTestId(`${TEST_ID}-feed-card`);

    expect(FEED_CARDS.length).toBe(FEEDS.length);

    for (let index = 0; index < FEEDS.length; index++) {
      const FEED_CARD = FEED_CARDS[index];
      const FEED = FEEDS[index];

      validateFeedCardContentMatch(FEED_CARD, FEED);
    }
  });
  it("should return selected feed when clicked", () => {
    const TEST_ID = "testid";
    const FEEDS = WIKIPEDIA_FEEDS_MOCK;
    const RANDOM_INDEX = randomIntFromInterval(0, FEEDS.length - 1);

    render(
      <FeedsContainer
        testId={TEST_ID}
        feeds={FEEDS}
        hasMore={true}
        displayFormat={DEFAULT_DISPLAY_FORMAT}
        onLoadMore={() => {}}
        onFeedCardClick={(feed) => {
          expect(feed).toBe(FEEDS[RANDOM_INDEX]);
        }}
      />,
    );

    const FEED_CARDS = screen.getAllByTestId(`${TEST_ID}-feed-card`);

    fireEvent.click(FEED_CARDS[RANDOM_INDEX]);
  });
  it("should display feed cards in the pass by props display format", async () => {
    const TEST_ID = "testid";
    const FEEDS = WIKIPEDIA_FEEDS_MOCK;

    const DISPLAY_FORMAT_OPTIONS: FeedsContainerDisplayFormatOption[] = [
      FeedsContainerDisplayFormatOptions.FOUR_FEEDS_PER_ROW,
      FeedsContainerDisplayFormatOptions.THREE_FEEDS_PER_ROW,
      FeedsContainerDisplayFormatOptions.TWO_FEEDS_PER_ROW,
    ];

    for (const DISPLAY_FORMAT_OPTION of DISPLAY_FORMAT_OPTIONS) {
      // cleanup before render
      document.body.innerHTML = "";

      render(
        <FeedsContainer
          testId={TEST_ID}
          feeds={FEEDS}
          hasMore={true}
          displayFormat={DISPLAY_FORMAT_OPTION}
          onLoadMore={() => {}}
          onFeedCardClick={() => {}}
        />,
      );

      const FEED_CARDS_WRAPPER = screen.getAllByTestId(
        `${TEST_ID}-feed-card-wrapper`,
      );

      FEED_CARDS_WRAPPER.every((FEED_CARD_WRAPPER) =>
        expect(FEED_CARD_WRAPPER).toHaveClass(DISPLAY_FORMAT_OPTION.class),
      );
    }
  });
});
