FROM navikt/node-express:14-alpine

ENV NODE_ENV production
WORKDIR /app
COPY ./ ./

RUN npm ci
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "serve"]