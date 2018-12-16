#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )";
PATH=$DIR/node_modules/.bin/:$PATH;
alias build="tsc --target ES5 --lib ES2015 --skipLibCheck --sourceMap index.ts";
alias start="webpack-dev-server & build; electron index.js | grep -v ERROR:CONSOLE &";