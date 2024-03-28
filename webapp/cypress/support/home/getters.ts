export const getTitle = (): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.get('[data-testid="title"]');
};

export const getSearchButton = (): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.get('[data-testid="search-panel-search-button"]');
};

export const getSearchCalendar = (): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.get('[data-testid="search-panel-calendar"]');
};

export const getSearchCalendarButton = (): Cypress.Chainable<JQuery<HTMLButtonElement>> => {
  return cy.get('[data-testid="search-panel-calendar"] button');
};

export const getLanguageDropdown = (): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.get('[data-testid="search-panel-language-dropdown"]');
};

export const getFeedsContainer = (): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.get('[data-testid="feeds-container"]');
};

export const getFeedCardWrappers = (): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.get('[data-testid="feeds-container-feed-card-wrapper"]');
};

export const getFeedCards = (): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.get('[data-testid="feeds-container-feed-card"]');
};

export const getDisplayFormatOptionImage = (icon: string): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.get(`[data-testid="feeds-container-display-format-option-image-${icon}"]`);
};
