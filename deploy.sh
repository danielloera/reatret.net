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
# Move sitemap over
echo "Moving sitemap..."
cd ..
mkdir firebase/public/sitemap
cp sitemap.xml firebase/public/sitemap/
# Deploy
cd firebase/
if [ "$1" = "" ]
then
  echo "Deploying site..."
  firebase deploy --only hosting
elif [ "$1" = "all" ]
then
  echo "Deploying everything..."
  firebase deploy
else
    echo "Deploying ${1}..."
    firebase deploy --only $1
fi;
