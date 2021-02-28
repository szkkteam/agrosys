#!/bin/sh

export UNCHAINED="unchained_config"
until flask db upgrade
do
    echo "Waiting for postgres ready..."
    sleep 2
    flask db init
    flask db migrate -m 'create initial tables'
done

flask db import-fixtures
API_HOST="backend" flask run --host 0.0.0.0 --port 5000