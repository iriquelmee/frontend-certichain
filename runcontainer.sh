#!/bin/bash

docker run -d \
  --name nginx-ssl \
  -p 80:80 \
  -p 443:443 \
  -v /etc/letsencrypt/live/certichain.ddns.net/fullchain.pem:/etc/nginx/certificates/fullchain.pem \
  -v /etc/letsencrypt/live/certichain.ddns.net/privkey.pem:/etc/nginx/certificates/privkey.pem \
  massima-front