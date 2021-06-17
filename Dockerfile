FROM navikt/node-express:14-alpine

USER root

ENV NODE_ENV production
WORKDIR /app
COPY ./ ./

RUN npm ci
RUN npm run build

EXPOSE 8080

USER apprunner

CMD ["npm", "run", "serve"]