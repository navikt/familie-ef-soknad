FROM navikt/node-express:1.0.0
##FROM navikt/pus-decorator:228.20190926.1521
ENV APPLICATION_NAME=familie-ef-soknad
ENV HEADER_TYPE=WITHOUT_MENU
ENV CONTEXT_PATH=/
COPY ./build /app
