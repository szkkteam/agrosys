#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from flask import url_for
from flask_security import AnonymousUser, current_user

# Internal package imports

VALID_GEOJSON = {"type": "Feature",
                 "properties": {},
                 "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [17.71719217300415,47.12809671910988],[17.721483707427975,47.1230306334327],[17.725925445556637, 47.12485564784686],
                            [17.723522186279297,47.12732296778955],[17.721827030181885,47.12662220216394],[17.71946668624878,47.12919163099024],
                            [17.71719217300415,47.12809671910988]
                        ]
                    ],
                    #"crs":{"type":"name","properties":{"name":"EPSG:4326"}}
                  }
    }

INVALID_GEOJSON = {"type": None,
                 "properties": {},
                 "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [17.71719217300415,47.12809671910988],[17.721483707427975,47.1230306334327],[17.725925445556637, 47.12485564784686],
                            [17.723522186279297,47.12732296778955],[17.721827030181885,47.12662220216394],[17.71946668624878,47.12919163099024],
                            [17.71719217300415,47.12809671910988]
                        ]
                    ],
                    #"crs":{"type":"name","properties":{"name":"EPSG:4326"}}
                  }
    }

NEW_FIELD_DETAIL_DATA = {
    'value': 0.0,
    'area': 1.2,
    'shape': VALID_GEOJSON,
    'soilTypeId': 1,
}

@pytest.mark.usefixtures('user')
class TestFieldDetailResource:

    def test_create(self, api_client, farm_owner):
        from backend.field.models import Field, SoilType
        api_client.login_as(farm_owner)

        # Query one of the user's farm
        field = Field.all()[0]
        # Add the field as owner to the user
        farm_owner.resources.append(field)
        # Add the soil type ID
        soil = SoilType.all()[0]

        data = NEW_FIELD_DETAIL_DATA.copy()
        data['soilTypeId'] = soil.id

        r = api_client.post(url_for('api.field_details_resource', field_id=field.id), data=NEW_FIELD_DETAIL_DATA)
        assert r.status_code == 201
        assert 'value' in r.json
        assert 'area' in r.json
        assert 'shape' in r.json
        assert 'soil' in r.json
        assert NEW_FIELD_DETAIL_DATA['value'] == r.json['value']
        assert NEW_FIELD_DETAIL_DATA['area'] == r.json['area']
        assert soil.title == r.json['soil']['title']

    """
    def test_create_field_missing_name(self, api_client, field_owner):
        from backend.farm_management.models import Farm
        api_client.login_as(field_owner)

        # Query one of the user's farm
        farm = Farm.all()[0]

        data = NEW_FIELD_DATA.copy()
        data['title'] = None
        r = api_client.post(url_for('api.fields_resource', farm_id=farm.id), data=data)
        assert r.status_code == 400
        assert 'title' in r.errors

    def test_get_field(self, api_client, field_owner):
        from backend.field.models import Field
        api_client.login_as(field_owner)

        # Query one of the user's farm
        field = Field.all()[0]

        r = api_client.get(url_for('api.field_resource', field_id=field.id))
        assert r.status_code == 200
        assert 'id' in r.json
        assert 'title' in r.json
        assert 'fields' in r.json

    def test_get_fields(self, api_client, field_owner):
        from backend.farm_management.models import Farm
        api_client.login_as(field_owner)

        # Query one of the user's farm
        farm = Farm.all()[0]

        r = api_client.get(url_for('api.fields_resource', farm_id=farm.id))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'title' in e
            assert 'fields' in e

    def test_patch_field(self, api_client, field_owner):
        from backend.field.models import Field
        api_client.login_as(field_owner)

        # Query one of the user's farm
        field = Field.all()[0]

        new_name = "New Field Name"
        r = api_client.patch(url_for('api.field_resource', field_id=field.id), data=dict(title=new_name))

        assert r.status_code == 200
        assert r.json['title'] == new_name
        assert 'id' in r.json

    def test_put_field(self, api_client, field_owner):
        from backend.field.models import Field
        api_client.login_as(field_owner)

        # Query one of the user's farm
        field = Field.all()[0]

        new_name = "New Field Name"
        r = api_client.put(url_for('api.field_resource', field_id=field.id), data=dict(title=new_name))

        assert r.status_code == 200
        assert r.json['title'] == new_name
        assert 'id' in r.json

    def test_delete_field(self, api_client, field_owner):
        from backend.field.models import Field
        api_client.login_as(field_owner)

        # Query one of the user's farm
        field = Field.all()[0]

        r = api_client.delete(url_for('api.field_resource', field_id=field.id))

        assert r.status_code == 204
        assert not Field.get(field.id)

    def test_invalid_patch_farm(self, api_client, farm_owner):
        from backend.field.models import Field
        api_client.login_as(field_owner)

        # Query one of the user's farm
        field = Field.all()[0]

        new_id = 999
        r = api_client.patch(url_for('api.field_resource', field_id=field.id), data=dict(id=new_id))

        assert r.status_code == 400


    def test_anonymous_get_farm(self, api_client, user):
        r = api_client.get(url_for('api.farms_resource'))
        assert r.status_code == 401

class TestFarmResourceProtected:


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
        from backend.permissions.services import UserService

        # Because there is no shared farms, for this test this query is sufficient
        farms = UserService.resources_with_possible_perms(farm_user1, resource_types='farm')
        farms = [i.resource for i in farms]

        # User 2
        api_client.login_as(farm_user2)
        for farm in farms:
            r = api_client.get(url_for('api.farm_resource', farm_id=farm.id))
            assert r.status_code == 403


    def test_patch_farm(self, api_client, farm_user1, farm_user2):
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

    def test_put_farm(self, api_client, farm_user1, farm_user2):
        from backend.permissions.services import UserService

        # Because there is no shared farms, for this test this query is sufficient
        farms = UserService.resources_with_possible_perms(farm_user1, resource_types='farm')
        farms = [i.resource for i in farms]

        # User 2
        api_client.login_as(farm_user2)
        for farm in farms:
            new_name = "New Farm Name"
            r = api_client.put(url_for('api.farm_resource', farm_id=farm.id), data=dict(title=new_name))
            assert r.status_code == 403

    def test_delete_farm(self, api_client, farm_user1, farm_user2):
        from backend.permissions.services import UserService

        # Because there is no shared farms, for this test this query is sufficient
        farms = UserService.resources_with_possible_perms(farm_user1, resource_types='farm')
        farms = [i.resource for i in farms]

        # User 2
        api_client.login_as(farm_user2)
        for farm in farms:
            r = api_client.delete(url_for('api.farm_resource', farm_id=farm.id))
            assert r.status_code == 403
    """