import { faker } from "@faker-js/faker";
import { WikipediaFeed } from "@/app/page";

export const generateRandomWikipediaFeed = (): WikipediaFeed => ({
  id: faker.number.int(),
  title: faker.lorem.sentence(4),
  description: faker.lorem.paragraph(),
  extract: faker.lorem.lines({ min: 10, max: 20 }),
  lastEditedDate: faker.date.recent().toISOString(),
  type: faker.lorem.word(),
  thumbnail: faker.image.url(),
  visited: faker.datatype.boolean(),
  url: faker.internet.url(),
});

export const UNVISITED_WIKIPEDIA_FEED_MOCK: WikipediaFeed = {
  ...generateRandomWikipediaFeed(),
  visited: false,
};

export const VISITED_WIKIPEDIA_FEED_MOCK: WikipediaFeed = {
  ...generateRandomWikipediaFeed(),
  visited: true,
};

const generateRandomWikipediaFeedArray = (count: number): WikipediaFeed[] => {
  return Array.from({ length: count }, () => generateRandomWikipediaFeed());
};

export const WIKIPEDIA_FEEDS_MOCK: WikipediaFeed[] =
  generateRandomWikipediaFeedArray(50);
