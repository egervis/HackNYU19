# Using node image 10.15.1 alpine version
FROM node:10.15.1-alpine

# The working directory in the container
RUN mkdir -p /node/src/app
WORKDIR /node/src/app

# Copy everything to the working directory
# Update the .dockerignore file if anything should not be copied
COPY . /node/src/app

# Install dependencies
RUN npm install

# NODE will run on port 3001
EXPOSE 3001

# Runs server.js
CMD ["npm", "start"]
