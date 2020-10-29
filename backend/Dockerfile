FROM node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=dev
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . .
EXPOSE 4000
CMD ["node", "app.js"]