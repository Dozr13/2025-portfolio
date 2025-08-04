FROM node:20-alpine

RUN corepack enable

WORKDIR /app

COPY . .

RUN yarn install && yarn build

EXPOSE 3000

CMD ["yarn", "start"]