FROM node:latest

WORKDIR /app

COPY ./dist .

RUN npm install && yarn global add babel babel-cli webpack nodemon pngquant optipng recjpeg

VOLUME ["/app"]

EXPOSE 3003

CMD [ "nodejs", "server.js" ]
