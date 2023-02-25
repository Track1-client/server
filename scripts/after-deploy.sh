#!/bin/bash
REPOSITORY=/home/ubuntu/build
sudo pm2 kill
cd $REPOSITORY

sudo rm -rf node_modules
sudo cp -r ./src/global/config/template ./dist/global/config/template  #.ejs파일들 dist안으로 넣기 
sudo yarn install --frozen-lockfile
sudo npx prisma generate
sudo pm2 start dist