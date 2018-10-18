#! /bin/bash

cp index.html index_DISCOLEMUR.INFO.html
cp 404.html 404_DISCOLEMUR.INFO.html
cp static/js/res.js static/js/res_DISCOLEMUR.INFO.js

vim -c ':%s/\/static/http:\/\/www.discolemur.info\/shy-pangolin\/static/g' -c ':wq' index_DISCOLEMUR.INFO.html
vim -c ':%s/\/static/http:\/\/www.discolemur.info\/shy-pangolin\/static/g' -c ':wq' static/js/res_DISCOLEMUR.INFO.js
vim -c ':%s/\/static/http:\/\/www.discolemur.info\/shy-pangolin\/static/g' -c ':wq' 404_DISCOLEMUR.INFO.html