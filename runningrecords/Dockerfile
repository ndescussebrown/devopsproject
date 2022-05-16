#Specify base image
FROM node:14-alpine

#Specify working directory
WORKDIR /usr/src/app

#Copy dependency file
COPY package*.json ./

#Instal dependencies
RUN npm install

#Copy remaining files
COPY . .

#Expose app port
EXPOSE 3000

#Run app
CMD [ "npm", "start" ]
