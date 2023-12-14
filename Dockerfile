# pull the base image
FROM node:21-alpine as base

# # set the working direction
WORKDIR /app
COPY . .

# install app dependencies
RUN yarn install && yarn cache clean

EXPOSE 8090

# start app
CMD ["yarn", "start"]

FROM base as builder

RUN yarn webpack build \
    --optimization-concatenate-modules \
    --optimization-minimize \
    --mode production \
    --output-clean --output-path /dist/

FROM nginx:1.25.2 as final

# Copy built files
COPY --from=builder /dist/* /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]