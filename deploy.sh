git pull
npm install
npm run build
rsync -uvrP --delete-after dist/ root@192.168.50.53:/usr/share/nginx/html
