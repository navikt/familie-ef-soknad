#Simple working example
FROM node
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
# docker build -t local:MYTAG .
# docker run -it -p 80:3000 local:MYTAG