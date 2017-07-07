FROM node:7
ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV production
ADD package.json /tmp/package.json
RUN cd /tmp && npm install --production
WORKDIR /athletes
RUN mv /tmp/node_modules node_modules
COPY index.js /athletes/index.js
COPY config.js /athletes/config.js
ADD ./src /athletes/src

ENV MONGO_HOST mongo

EXPOSE 8080
ENTRYPOINT ["node", "index.js"]
