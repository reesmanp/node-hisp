#!/bin/bash

cd "$(dirname "$0")"
cd ..

tool="npm"
if [[ $# -eq 2 && $2 == "yarn" ]]; then
  tool="yarn"
fi

if [[ $tool == "npm" && -x "$(command -v npm)" ]]; then
  npm install
  npm run build
  echo '***************************'
  echo 'Node HISP Installed Via NPM'
  echo '***************************'
elif [[ $tool == "yarn" && -x "$(command -v yarn)" ]]; then
  yarn
  yarn build
  echo '****************************'
  echo 'Node HISP Installed Via Yarn'
  echo '****************************'
else
  echo '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
  echo 'Node HISP Could Not Be Installed!'
  echo 'Either Yarn Or NPM Must Be Installed!'
  echo '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
fi

