FROM node:14.15.0

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

COPY package.json ./

USER node

RUN  npm install

COPY --chown=node:node . .

CMD [ "npm", "start" ]

EXPOSE 3000


