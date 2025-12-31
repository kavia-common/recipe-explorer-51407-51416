#!/bin/bash
cd /home/kavia/workspace/code-generation/recipe-explorer-51407-51416/frontend_react
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

