#!/bin/sh

echo $$
cd "$(dirname "$0")"
cd ..
PIDFILE="logs/hisp.pid"
if [ ! -e $PIDFILE ]; then
  mkdir -p `dirname logs/server.log`
  ./node_modules/nodemon/bin/nodemon.js server.js >> logs/server.log & echo $! >> ./logs/hisp.pid
  echo '*****************'
  echo 'Node HISP Started'
  echo '*****************'
else
  echo '****************************'
  echo 'Node HISP Is Already Running'
  echo '****************************'
fi

