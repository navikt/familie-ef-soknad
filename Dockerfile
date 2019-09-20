FROM navikt/node-express:1.0.0
ENV APPLICATION_NAME=familie-ef-soknad
COPY . /app

#FROM node
#WORKDIR /usr/src/app
#COPY . .
#RUN npm install
#EXPOSE 3000
#CMD ["npm", "start"]
# END Simple working example

#FROM navikt/pus-decorator:216.20190522.1711
#ENV APPLICATION_NAME=familie-ef-soknad
#ENV NAIS_APP_NAME=familie-ef-soknad
#ENV APPRES_CMS_URL = http://appres-t6.nav.no
#ENV HEADER_TYPE=WITHOUT_MENU
#ENV NAIS_NAMESPACE=default
#ENV CONTEXT_PATH=/
#COPY ./build /app

# docker build -t local:MYTAG .
# docker run -it -p 80:3000 local:decorator