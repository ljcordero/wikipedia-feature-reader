"use client";

import { Card } from "primereact/card";
import styles from "./style.module.css";
import Image from "next/image";
import { Badge } from "primereact/badge";
import { Tag } from "primereact/tag";
import { WikipediaFeed } from "@/app/page";

export type FeedCardProps = {
  testId?: string;
  feed: WikipediaFeed;
  onClick: (feed: WikipediaFeed) => void;
};

export const FeedCard = ({ testId, feed, onClick }: FeedCardProps) => {
  const cardClasses = [
    styles.card,
    "flex",
    "flex-column",
    "cursor-pointer",
    "overflow-hidden",
    "h-full",
    "p-overlay-badge",
  ];

  if (!feed.visited) {
    cardClasses.push("border-1", "border-solid", "border-primary");
  }

  const header = () => {
    if (feed.thumbnail) {
      return (
        <div>
          <Image
            data-testid={`${testId}-image`}
            src={feed.thumbnail}
            height={200}
            width={200}
            alt={feed.title}
          />
        </div>
      );
    }

    return null;
  };

  const footer = (
    <div className="flex flex-row justify-content-between">
      <Tag value={new Date(feed.lastEditedDate).toLocaleDateString()} />
      <Tag value={feed.type} severity="info" />
    </div>
  );

  const visitedIndicator = () => {
    if (!feed.visited) {
      return (
        <Badge
          className={`${styles.badge} border-noround`}
          severity="success"
          value="unread"
        ></Badge>
      );
    }
  };

  return (
    <Card
      data-testid={testId}
      title={feed.title}
      subTitle={feed.description}
      header={header}
      footer={footer}
      className={cardClasses.join(" ")}
      onClick={() => onClick(feed)}
    >
      <p className={styles.text}>{feed.extract}</p>
      {visitedIndicator()}
    </Card>
  );
};
