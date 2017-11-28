FROM node:8
RUN yarn global add npm@5

WORKDIR /app

COPY . .

VOLUME ["/app/src", "/app/core"]

EXPOSE 3003

CMD [ "yarn", "start" ]
