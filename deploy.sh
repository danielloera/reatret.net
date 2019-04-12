#!/bin/sh
# Build React app
cd react-app
npm run build
# Copy build files into firebase
cp -r build/* ../firebase/public
cd ../firebase/
# Deploy
firebase deploy