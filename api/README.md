# Wikipedia Feature Reader - API

## 📘 Overview

[Nest](https://github.com/nestjs/nest) API for the wikipedia feature reader

## 🛠️ Requirements

- Node.js 21

## 📝 Libraries / frameworks used

- prettier: code formatter
- jest: testing framework
- eslint: static code analysis to identify problematic patterns and keep code consistency
- axios: HTTP Client to consume external services
- class-transformer: object transformer
- class-validator: validator to enforce rules for all incoming client payloads
- pg: PostgreSQL client for Node.js
- typeorm: ORM for PostgreSQL database

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
# development
npm run start

# watch mode
npm run start:dev
```

- To run a production server locally

```bash
# build the app
npm run build

# production mode
npm run start:prod
```

## 🧪 Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```
