npm run build
rsync -uvrP --delete-after out/ root@192.168.50.53:/usr/share/reatret.net/www
