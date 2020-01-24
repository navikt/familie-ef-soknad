FROM navikt/pus-decorator:228.20190926.1521
ENV APPLICATION_NAME=familie-ef-soknad
ENV HEADER_TYPE=WITHOUT_MENU
ENV CONTEXT_PATH=/familie/alene-med-barn/soknad/

RUN npm install
RUN npm build

COPY ./build /app
