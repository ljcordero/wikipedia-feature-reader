/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import { FeedCard } from ".";
import "@testing-library/jest-dom";
import {
  UNVISITED_WIKIPEDIA_FEED_MOCK,
  VISITED_WIKIPEDIA_FEED_MOCK,
} from "../../../lib/mocks";
import { replaceNewLinesWith } from "../../../utils/string";
import { WikipediaFeed } from "../../../app/page";

export const validateFeedCardContentMatch = (
  feedCard: HTMLElement,
  feed: WikipediaFeed,
) => {
  expect(feedCard.querySelector('[data-pc-section="title"]')?.textContent).toEqual(feed.title);
  expect(feedCard.querySelector('[data-pc-section="subtitle"]')?.textContent).toEqual(feed.description);

  const CONTENT = expect(feedCard.querySelector('[data-pc-section="content"]'));
  CONTENT.toHaveTextContent(replaceNewLinesWith(feed.extract, " "));

  const FOOTER = expect(feedCard.querySelector('[data-pc-section="footer"]'));
  FOOTER.toHaveTextContent(feed.type);
  FOOTER.toHaveTextContent(
    new Date(feed.lastEditedDate).toLocaleDateString(),
  );

  if (feed.visited) {
    CONTENT.not.toHaveTextContent("unread");
  } else {
    // not visited
    CONTENT.toHaveTextContent("unread");
  }
};

describe("Molecules: FeedCard", () => {
  it("should not be empty", () => {
    render(
      <FeedCard
        testId="testid"
        feed={UNVISITED_WIKIPEDIA_FEED_MOCK}
        onClick={() => {}}
      />,
    );
    expect(screen.getByTestId("testid")).not.toBeEmptyDOMElement();
  });
  it("should render unvisited feed data pass by props", () => {
    const TEST_ID = "testid";
    render(
      <FeedCard
        testId={TEST_ID}
        feed={UNVISITED_WIKIPEDIA_FEED_MOCK}
        onClick={() => {}}
      />,
    );
    const FEED_CARD = screen.getByTestId(TEST_ID);
    validateFeedCardContentMatch(FEED_CARD, UNVISITED_WIKIPEDIA_FEED_MOCK);
  });
  it("should render visited feed pass by props", () => {
    const TEST_ID = "testid";
    render(
      <FeedCard
        testId={TEST_ID}
        feed={VISITED_WIKIPEDIA_FEED_MOCK}
        onClick={() => {}}
      />,
    );
    const FEED_CARD = screen.getByTestId(TEST_ID);
    validateFeedCardContentMatch(FEED_CARD, VISITED_WIKIPEDIA_FEED_MOCK);
  });
  it("should return feed when clicked", () => {
    const TEST_ID = "testid";
    render(
      <FeedCard
        testId={TEST_ID}
        feed={VISITED_WIKIPEDIA_FEED_MOCK}
        onClick={(feed) => {
          expect(feed).toBe(VISITED_WIKIPEDIA_FEED_MOCK);
        }}
      />,
    );

    fireEvent.click(screen.getByTestId(TEST_ID));
  });
  it("should not render thumbnail", () => {
    const TEST_ID = "testid";

    render(
      <FeedCard
        testId={TEST_ID}
        feed={{ ...VISITED_WIKIPEDIA_FEED_MOCK, thumbnail: undefined }}
        onClick={() => {}}
      />,
    );

    const IMAGE = screen.queryByTestId(`${TEST_ID}-image`);
    expect(IMAGE).not.toBeInTheDocument();
  });
  it("should render thumbnail", () => {
    const TEST_ID = "testid";

    render(
      <FeedCard
        testId={TEST_ID}
        feed={VISITED_WIKIPEDIA_FEED_MOCK}
        onClick={() => {}}
      />,
    );

    const IMAGE = screen.getByTestId(`${TEST_ID}-image`);

    expect(screen.getByTestId(TEST_ID)).toContainElement(IMAGE);
    expect(IMAGE.getAttribute("src")).toContain(
      encodeURIComponent(VISITED_WIKIPEDIA_FEED_MOCK.thumbnail!),
    );
  });
});
