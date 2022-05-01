sudo npm run build
rsync -uvrP --delete-after build/ danny@192.168.50.158:/usr/share/reatret.net/www
