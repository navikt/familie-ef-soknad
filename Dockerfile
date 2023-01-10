FROM navikt/node-express:16

USER root

WORKDIR /app
COPY ./build build
COPY ./server server

WORKDIR /app/server

ARG NPM_TOKEN

EXPOSE 8080

USER apprunner

CMD ["npm", "run", "start:server"]