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

    def test_create_farm(self, api_client, user):
        api_client.login_user()

        r = api_client.post(url_for('api.farms_resource'), data=NEW_FARM_DATA)
        print("Response: ", r.json)
        assert r.status_code == 201
        assert 'name' in r.json
        assert NEW_FARM_DATA['name'] in r.json['name']

    def test_create_farm_missing_name(self, api_client, user):
        api_client.login_user()
        data = NEW_FARM_DATA.copy()
        data['name'] = None
        r = api_client.post(url_for('api.farms_resource'), data=data)
        assert r.status_code == 400
        assert 'name' in r.errors

    def test_get_farm(self, api_client, farm_owner):
        from backend.farm_management.models import Farm
        api_client.login_as(farm_owner)

        # Query one of the user's farm
        farm = Farm.all()[0]

        r = api_client.get(url_for('api.farm_resource', farm_id=farm.id))
        assert r.status_code == 200
        assert 'id' in r.json
        assert 'name' in r.json
        assert 'seasons' in r.json
        assert len(r.json['seasons'])
        assert 'role' in r.json
        assert 'isOwner' in r.json['role']

    def test_get_farms(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        r = api_client.get(url_for('api.farms_resource'))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'name' in e
            assert 'seasons' in e
            assert len(e['seasons'])
            assert 'role' in e
            assert 'isOwner' in e['role']

    def test_patch_farm(self, api_client, farm_owner):
        from backend.farm_management.models import Farm
        api_client.login_as(farm_owner)

        # Query one of the user's farm
        farm = Farm.all()[0]

        new_name = "New Farm Name"
        r = api_client.patch(url_for('api.farm_resource', farm_id=farm.id), data=dict(name=new_name))

        assert r.status_code == 200
        assert r.json['name'] == new_name
        assert 'id' in r.json

    def test_invalid_patch_farm(self, api_client, farm_owner):
        from backend.farm_management.models import Farm
        api_client.login_as(farm_owner)

        # Query one of the user's farm
        farm = Farm.all()[0]

        new_id = 999
        new_field = None
        r = api_client.patch(url_for('api.farm_resource', farm_id=farm.id), data=dict(id=new_id, fields=new_field))

        assert r.status_code == 400

    def test_anonymous_get_farm(self, api_client, user):
        r = api_client.get(url_for('api.farms_resource'))
        assert r.status_code == 401

class TestFarmResourceProtectedResource:


    def test_get_farms(self, api_client, farm_user1, farm_user2):
        # User 1
        api_client.login_as(farm_user1)
        user1_resp = api_client.get(url_for('api.farms_resource'))
        assert user1_resp.status_code == 200
        assert len(user1_resp.json)

        api_client.logout()
        # User 2
        api_client.login_as(farm_user2)
        user2_resp = api_client.get(url_for('api.farms_resource'))
        assert user2_resp.status_code == 200
        assert len(user2_resp.json)

        # Make sure they don't see each other's farm
        for data1 in user1_resp.json:
            for data2 in user2_resp.json:
                assert data1['id'] != data2['id']

    def test_get_farm(self, api_client, farm_user1, farm_user2):
        # User 1
        api_client.login_as(farm_user1)
        user1_resp = api_client.get(url_for('api.farms_resource'))
        api_client.logout()

        user1_farm_ids = [ farm['id'] for farm in user1_resp.json ]

        api_client.login_as(farm_user2)
        for id in user1_farm_ids:
            r = api_client.get(url_for('api.farms_resource', farm_id=id))
            assert r.status_code == 401


    def test_patch_others_farm(self, api_client, farm_mix):
        from backend.farm_management.models import Farm, UserFarm
        api_client.login_as(farm_mix)

        # Query one of the user's farm
        farm = Farm.join(UserFarm).filter(UserFarm.user_id == farm_mix.id).first()

        new_name = "New Farm Name"
        r = api_client.patch(url_for('api.farm_resource', farm_id=farm.id), data=dict(name=new_name))

        assert r.status_code == 200
        assert r.json['name'] == new_name
        assert 'id' in r.json
