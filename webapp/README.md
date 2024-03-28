# Wikipedia Feature Reader - Webapp

## 📘 Overview

[Next](https://github.com/vercel/next.js) Webapp for the wikipedia feature reader

## 🛠️ Requirements

- Node.js 21

## 📝 Libraries / frameworks used

- prettier: code formatter
- jest: testing framework
- eslint: static code analysis to identify problematic patterns and keep code consistency
- cypress: next generation front end testing framework (e2e)
- @reduxjs/toolkit: library with set of utilities and conventions for writing Redux logic
- @tanstack/react-query: data state management library
- primeflex: lightweight responsive CSS utility library
- primeicons: font icon library
- primereact: UI Components framework for React
- react-error-boundary: errors tree catcher to display a fallback UI
- react-flagkit: flag icons library
- react-infinite-scroller: infinite scroller component to load a grid of items in React
- react-loading-overlay-ts: TS UI component for suspence state
- ts-debounce: utility for preventing a function from executing too frequently
- @faker-js/faker: library to generate fake (but reasonable) data (testing)
- jsdom: library that provides custom DOM element matchers for Jest
- autoprefixer: parse CSS and add vendor prefixes to CSS rules
- identity-obj-proxy: trivial webpack imports, used for jest css mapping
- sharp: convert large images in common formats to smaller

## 🔨 Installation

```bash
npm install
```

```bash
cp .env.sample .env
```

**Make sure to edit the new .env file accordingly**

## 🚀 Running the app

- To start a development server locally

```bash
npm run dev
```

- To run a production server locally

```bash
# build the app
npm run build

# production mode
npm run start
```

## 🧪 Test

```bash
# unit tests
npm run test

# e2e tests

# first time configure cypress env
cp cypress.env.json.sample cypress.env.json
# make sure to edit the new cypress.env.json file accordingly

npm run test:e2e

# test coverage
npm run test:cov
```
