"use client";
import {
  FeedsContainerDisplayFormat,
  FeedsContainerDisplayFormatOptions,
} from "@/components/molecules/feeds-container-display-format";
import { FeedsContainer } from "@/components/organisms/feeds-container";
import { SearchPanel } from "@/components/organisms/search-panel";
import { LibreTranslateApiSupportedLanguage } from "@/constants";
import { useGetWikipediaFeeds } from "@/lib/hooks/use-wikipedia-feeds";
import {
  feedSlice,
  getVisitedFeeds,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import {
  GetWikipediaFeedRequestDto,
  WikipediaFeedResponseDto,
} from "@/lib/services";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import LoadingOverlay from "react-loading-overlay-ts";

const TOAST_LIFE_MILLISECONDS = 5000;

export type WikipediaFeed = WikipediaFeedResponseDto & {
  visited: boolean;
};

const INFINITE_SCROLL = true;

export default function Home() {
  const [wikipediaFeedRequestDto, setWikipediaFeedRequestDto] = useState<
    GetWikipediaFeedRequestDto | undefined
  >(undefined);

  const [displayFormat, setDisplayFormat] = useState(
    FeedsContainerDisplayFormatOptions.THREE_FEEDS_PER_ROW,
  );

  const toast = useRef<Toast>(null);

  const dispatch = useDispatch();

  const visitedFeeds = useSelector(getVisitedFeeds);

  const { data, fetchNextPage, isLoading, isFetching, error } =
    useGetWikipediaFeeds({
      date: wikipediaFeedRequestDto?.date || new Date(),
      language: wikipediaFeedRequestDto?.language || "",
      enabled: !!wikipediaFeedRequestDto,
    });

  const displayFormatOptions = [
    FeedsContainerDisplayFormatOptions.FOUR_FEEDS_PER_ROW,
    FeedsContainerDisplayFormatOptions.THREE_FEEDS_PER_ROW,
    FeedsContainerDisplayFormatOptions.TWO_FEEDS_PER_ROW,
  ];

  const feeds = data?.pages
    .filter((page) => page.feed != null)
    .map(
      (page) =>
        ({
          ...page.feed,
          visited: visitedFeeds.includes(page.feed?.id || NaN),
        }) as WikipediaFeed,
    );

  const onSearchHandler = (
    language: LibreTranslateApiSupportedLanguage,
    date: Date,
  ) => {
    setWikipediaFeedRequestDto({ language: language.code, date });
  };

  const onFeedCardClickHandler = (feed: WikipediaFeed) => {
    window.open(feed.url, "_black");
    dispatch(feedSlice.actions.addVisitedFeed(feed.id));
  };

  const onLoadMoreHandler = () => {
    if (!isFetching) {
      fetchNextPage();
    }
  };

  if (error) {
    toast.current?.replace({
      severity: "error",
      summary: "Error",
      detail: error.message,
      life: TOAST_LIFE_MILLISECONDS,
    });
  }

  return (
    <LoadingOverlay
      className="h-full"
      active={isLoading}
      spinner
      text="Loading feeds"
    >
      <Toast ref={toast} />
      <div className="surface-100 p-2 md:p-8 h-full">
        <div className="surface-card p-4 shadow-2 border-round h-full flex flex-column">
          <div
            data-testid="title"
            className="text-3xl font-medium text-900 mb-4"
          >
            Wikipedia Feeds
          </div>
          <SearchPanel
            testId="search-panel"
            value={wikipediaFeedRequestDto}
            onSearch={onSearchHandler}
          ></SearchPanel>
          <FeedsContainerDisplayFormat
            testId="feeds-container-display-format"
            className="hidden md:flex mb-2"
            value={displayFormat}
            options={displayFormatOptions}
            onChange={setDisplayFormat}
          />
          <FeedsContainer
            testId="feeds-container"
            className="flex-1"
            feeds={feeds}
            hasMore={INFINITE_SCROLL}
            displayFormat={displayFormat}
            onLoadMore={onLoadMoreHandler}
            onFeedCardClick={onFeedCardClickHandler}
          ></FeedsContainer>
        </div>
      </div>
    </LoadingOverlay>
  );
}
