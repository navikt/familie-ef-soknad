FROM navikt/node-express:16

USER root

WORKDIR /app
COPY ./build build
COPY ./server server

WORKDIR /app/server

RUN npm ci

EXPOSE 8080

USER apprunner

CMD ["node", "server.js"]