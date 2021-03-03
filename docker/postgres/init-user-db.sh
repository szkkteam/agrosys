#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOL
   CREATE USER flask_api WITH PASSWORD 'flask_api' CREATEDB;
   CREATE DATABASE agro_dev;
   GRANT ALL PRIVILEGES ON DATABASE agro_dev TO flask_api;
EOL