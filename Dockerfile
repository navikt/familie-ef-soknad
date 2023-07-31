FROM cgr.dev/chainguard/node:18

WORKDIR /app
COPY ./build build
COPY ./server server

WORKDIR /app/server

EXPOSE 8080

CMD ["/usr/bin/npm", "run", "start"]
