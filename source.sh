#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )";
BIN=$DIR/node_modules/.bin/
PATH=$BIN:$PATH;
alias start-server="nodemon -e ts --watch ./server -x $BIN/ts-node ./server </dev/null"
alias start="webpack-dev-server & start-server & electron index.js | grep -v ERROR:CONSOLE &";