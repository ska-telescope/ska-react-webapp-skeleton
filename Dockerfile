# pull the base image
FROM node:18.12.1

# Install the SKAO specific libraries
RUN npm config set @ska-telescope:registry https://artefact.skao.int/repository/npm-internal/ &&\
    yarn add @ska-telescope/ska-javascript-components@latest &&\
    yarn add @ska-telescope/ska-gui-components@latest

# # set the working direction
WORKDIR /app
COPY . .

# install app dependencies
RUN yarn install && yarn cache clean

EXPOSE 8090

# start app
CMD ["yarn", "start"]