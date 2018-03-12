#!/bin/bash

cd "$(dirname "$0")"
PIDFILE="../logs/hisp.pid"
if [ -e $PIDFILE ]; then
  kill $(<"$PIDFILE")
  rm -f $PIDFILE
  echo '*****************'
  echo 'Node HISP Stopped'
  echo '*****************'
else
  echo '*********************'
  echo 'Node HISP Not Running'
  echo '*********************'
fi

