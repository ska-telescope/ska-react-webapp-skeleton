ARG BUILD_IMAGE="registry.gitlab.com/ska-telescope/ska-base-images/ska-node-build:0.1.0"
FROM $BUILD_IMAGE AS build

WORKDIR /build

COPY package*.json yarn.lock ./

RUN yarn install && yarn cache clean

COPY /src ./src
COPY /public ./public
COPY ./*.js ./*.json ./*.ts ./

RUN yarn webpack build \
    --optimization-concatenate-modules \
    --optimization-minimize \
    --mode production \
    --output-clean \
    --output-path /build/dist/

FROM nginx:1.25.2 as final

COPY --from=build /build/dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]