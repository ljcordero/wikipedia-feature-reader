# Wikipedia Feature Reader

## 📘 Overview

Monorepo for the wikipedia feature reader fullstack app

## 📂 Stucture

- [api](/api/README.md)
- [webapp](/webapp/README.md)

## 🛠️ Requirements

To properly set up your environment please make sure that
you meet the following requirements:

- [Docker Community Edition 20.x](https://store.docker.com/search?offering=community&type=edition)
    install method (recommended).
- [Docker Compose](https://docs.docker.com/compose/install/)

## 🚀 Run it

```bash
cp .env.sample .env
```

**Make sure to edit the new `.env` file accordingly**

```bash
docker compose up
```

## Assumptions or limitations

- Need to mock nest typeorm database module to run e2e tests isolated (github workflow)
