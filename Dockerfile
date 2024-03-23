FROM node:21-alpine

WORKDIR /home/web-stomatology

COPY . .

RUN yarn config set os linux

RUN yarn config set cpu x64

RUN yarn config set libc musl

RUN yarn install

RUN yarn add sharp --ignore-engines

RUN yarn build

EXPOSE 3000 3000

CMD [ "yarn", "start" ]