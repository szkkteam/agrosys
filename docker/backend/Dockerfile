FROM python:3.7-alpine

ENV PYTHONUNBUFFERED 1

RUN apk add --no-cache shadow
RUN useradd --user-group --create-home --home-dir /flask --shell /bin/false flask

#RUN apk add --no-cache linux-headers make gcc musl-dev libxml2-dev libxslt-dev libffi-dev libc-dev libgeos-dev postgresql postgresql-dev git
RUN apk add --no-cache linux-headers make gcc musl-dev libxml2-dev libxslt-dev libffi-dev postgresql postgresql-dev git

# shapely workaround: https://serverfault.com/questions/947044/installing-shapely-on-alpine-docker
RUN apk add --virtual .build-deps \
        --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing \
        --repository http://dl-cdn.alpinelinux.org/alpine/edge/main \
        gcc libc-dev geos-dev geos && \
    runDeps="$(scanelf --needed --nobanner --recursive /usr/local \
    | awk '{ gsub(/,/, "\nso:", $2); print "so:" $2 }' \
    | xargs -r apk info --installed \
    | sort -u)" && \
    apk add --virtual .rundeps $runDeps

RUN geos-config --cflags

WORKDIR /flask/src

COPY ./requirements.txt requirements.txt
COPY ./requirements-dev.txt requirements-dev.txt

RUN pip install --no-cache-dir -U pip
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir -r requirements-dev.txt


RUN apk del build-base python3-dev && \
    rm -rf /var/cache/apk/*

USER flask

RUN mkdir -p /flask/.cache /flask/.local/share

#COPY ./docker/backend/docs-entrypoint.sh /
#COPY ./docker/backend/celery-beat-entrypoint.sh /
#COPY ./docker/backend/celery-worker-entrypoint.sh /
COPY ./docker/backend/flask-entrypoint.sh /flask-entrypoint.sh
#COPY ./docker/backend/test-entrypoint.sh /test-entrypoint.sh

#RUN chmod +x flask-entrypoint.sh