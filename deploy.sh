sudo npm run build
rsync -uvrP --delete-after ~/reatret.net/react-app/build/ root@reatret.net:/var/www/reatret
