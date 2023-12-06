FROM node:21-alpine

WORKDIR /home/web-stomatology

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 3000 3000

CMD [ "yarn", "start" ]