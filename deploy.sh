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
firebase deploy