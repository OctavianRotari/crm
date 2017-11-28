FROM node:latest

WORKDIR /app

COPY . .

RUN yarn

VOLUME ["/app/src", "/app/core"]

EXPOSE 3003

CMD [ "yarn", "start" ]
