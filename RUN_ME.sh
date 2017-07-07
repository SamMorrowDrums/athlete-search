#!/bin/bash
sudo docker-compose  build
sudo docker-compose up -d
./data/build-sample-data.py 5000
mongoimport --db athletes --collection categories --jsonArray --file ./data/sample-categories.json
mongoimport --db athletes --collection records --jsonArray --file ./data/sample-people.json
mongo localhost/athletes ./data/setup-data.js
mongo localhost/athletes ./data/create-indexes.js
echo "For further instructions visit: http://localhost:8080/"
echo "Type [ENTER] to clean up:"
read x
sudo docker-compose stop
sudo docker-compose rm -f
