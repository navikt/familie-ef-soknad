FROM navikt/node-express:1.0.0

ENV APPLICATION_NAME=familie-ef-soknad
COPY ./build /app
CMD ["npm", "start"]