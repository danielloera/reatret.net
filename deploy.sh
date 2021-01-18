sudo npm run build
rsync -uvrP --delete-after build/ root@reatret.net:/var/www/reatret
