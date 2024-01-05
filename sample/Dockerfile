# Use the official Node.js image as the base image
FROM node:14 as build

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install

COPY . .

# Run gulp to build your project
RUN ["yarn", "run", "gulp"]


# Use the official Nginx image as the base image
FROM nginx:latest

# Copy the custom HTML file to the Nginx default HTML directory
COPY sample/index.html /usr/share/nginx/html/
COPY sample/ces-theme.css /usr/share/nginx/html/ces-theme.css
COPY sample/ces-whitelabel.css /usr/share/nginx/html/ces-whitelabel.css

COPY --from=build app/sample/images /usr/share/nginx/html/images
COPY --from=build app/target/warp /usr/share/nginx/html/warp
COPY sample/warp/menu.json /usr/share/nginx/html/warp/menu.json

# Expose port 80 for incoming HTTP traffic
EXPOSE 80