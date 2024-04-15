FROM node:lts-alpine3.19 AS build
WORKDIR /app
COPY ./package.json .
COPY ./tailwind.config.js .
COPY ./tsconfig.json .
COPY ./tslint.json .
COPY ./src .
RUN yarn install && yarn build

FROM nginx:stable-alpine-slim AS dev
EXPOSE 80
COPY --from=build /app/build/ /usr/share/nginx/html

FROM scratch AS asset
VOLUME /

COPY --from=build /app/build/ /
