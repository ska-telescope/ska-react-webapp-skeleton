# pull the base image
FROM node:alpine

# Install the SKAO specific library
RUN npm config set registry https://artefact.skao.int/repository/npm-internal/ &&\
    yarn add @ska-telescope/ska-javascript-components@latest &&\
    npm config set registry https://registry.npmjs.org/

# # set the working direction
WORKDIR /app
COPY . .

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/node_modules/.bin:$PATH

# install app dependencies
RUN yarn install && yarn cache clean

EXPOSE 8090

# start app
CMD ["yarn", "start"]