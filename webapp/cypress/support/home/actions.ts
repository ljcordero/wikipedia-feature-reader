import { randomIntFromInterval } from "../../../src/utils/math";
import { getDisplayFormatOptionImage, getFeedCardWrappers, getFeedCards, getFeedsContainer, getLanguageDropdown, getSearchButton, getSearchCalendarButton } from "./getters";

export const searchCalendarSelectLastDayLastMonth = () => {
  getSearchCalendarButton().click();

  cy.get('[data-pc-section="previousbutton"]').click();
  cy.get('[data-pc-section="daylabel"][data-p-disabled="false"]').last().click();
};

export const languageDropdownSelectLanguage = (languageCode: string) => {
  getLanguageDropdown().click();
  cy.get(`[data-testid="search-panel-language-dropdown-option-${languageCode}"]`).click();
};

export const selectLastMonthDayAndRandomLanguage = () => {
  cy.fixture("language-dropdown-options")
    .then((languageDropdownOptions: { code: string; name: string; }[]) => {
    const LANGUAGE_OPTION = languageDropdownOptions[randomIntFromInterval(0, languageDropdownOptions.length - 1)];

    searchCalendarSelectLastDayLastMonth();
    languageDropdownSelectLanguage(LANGUAGE_OPTION.code);

    getLanguageDropdown().should('contain.text', LANGUAGE_OPTION.name);
    getSearchButton().should('not.be.disabled');
  });
};

export const searchRandomWikipediaFeeds = () => {
  selectLastMonthDayAndRandomLanguage();
  getSearchButton().click();

  getFeedCards().should('have.length.greaterThan', 0);
};

export const openFeed = () => {
  cy.window().then((win) => {
    cy.spy(win, 'open').as('windowOpen');
  });

  searchRandomWikipediaFeeds();

  const FIRST_FEED_CARD = getFeedCards().first();
  FIRST_FEED_CARD
    .should('be.visible')
    .should('contain.text', 'unread')
    .click({force: true});

  FIRST_FEED_CARD.should('not.contain.text', 'unread');

  cy.get('@windowOpen').should('be.called');  
};

export const loadMoreFeeds = () => {
  searchRandomWikipediaFeeds();
  const FEED_CONTAINER = getFeedsContainer();

  FEED_CONTAINER.scrollTo('bottom');

  getFeedCards().should('have.length.greaterThan', 1);
};

export const changeDisplayFormat = () => {
  loadMoreFeeds();

  cy.fixture("display-format-options")
    .then((displayFormatOptions: { icon: string; class: string; }[]) => {
    const RANDOM_DISPLAY_FORMAT_OPTION = displayFormatOptions[randomIntFromInterval(0, displayFormatOptions.length - 1)];

    getDisplayFormatOptionImage(RANDOM_DISPLAY_FORMAT_OPTION.icon).click();

    getFeedCardWrappers().each((wrapper) => cy.wrap(wrapper).should('have.class', RANDOM_DISPLAY_FORMAT_OPTION.class));
  });
};
