import { changeDisplayFormat, getSearchButton, getTitle, loadMoreFeeds, openFeed, searchRandomWikipediaFeeds, selectLastMonthDayAndRandomLanguage } from "../support/home";

const URL = Cypress.env("FRONTEND_URL");

describe("Testing Home Page", () => {
  beforeEach(() => {
    cy.visit(URL);
  });

  it("visit home", () => {
    getTitle().should('exist');
  });

  it("search button disabled by default", () => {
    getSearchButton().should('be.disabled');
  });

  it("select date and language", () => {
    selectLastMonthDayAndRandomLanguage();
  });

  it("search random wikipedia feeds", () => {
    searchRandomWikipediaFeeds();
  });

  it("open feed", () => {
    openFeed();
  });

  it("load more feeds", () => {
    loadMoreFeeds();
  });

  it("change display format", () => {
    changeDisplayFormat();
  });
});
