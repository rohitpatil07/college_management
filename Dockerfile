# Use the official Node.js image with Node.js 16
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js app
RUN yarn build

# Expose the port that your Next.js app will run on
EXPOSE 3000

# Command to run the application
CMD ["yarn", "start"]
