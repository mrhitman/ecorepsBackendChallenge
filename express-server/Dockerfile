# Create image based off of the official Node 6 image
FROM node:12

WORKDIR /app/express-server

# Install dependecies
RUN npm install -g nodemon pm2

COPY ./express-server/package.json ./

RUN npm install

# Serve the app
CMD ["npm", "start"]

# Expose the port the app runs in
EXPOSE 3000




