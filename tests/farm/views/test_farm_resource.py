#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from flask import url_for

# Internal package imports
from backend.farm.models import Farm

NEW_FARM_DATA = dict(
    title='New Farm',
)

@pytest.mark.usefixtures('user')
class TestFarmResource:

    def test_create(self, api_client, user, country_hu):
        api_client.login_user()

        data = NEW_FARM_DATA.copy()
        data['countryId'] = country_hu.id

        r = api_client.post(url_for('api.farms_resource'), data=data)
        print("Response: ", r.json)
        assert r.status_code == 201
        assert 'title' in r.json
        assert NEW_FARM_DATA['title'] in r.json['title']
        assert 'country' in r.json

    def test_create_missing_name(self, api_client, user):
        api_client.login_user()
        data = NEW_FARM_DATA.copy()
        data['title'] = None
        r = api_client.post(url_for('api.farms_resource'), data=data)
        assert r.status_code == 400
        assert 'title' in r.errors

    def test_create_missing_country_id(self, api_client, user):
        api_client.login_user()
        data = NEW_FARM_DATA.copy()

        r = api_client.post(url_for('api.farms_resource'), data=data)
        assert r.status_code == 400
        assert 'countryId' in r.errors

    def test_get(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        # Query one of the user's farm
        farm = Farm.all()[0]

        r = api_client.get(url_for('api.farm_resource', farm_id=farm.id))
        assert r.status_code == 200
        assert 'id' in r.json
        assert 'title' in r.json
        assert 'role' in r.json
        assert 'country' in r.json
        assert 'isOwner' in r.json['role']

    def test_list(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        r = api_client.get(url_for('api.farms_resource'))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'title' in e
            assert 'role' in e
            assert 'country' in e
            assert 'isOwner' in e['role']

    def test_patch(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        # Query one of the user's farm
        farm = Farm.all()[0]

        new_name = "New Farm Name"
        r = api_client.patch(url_for('api.farm_resource', farm_id=farm.id), data=dict(title=new_name))

        assert r.status_code == 200
        assert r.json['title'] == new_name
        assert 'id' in r.json

    def test_put(self, api_client, farm_owner, country_hu):
        api_client.login_as(farm_owner)

        data = NEW_FARM_DATA.copy()
        data['countryId'] = country_hu.id
        data['title'] = "New Farm Name"
        # Query one of the user's farm
        farm = Farm.all()[0]

        r = api_client.put(url_for('api.farm_resource', farm_id=farm.id), data=data)

        assert r.status_code == 200
        assert r.json['title'] == "New Farm Name"
        assert 'id' in r.json

    def test_delete(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        # Query one of the user's farm
        farm = Farm.all()[0]

        r = api_client.delete(url_for('api.farm_resource', farm_id=farm.id))

        assert r.status_code == 204
        assert not Farm.get(farm.id)

    def test_patch_invalid(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        # Query one of the user's farm
        farm = Farm.all()[0]

        new_id = 999
        r = api_client.patch(url_for('api.farm_resource', farm_id=farm.id), data=dict(id=new_id))

        assert r.status_code == 400


    def test_anonymous_get_farm(self, api_client, user):
        r = api_client.get(url_for('api.farms_resource'))
        assert r.status_code == 401

class TestFarmResourceProtected:


    def test_get(self, api_client, farm_user1, farm_user2):
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

    def test_get(self, api_client, farm_user1, farm_user2):
        from backend.permissions.services import UserService

        # Because there is no shared farms, for this test this query is sufficient
        farms = UserService.resources_with_possible_perms(farm_user1, resource_types='farm')
        farms = [i.resource for i in farms]

        # User 2
        api_client.login_as(farm_user2)
        for farm in farms:
            r = api_client.get(url_for('api.farm_resource', farm_id=farm.id))
            assert r.status_code == 403


    def test_patch(self, api_client, farm_user1, farm_user2):
        from backend.permissions.services import UserService

        # Because there is no shared farms, for this test this query is sufficient
        farms = UserService.resources_with_possible_perms(farm_user1, resource_types='farm')
        farms = [i.resource for i in farms]

        # User 2
        api_client.login_as(farm_user2)
        for farm in farms:
            new_name = "New Farm Name"
            r = api_client.patch(url_for('api.farm_resource', farm_id=farm.id), data=dict(title=new_name))
            assert r.status_code == 403

    def test_put(self, api_client, farm_user1, farm_user2, country_hu):
        from backend.permissions.services import UserService

        # Because there is no shared farms, for this test this query is sufficient
        farms = UserService.resources_with_possible_perms(farm_user1, resource_types='farm')
        farms = [i.resource for i in farms]

        # User 2
        api_client.login_as(farm_user2)
        for farm in farms:
            data = NEW_FARM_DATA.copy()
            data['countryId'] = country_hu.id
            data['title'] = "New Farm Name"
            r = api_client.put(url_for('api.farm_resource', farm_id=farm.id), data=data)
            assert r.status_code == 403

    def test_delete(self, api_client, farm_user1, farm_user2):
        from backend.permissions.services import UserService

        # Because there is no shared farms, for this test this query is sufficient
        farms = UserService.resources_with_possible_perms(farm_user1, resource_types='farm')
        farms = [i.resource for i in farms]

        # User 2
        api_client.login_as(farm_user2)
        for farm in farms:
            r = api_client.delete(url_for('api.farm_resource', farm_id=farm.id))
            assert r.status_code == 403
