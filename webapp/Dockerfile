FROM node:21-alpine3.18 AS build

WORKDIR /usr/app

COPY package*.json . ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:21-alpine3.18 AS runtime

WORKDIR /usr/app

COPY --from=build /usr/app/.next/standalone ./
COPY --from=build /usr/app/public ./public

CMD ["node", "server"]
