#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )";
PATH=$DIR/node_modules/.bin/:$PATH;
alias start="electron . | grep -v ERROR:CONSOLE & webpack-dev-server &";
alias build="tsc --target ES5 --lib ES2015 --skipLibCheck --sourceMap server/index.ts";