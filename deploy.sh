#!/bin/sh
# Build React app
cd react-app
npm run build
# remove old site
echo "Removing old site..."
rm -rf ../firebase/public/*
# Copy build files into firebase
echo "Copying build folder to firebase..."
cp -r build/* ../firebase/public
cd ../firebase/
# Deploy
if [ "$1" = "" ]
then
  echo "deploying site..."
  firebase deploy --only hosting
elif [ "$1" = "all" ]
then
  echo "deploying everything..."
  firebase deploy
else
    echo "deploying ${1}..."
    firebase deploy --only $1
fi;
