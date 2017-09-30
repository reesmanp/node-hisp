#!/bin/bash

cd "$(dirname "$0")"
cd ..
if [ -x "$(command -v yarn)" ]; then
  yarn
  yarn build
  echo '****************************'
  echo 'Node HISP Installed Via Yarn'
  echo '****************************'
elif [ -x "$(command -v npm)" ]; then
  npm install
  npm run build
  echo '***************************'
  echo 'Node HISP Installed Via NPM'
  echo '***************************'
else
  echo '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
  echo 'Node HISP Could Not Be Installed!'
  echo 'Either Yarn Or NPM Must Be Installed!'
  echo '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
fi

