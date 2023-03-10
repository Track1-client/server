#!/bin/bash
REPOSITORY=/home/ubuntu/build
sudo pm2 kill
cd $REPOSITORY

sudo rm -rf node_modules
sudo cp -r ./config/logs ./dist/config  # config/logs/error 파일은 dist에 포함 안돼서 따로 추가
sudo cp -r ./src/global/config/template ./dist/src/global/config  #.ejs파일들 dist안으로 넣기 
sudo yarn install --frozen-lockfile
sudo npx prisma generate

sudo pm2 start dist/src