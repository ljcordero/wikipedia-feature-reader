FROM node:21-alpine3.18 AS build

WORKDIR /usr/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:21-alpine3.18 AS runtime

WORKDIR /usr/app

COPY --from=build /usr/app/package.json ./
COPY --from=build /usr/app/node_modules ./node_modules/
COPY --from=build /usr/app/dist/ ./dist/

CMD ["npm", "run", "start:prod"]
