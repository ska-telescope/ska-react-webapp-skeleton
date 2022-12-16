# pull the base image
FROM node:alpine

# Install the SKAO specific library
RUN npm config set registry https://artefact.skao.int/repository/npm-internal/ &&\
    yarn add @ska-telescope/ska-javascript-components@latest &&\
    npm config set registry https://registry.npmjs.org/

# # set the working direction
WORKDIR /app
COPY . .

# install app dependencies
RUN yarn install && yarn cache clean

EXPOSE 4221

# start app
CMD ["yarn", "start"]