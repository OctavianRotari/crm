FROM node:latest

WORKDIR /app

COPY ./dist .

RUN mkdir -p node_modules/node-sass/vendor/linux-x64-51
RUN curl -L https://github.com/sass/node-sass/releases/download/v4.5.0/linux-x64-51_binding.node -o node_modules/node-sass/vendor/linux-x64-51/binding.node

RUN npm rebuild node-sass --force

VOLUME ["/app"]

EXPOSE 3003

CMD [ "nodejs", "server.js" ]
