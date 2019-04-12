cd react-app
npm run build
cp -r build/* ../firebase/public
cd ../firebase/
firebase deploy