FROM node
RUN mkdir -p /usr/src/app && mkdir -p /usr/src/app/logs 
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY . /usr/src/app
ENV NODE_ENV=test
EXPOSE 3000
CMD ["node", "build/index.js"]
