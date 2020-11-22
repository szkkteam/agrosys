#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from flask import url_for
from flask_security import AnonymousUser, current_user

# Internal package imports
from backend.farm.models import Farm, Season
from .. import get_input_data

NEW_SEASON_DATA = {
    'title': 'New season 2020',
    'dates': {
        'startDate': '2020-01-21T20:00:00',
        'endDate': '2020-12-22T20:00:00',
    },
}

VALID_GEOJSON = {"type": "Feature",
                 "properties": {},
                 "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[17.71719217300415,47.12809671910988],[17.721483707427975,47.1230306334327],[17.725925445556637, 47.12485564784686
                        ],[17.723522186279297,47.12732296778955],[17.721827030181885,47.12662220216394],[17.71946668624878,47.12919163099024],
                        [17.71719217300415,47.12809671910988]]]
                  }
    }

LONG_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "


AGRICULTURAL_PARCEL = {
    'title': 'Agri parcel field 1',
    'notes': LONG_TEXT,
    'geometry': VALID_GEOJSON,
    'totalArea': 2.0,
    'referenceParcelType': 'AgriculturalParcel',
}

PHYSICAL_BLOCK = {
    'title': 'Physical block field 1',
    'notes': LONG_TEXT,
    'geometry': VALID_GEOJSON,
    'totalArea': 2.0,
    'referenceParcelType': 'PhysicalBlock',
    'eligibleArea': 1.5,
    'agriculturalTypeId': lambda v,t: t.id,
    'soilTypeId': lambda v,t: v.id
}


class TestSeasonResource:

    def test_create(self, api_client, farm_owner):
        api_client.login_as(farm_owner)
        farm = Farm.all()[0]

        r = api_client.post(url_for('api.seasons_resource', farm_id=farm.id), data=NEW_SEASON_DATA)
        assert r.status_code == 201
        assert 'id' in r.json
        assert 'title' in r.json
        assert 'dates' in r.json

    def test_create_farm_not_found(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        r = api_client.post(url_for('api.seasons_resource', farm_id=999), data=NEW_SEASON_DATA)
        assert r.status_code == 404

    def test_get(self, api_client, farm_owner):
        api_client.login_as(farm_owner)
        season = Season.all()[0]

        r = api_client.get(url_for('api.season_resource', season_id=season.id))
        assert r.status_code == 200
        assert 'id' in r.json
        assert 'title' in r.json
        assert 'dates' in r.json
        assert 'parcels' in r.json

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
            assert 'dates' in e
            assert 'parcels' in e

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
            assert 'dates' in e
            assert 'parcels' in e

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
        assert 'dates' in r.json

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


class TestSeasonCloneResource:

    def test_create(self, api_client, farm_owner, soil, agri_type):
        from backend.farm.models import ReferenceParcel
        api_client.login_as(farm_owner)
        farm = Farm.all()[0]
        data = NEW_SEASON_DATA.copy()

        ag_parcel = AGRICULTURAL_PARCEL.copy()
        ag_parcel['ancestorId'] = ReferenceParcel.filter_by(parcel_type='AgriculturalParcel').all()[0].id

        p_block = get_input_data(PHYSICAL_BLOCK, soil, agri_type)
        p_block['parcels'] = [ag_parcel]
        p_block['ancestorId'] = ReferenceParcel.filter_by(parcel_type='PhysicalBlock').all()[0].id
        data['parcels'] = [p_block]

        r = api_client.post(url_for('api.seasons_resource', farm_id=farm.id), data=data)
        assert r.status_code == 201
        assert 'id' in r.json
        assert 'title' in r.json
        assert 'dates' in r.json
        assert 'parcels' in r.json
        assert len(r.json['parcels'])
        for parcel in r.json['parcels']:
            assert 'parcels' in parcel
            assert len(parcel['parcels'])


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