#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from flask import url_for
from flask_security import AnonymousUser, current_user

# Internal package imports
from backend.farm.models import Farm, Season

NEW_SEASON_DATA = {
    'title': 'New season 2020'
}


class TestSeasonResource:

    def test_create(self, api_client, farm_owner):
        api_client.login_as(farm_owner)
        farm = Farm.all()[0]

        r = api_client.post(url_for('api.seasons_resource', farm_id=farm.id), data=NEW_SEASON_DATA)
        assert r.status_code == 201
        assert 'id' in r.json
        assert 'title' in r.json

    def test_create_farm_not_found(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        r = api_client.post(url_for('api.seasons_resource', farm_id=999), data=NEW_SEASON_DATA)
        assert r.status_code == 404

    def test_archive(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        season = Season.all()[0]

        r = api_client.put(url_for('api.archive_season_resource', season_id=season.id))
        assert r.status_code == 200
        assert Season.get(season.id).archived_at != None


    def test_get(self, api_client, farm_owner):
        api_client.login_as(farm_owner)
        season = Season.all()[0]

        r = api_client.get(url_for('api.season_resource', season_id=season.id))
        assert r.status_code == 200
        assert 'id' in r.json
        assert 'title' in r.json


    def test_list_filter(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        # Get the field detail for that field
        farm = Farm.all()[0]

        # TODO: Add filtering options here.
        r = api_client.get(url_for('api.seasons_resource', farm_id=farm.id))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'title' in e

    def test_list(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        # Get the field detail for that field
        farm = Farm.all()[0]

        r = api_client.get(url_for('api.seasons_resource', farm_id=farm.id))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'title' in e

    def test_patch(self, api_client, farm_owner):
        api_client.login_as(farm_owner)
        season = Season.all()[0]
        new_name = "New Field Name"
        r = api_client.patch(url_for('api.season_resource', season_id=season.id), data=dict(title=new_name))

        assert r.status_code == 200
        assert r.json['title'] == new_name
        assert 'id' in r.json

    def test_put(self, api_client, farm_owner):
        api_client.login_as(farm_owner)
        season = Season.all()[0]
        # Get the field detail for that field

        data = NEW_SEASON_DATA.copy()
        data['title'] = "New Field Name"
        r = api_client.put(url_for('api.season_resource', season_id=season.id), data=data)

        assert r.status_code == 200
        assert r.json['title'] == data['title']
        assert 'id' in r.json

    @pytest.mark.skip(reason="Database cascades not be reworked, because related objects are not deleted.")
    def test_delete(self, api_client, farm_owner):
        api_client.login_as(farm_owner)
        season = Season.all()[0]
        r = api_client.delete(url_for('api.season_resource', season_id=season.id))

        assert r.status_code == 204
        assert not Season.get(season.id)

    def test_invalid_patch(self, api_client, farm_owner):
        api_client.login_as(farm_owner)
        season = Season.all()[0]

        new_id = 999
        r = api_client.patch(url_for('api.season_resource', season_id=season.id), data=dict(id=new_id))
        assert r.status_code == 400


#@pytest.mark.parametrize("models", ['Field(FIELD_FIELD_TWO, FIELD_FIELD_THREE)'], indirect=True)
@pytest.mark.skip(reason="Protected resource is not implemented yet.")
class TestSeasonResourceProtected:

    @pytest.mark.skip(reason="Test skipped because POST-ing Production resource is no longer prohibited.")
    def test_create(self, api_client, farm_user1, farm_user2, models):
        # User 1
        api_client.login_as(farm_user1)
        # Get the field detail for that field
        field_detail = get_field_detail(farm_user1, models.FIELD_FIELD_TWO)

        # Get the new filed data
        data = get_production_data()

        r = api_client.post(url_for('api.productions_resource', field_detail_id=field_detail.id), data=data)
        assert r.status_code == 201
        api_client.logout()

        # User 2
        api_client.login_as(farm_user2)

        # Try to create object in other user's protected resource
        r = api_client.post(url_for('api.productions_resource', field_detail_id=field_detail.id), data=data)
        assert r.status_code == 403

    def test_list(self, api_client, farm_user1, farm_user2, models):
        # User 1
        api_client.login_as(farm_user1)
        field_detail1 = get_field_detail(farm_user1, models.FIELD_FIELD_TWO)
        _ = assign_productions(farm_user1, field_detail1)

        user1_resp = api_client.get(url_for('api.productions_resource', field_detail_id=field_detail1.id))
        assert user1_resp.status_code == 200
        assert len(user1_resp.json)

        api_client.logout()
        # User 2
        api_client.login_as(farm_user2)
        # Get neccesry data from User 2
        field_detail2 = get_field_detail(farm_user2, models.FIELD_FIELD_THREE)
        _ = assign_productions(farm_user2, field_detail2)

        user2_resp = api_client.get(url_for('api.productions_resource', field_detail_id=field_detail2.id))
        assert user2_resp.status_code == 200
        assert len(user2_resp.json)

        # Make sure they don't see each other's farm
        for data1 in user1_resp.json:
            for data2 in user2_resp.json:
                # Compareing ID is enough, because of laziness probably the other fields are similar
                assert data1['id'] != data2['id']

    def test_get(self, api_client, farm_user1, farm_user2, models):
        # User 2
        api_client.login_as(farm_user2)

        field_detail = get_field_detail(farm_user1, models.FIELD_FIELD_TWO)
        production = get_production(farm_user1, field_detail)

        r = api_client.get(url_for('api.production_resource', production_id=production.id))
        assert r.status_code == 403

    def test_patch(self, api_client, farm_user1, farm_user2, models):
        # User 2
        api_client.login_as(farm_user2)

        # Get neccesry data from User 1
        field_detail = get_field_detail(farm_user1, models.FIELD_FIELD_TWO)
        production = get_production(farm_user1, field_detail)

        new_name = "New Field Name"
        r = api_client.patch(url_for('api.production_resource', production_id=production.id), data=dict(title=new_name))
        assert r.status_code == 403

    def test_put(self, api_client, farm_user1, farm_user2, models):
        # User 2
        api_client.login_as(farm_user2)

        # Get neccesry data from User 1
        field_detail = get_field_detail(farm_user1, models.FIELD_FIELD_TWO)
        production = get_production(farm_user1, field_detail)

        data = get_production_data().copy()
        data['title'] = "New Field Name"
        r = api_client.put(url_for('api.production_resource', production_id=production.id), data=data)
        assert r.status_code == 403

    def test_delete(self, api_client, farm_user1, farm_user2, models):
        # User 2
        api_client.login_as(farm_user2)

        # Get neccesry data from User 1
        field_detail = get_field_detail(farm_user1, models.FIELD_FIELD_TWO)
        production = get_production(farm_user1, field_detail)

        r = api_client.delete(url_for('api.production_resource', production_id=production.id))
        assert r.status_code == 403