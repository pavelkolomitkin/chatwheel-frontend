#!/usr/bin/env bash

#echo -en '\n'
#echo "Install dependencies..."
#echo -en '\n'
#docker container run --rm -it --name frontend-prod -v $(pwd)/../../app:/app -w /app teracy/angular-cli@sha256:228e00d4f6ba80db7c26ee05f73498bf688e624b85ca8cba71d2f362c3005c2e npm install
#
#echo -en '\n'
#echo "Building production environment..."
#echo -en '\n'
#docker container run --rm -it --name frontend-prod -v $(pwd)/../../app:/app -w /app teracy/angular-cli@sha256:228e00d4f6ba80db7c26ee05f73498bf688e624b85ca8cba71d2f362c3005c2e ng build --prod --aot --build-optimizer


# remove the existing angular image with the tag wisecat/angular-environment
docker image rm wisecat/angular-environment

# build a new image with ../image.docker with the tag wisecat/angular-environment
docker build -t wisecat/angular-environment -f $(pwd)/../image.docker .

# build the application for the production environment
docker run --rm --name frontend-prod-build -v $(pwd)/../../app:/app -w /app wisecat/angular-environment ng build --aot