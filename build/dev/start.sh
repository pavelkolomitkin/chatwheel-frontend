#!/usr/bin/env bash
echo 'Starting development frontend environment...'

export CURRENT_USER_ID=$(id -u)
export CURRENT_USER_GROUP_ID=$(id -g)

# docker container run --rm -it --name frontend-dev -p 4200:4200 --user $CURRENT_USER_ID:$CURRENT_USER_GROUP_ID -v $(pwd)/../..:/app -w /app teracy/angular-cli:1.7.4 /bin/bash -c "ng serve --host=0.0.0.0"
docker container run --rm -it --name frontend-dev -p 4200:4200 --user $CURRENT_USER_ID:$CURRENT_USER_GROUP_ID -v $(pwd)/../../app:/app -w /app teracy/angular-cli@sha256:228e00d4f6ba80db7c26ee05f73498bf688e624b85ca8cba71d2f362c3005c2e /bin/bash -c "ng serve --host=0.0.0.0"

#URL=http://localhost:4200
#if which xdg-open > /dev/null
#then
#  xdg-open $URL
#elif which gnome-open > /dev/null
#then
#  gnome-open $URL
#fi
