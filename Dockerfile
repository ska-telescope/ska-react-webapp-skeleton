ARG BUILD_IMAGE="registry.gitlab.com/ska-telescope/ska-base-images/ska-build-node:0.1.0-dev.cfccfd72b"
ARG BASE_IMAGE="registry.gitlab.com/ska-telescope/ska-base-images/ska-webserver:0.1.0-dev.cfccfd72b"
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

FROM $BASE_IMAGE

COPY --from=build /build/dist/ /usr/share/nginx/html/
