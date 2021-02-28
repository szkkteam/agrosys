#!/bin/sh

npm run build:dll
ANALYZER_HOST="0.0.0.0" API_HOST="backend" npm run start