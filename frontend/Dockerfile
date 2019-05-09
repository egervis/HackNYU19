# Using node image 10.15.1 alpine version
FROM node:10.15.3-alpine

# Sets the working directory of the following commands
WORKDIR /app

# Expose port 3000
EXPOSE 3000

# Runs server.js when the container starts up
ENTRYPOINT [ "npm", "start" ]

# Copy the code to the container
COPY . ./

# Install node module dependencies from the package-lock.json file
RUN npm ci
