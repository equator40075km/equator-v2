#! /usr/bin/env sh

rm -rf /frontend/build/*
cp -R /frontend/tmp-build/* /frontend/build/

echo "Деплой завершен! Проверьте права доступа к /var/www/${SECURITY_DOMAIN}/html"
