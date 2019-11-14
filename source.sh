#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )";
BIN=$DIR/node_modules/.bin
PATH=$BIN/:$PATH;
alias start-server="nodemon -e ts --watch ./server -x ./node_modules/.bin/ts-node ./server </dev/null"
alias start-client="electron index.js | grep -v ERROR:CONSOLE";
alias start="start-server & webpack -w & start-client &";
