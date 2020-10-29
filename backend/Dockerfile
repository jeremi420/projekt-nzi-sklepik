FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install --only=dev
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
EXPOSE 4000
CMD ["node", "app.js"]