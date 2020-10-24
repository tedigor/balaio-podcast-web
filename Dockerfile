FROM node:12.16-alpine as build

WORKDIR /app

COPY package.json /app/package.json

ENV REACT_APP_API_ENDPOINT=http://api:3000/
ARG REACT_APP_TOKEN_HEADER=Authorization
ARG REACT_APP_TOKEN_STORAGE_KEY=token
RUN npm install
COPY . /app
RUN npm build


FROM nginx:1.12-alpine
COPY --from=build /app/nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build/ /usr/share/nginx/html/balaio
EXPOSE 80