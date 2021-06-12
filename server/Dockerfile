FROM node:latest

# Create app directory
WORKDIR /server

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
#RUN node -e "var fs = require('fs'); fs.createReadStream( 'dir' );"
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]