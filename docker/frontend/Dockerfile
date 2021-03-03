FROM node:13.8-alpine3.11

RUN apk add --no-cache git

# Add top level config files
COPY ./package.json /flask/package.json
COPY ./babel.config.js /flask/babel.config.js

WORKDIR /flask

RUN npm install

COPY ./frontend /flask/frontend

COPY ./docker/frontend/frontend-entrypoint.sh /frontend-entrypoint.sh

#RUN chmod +x frontend-entrypoint.sh