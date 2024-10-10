# pull the base image
# FROM node:21-alpine as base
FROM artefact.skao.int/ska-build:0.1.1 as build

# set the working directory
WORKDIR /app
COPY . .

RUN apt-get install nodejs npm -y

RUN npm install -g n

RUN n latest

RUN npm install --global yarn -y

# install app dependencies and build the app
RUN yarn install && yarn cache clean
RUN yarn webpack build \
    --optimization-concatenate-modules \
    --optimization-minimize \
    --mode production \
    --output-clean --output-path /dist/

# Nginx stage to serve the static files
FROM nginx:1.25.2 as final

# Copy built files
COPY --from=build /dist/* /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]