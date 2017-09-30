#!/bin/bash

function setup_hisp {
  keysTmp=$1[@] defaultsTmp=$2[@]
  keys=("${!keysTmp}")
  defaults=("${!defaultsTmp}")
  environment=$3
  server=$4
  
  echo "**********************"
  echo "Node HISP ${server} Setup"
  echo "**********************"
  
  for idx in "${!keys[@]}"; do
    read -rp "Enter value for ${keys[$idx]} (Default -> ${defaults[$idx]}): " userInput
    if [[ -z "$userInput" ]]; then
      userInput="${defaults[$idx]}"
    fi  
    sed -i '' "s~\(${keys[$idx]}=\).*$~\1"${userInput}"~" "config.${server}.${environment}.env"
  done
  
  echo "*******************************"
  echo "Node HISP ${server} Setup Complete"
  echo "*******************************"
}

cd "$( dirname "$0" )"
cd ../config

ENVIRONMENTS=( local dev prod )
ENVIRONMENT='local'

if [ ! "$1" == "" ]; then
  for i in "${ENVIRONMENTS[@]}"; do
    if [ "$1" == "$i" ]; then
      ENVIRONMENT="$1"
    fi
  done
fi

echo '****************************'
echo 'Beginning Node HISP Setup...'
echo "Environment: ${ENVIRONMENT}"
echo '****************************'

KEYS=( HOST PORT MONGO )
DEFAULTS=( localhost 3000 mongodb://localhost:27017/hisp-server )
setup_hisp KEYS DEFAULTS "${ENVIRONMENT}" 'server'

KEYS=( MAILHOST MAILPORT MAILMONGO )
DEFAULTS=( localhost 1025 mongodb://localhost:27017/hisp-mail )
setup_hisp KEYS DEFAULTS "${ENVIRONMENT}" 'mail'

echo '************************'
echo 'Node HISP Setup Complete'
echo '************************'

