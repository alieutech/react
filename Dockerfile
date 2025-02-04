# Use the official Node.js image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your application
COPY . .

# Expose the port your app runs on (React defaults to 3000)
EXPOSE 3000

# Run the application using the start script
CMD ["npm", "run", "start"]
