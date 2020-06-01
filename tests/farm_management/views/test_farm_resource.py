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

    def test_get_user_farms(self, api_client, farm_mix):
        from backend.farm_management.models import Farm
        api_client.login_as(farm_mix)

        r = api_client.get(url_for('api.farms_resource', id=farm_mix.id))
        assert r.status_code == 200
        assert len(r.json)
        for farm in r.json:
            assert 'name' in farm
            assert 'owner' in farm
            assert 'url' in farm
            assert 'id' in farm

    def test_login_get_farm(self, api_client, farm_owner):
        from backend.farm_management.models import Field
        api_client.login_as(farm_owner)

        # Get the list of farms
        r = api_client.get(url_for('api.farms_resource', id=farm_owner.id))
        print(r.json)
        for farm in r.json:
            r = api_client.get(farm['url'])

            assert r.status_code == 200
            assert 'name' in r.json
            assert 'fields' in r.json
            #field_list = Field.filter_by(id=r.json['id']).all()
            for r_field in r.json['fields']:
                assert 'name' in r_field
                assert 'shape' in r_field

    def test_anonymous_get_farm(self, api_client, user, farm):
        r = api_client.get(url_for('api.farm_resource', id=user.id, farm_id=farm.id))
        assert r.status_code == 401




    #def test_patch_farms(self, api_client, farm_owner):
