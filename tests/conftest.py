#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import os
import pytest

# Pip package imports
from collections import namedtuple
from flask import template_rendered, current_app
from flask_security.signals import (
    reset_password_instructions_sent,
    user_confirmed,
    user_registered,
)
from sqlalchemy import event

# Internal package imports
from backend.app import _create_app
from backend.config import TestConfig
from backend.extensions import db as db_ext
from backend.extensions.mail import mail

from ._client import (
    ApiTestClient,
    ApiTestResponse,
    HtmlTestClient,
    HtmlTestResponse,
)
from ._model_factory import ModelFactory


@pytest.fixture(autouse=True, scope='session')
def app():
    app = _create_app(TestConfig)
    #ctx = app.app_context()
    ctx = app.test_request_context()
    ctx.push()
    yield app
    ctx.pop()


@pytest.yield_fixture
def client(app):
    app.response_class = HtmlTestResponse
    app.test_client_class = HtmlTestClient
    with app.test_client() as client:
        yield client


@pytest.yield_fixture
def api_client(app):
    app.response_class = ApiTestResponse
    app.test_client_class = ApiTestClient
    with app.test_client() as client:
        yield client


@pytest.fixture(autouse=True, scope='session')
def db():

    @event.listens_for(db_ext.engine, "first_connect")
    def load_spatialite(dbapi_conn, connection_record):
        # From https://geoalchemy-2.readthedocs.io/en/latest/spatialite_tutorial.html
        dbapi_conn.enable_load_extension(True)
        #dbapi_conn.load_extension('/usr/lib/x86_64-linux-gnu/mod_spatialite.so')
        dbapi_conn.load_extension('libspatialite.so')
        try:
            dbapi_conn.execute('select load_extension("libspatialite")')
            current_app.spatialite_modulename = 'libspatialite'
        except Exception as e:
            dbapi_conn.execute('select load_extension("mod_spatialite")')
            current_app.spatialite_modulename = 'mod_spatialite'
        dbapi_conn.enable_load_extension(False)

    @event.listens_for(db_ext.engine, "connect")
    def connect(sqlite, connection_rec):
        sqlite.enable_load_extension(True)
        sqlite.execute('select load_extension("libspatialite.so")')
        sqlite.execute('select load_extension("%s")' % current_app.spatialite_modulename)
        sqlite.enable_load_extension(False)

    db_ext.create_all()
    yield db_ext
    db_ext.drop_all()


@pytest.fixture(autouse=True)
def db_session(db):
    connection = db.engine.connect()
    transaction = connection.begin()

    session = db.create_scoped_session(options=dict(bind=connection, binds={}))
    db.session = session

    try:
        yield session
    finally:
        transaction.rollback()
        connection.close()
        session.remove()


@pytest.fixture(scope='session')
def celery_config():
    return {'broker_url': 'redis://localhost:6379/1',
            'result_backend': 'redis://localhost:6379/1',
            'accept_content': ('json', 'pickle')}


@pytest.fixture()
def templates(app):
    records = []
    RenderedTemplate = namedtuple('RenderedTemplate', 'template context')

    def record(sender, template, context, **extra):
        records.append(RenderedTemplate(template, context))
    template_rendered.connect(record, app)

    try:
        yield records
    finally:
        template_rendered.disconnect(record, app)


@pytest.fixture()
def outbox():
    with mail.record_messages() as messages:
        yield messages


@pytest.fixture()
def registrations(app):
    records = []

    def record(sender, *args, **kwargs):
        records.append(kwargs)
    user_registered.connect(record, app)

    try:
        yield records
    finally:
        user_registered.disconnect(record, app)


@pytest.fixture()
def confirmations(app):
    records = []

    def record(sender, *args, **kwargs):
        records.append(kwargs['user'])
        print("Record: ", records[-1])
    user_confirmed.connect(record, app)

    try:
        yield records
    finally:
        print("Disconnect record: ", records)
        user_confirmed.disconnect(record, app)


@pytest.fixture()
def password_resets(app):
    records = []

    def record(sender, *args, **kwargs):
        records.append(kwargs)
    reset_password_instructions_sent.connect(record, app)

    try:
        yield records
    finally:
        reset_password_instructions_sent.disconnect(record, app)


@pytest.fixture()
def user(model_factory):
    yield model_factory.create('User', 'user')

@pytest.fixture()
def newslettersubscribe(model_factory):
    yield model_factory.create('NewsletterSubscribe', 'newslettersubscribe')

@pytest.fixture()
def admin(model_factory):
    yield model_factory.create('User', 'admin')


@pytest.fixture()
def models(request, model_factory):
    mark = request.param
    if mark is not None:
        return model_factory.get_models(mark)


@pytest.fixture()
def model_factory(app, db_session):
    fixtures_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                'model_fixtures')
    yield ModelFactory(db_session, app.models, fixtures_dir)
