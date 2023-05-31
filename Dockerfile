# Use an official Node.js runtime as the base image
FROM node:14

# Set the NODE_ENV environment variable
ENV NODE_ENV=production

# Set the DB_URI environment variable
ENV DB_URI=mongodb://mongo-0.mongo:27017,mongo-1.mongo:27017,mongo-2.mongo:27017/?replicaSet=rs0


# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Expose a port (if your application listens on a specific port)
EXPOSE 3000

# Set the command to run your application
CMD [ "node", "app.js" ]
