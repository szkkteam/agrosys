#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from flask import url_for
from flask_security import AnonymousUser, current_user

# Internal package imports

NEW_FARM_DATA = dict(
    name='New Farm',
)

@pytest.mark.usefixtures('user')
class TestFarmResource:

    def test_login_create_farm(self, api_client, user):
        api_client.login_user()

        r = api_client.post(url_for('api.farms_resource', id=user.id), data=NEW_FARM_DATA)
        assert r.status_code == 201
        assert 'name' in r.json
        assert NEW_FARM_DATA['name'] in r.json['name']

    def test_login_create_farm_missing_name(self, api_client, user):
        api_client.login_user()
        data = NEW_FARM_DATA.copy()
        data['name'] = None
        r = api_client.post(url_for('api.farms_resource', id=user.id), data=data)
        assert r.status_code == 400
        assert 'name' in r.errors

    def test_login_get_farm(self, api_client, user, farm):
        api_client.login_user()

        r = api_client.get(url_for('api.farm_resource', id=user.id, farm_id=farm.id))
        assert r.status_code == 200
        #assert 'displayName' in r.json
        #assert user.username == r.json['displayName']

    def test_anonymous_get_farm(self, api_client, user, farm):

        r = api_client.get(url_for('api.farm_resource', id=user.id, farm_id=farm.id))
        assert r.status_code == 401

    def test_get_user_farms(self, api_client, user, farm_owner):
        api_client.login_user()
        print("Farm user: ", farm_owner.farmers)
        assert False