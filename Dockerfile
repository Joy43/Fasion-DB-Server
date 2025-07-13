FROM node:20
WORKDIR /app
COPY package.json .
COPY . .
RUN yarn install
EXPOSE 5000
CMD ["yarn", "run", "dev"]
