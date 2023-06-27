FROM ghcr.io/navikt/baseimages/node-express:18

USER root

WORKDIR /app
COPY ./build build
COPY ./server server

WORKDIR /app/server

ARG NPM_TOKEN
RUN npm ci
RUN npm run build

EXPOSE 8080

USER apprunner

CMD ["node","--experimental-modules", "--es-module-specifier-resolution=node", "build/server.js"]
