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

from sqlalchemy.schema import DropTable
from sqlalchemy.ext.compiler import compiles

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

# Needed when schema is fucked up and have to force delete the DB
@compiles(DropTable, "postgresql")
def _compile_drop_table(element, compiler, **kwargs):
    return compiler.visit_drop_table(element) + " CASCADE"

@pytest.fixture(autouse=True, scope='session')
def db():
    # Because we are using a persisent db, make sure if the test fails, on the next execution the schema is set from 0
    db_ext.drop_all()
    db_ext.create_all()
    yield db_ext
    # TODO: Maybe this is not needed, because we reset the db at the begining
    #db_ext.drop_all()


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
def farm(model_factory):
    yield model_factory.create('Farm', 'FARMER_USER')

@pytest.fixture()
def farm_owner(user, model_factory):
    farm = model_factory.create('Farm', 'FARMER_USER')
    user.resources.append(farm)
    # TODO: Currently I'm not sure why the farm.fields list is empty at this point.
    # The model factory created the model structure correctly, but after commit the list is become empty.
    yield user

@pytest.fixture()
def farm_user1(model_factory):
    user = model_factory.create('User', 'farmer1')
    farm = model_factory.create('Farm', 'FARMER_USER_FARM1')
    user.resources.append(farm)
    yield user

@pytest.fixture()
def farm_user2(model_factory):
    user = model_factory.create('User', 'farmer2')
    farm = model_factory.create('Farm', 'FARMER_USER_FARM2')
    user.resources.append(farm)
    yield user

@pytest.fixture()
def region_1(model_factory):
    yield model_factory.create('Region', 'REGION_1')

@pytest.fixture()
def soil(model_factory):
    yield model_factory.create('SoilType', 'SOIL_TYPE_1')

@pytest.fixture()
def agri_type(model_factory):
    yield model_factory.create('AgriculturalType', 'AGRICULTURAL_TYPE_ARABLE_LAND')

@pytest.fixture()
def products(model_factory):
    ag_p_region1 = model_factory.create('AgriculturalProductFact', 'AG_PRODUCT_COMMON_WHEAT_REGION_1_AUTUMN_NOVUM_WHEAT')
    ag_p_region2 = model_factory.create('AgriculturalProductFact', 'AG_PRODUCT_COMMON_WHEAT_REGION_1_SPRING_WHEAT')
    ag_p_region3 = model_factory.create('AgriculturalProductFact', 'AG_PRODUCT_COMMON_WHEAT_REGION_2_AUTUMN_NOVUM_WHEAT')
    ag_p_region4 = model_factory.create('AgriculturalProductFact', 'AG_PRODUCT_COMMON_WHEAT_REGION_2_SPRING_WHEAT')
    ag_p_region5 = model_factory.create('AgriculturalProductFact', 'AG_PRODUCT_DURUM_WHEAT_REGION_1_SPRING_DURUM_WHEAT')
    ag_p_region6 = model_factory.create('AgriculturalProductFact', 'AG_PRODUCT_DURUM_WHEAT_REGION_2_SPRING_DURUM_WHEAT')
    country = model_factory.create('Country', 'COUNTRY_HU')
    country.regions.append(ag_p_region1.region)
    country.regions.append(ag_p_region3.region)

    ag_p_region1.specific_product.properties['Hasznosítási kód 2017'] = 'KAL08'
    ag_p_region2.specific_product.properties['Hasznosítási kód 2017'] = 'KAL09'
    ag_p_region5.specific_product.properties['Hasznosítási kód 2017'] = 'KAL05'

    ag_p_region1.specific_product.properties['Hasznosítási terület'] = 'szántó - szemes fehérje takarmánynövények'
    ag_p_region2.specific_product.properties['Hasznosítási terület'] = 'szántó - szemes fehérje takarmánynövények'
    ag_p_region5.specific_product.properties['Hasznosítási terület'] = 'szántó - szemes fehérje takarmánynövények'

@pytest.fixture()
def specific_product(products):
    from backend.reference.models import SpecificProduct
    return SpecificProduct.all()[0]

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
