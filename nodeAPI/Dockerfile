# Using node image 10.15.1 alpine version
FROM node:10.15.1-alpine

# The working directory in the container
RUN mkdir -p /node/src/app
WORKDIR /node/src/app

# Copy package and package-lock.json files to the working directory
COPY package*.json /node/src/app/

# Install dependencies
RUN npm install

# Copy source code from this directory
COPY src /node/src/app
COPY server.js /node/src/app

# NODE will run on port 3000
EXPOSE 3000

# Runs server.js
CMD ["npm", "start"]
