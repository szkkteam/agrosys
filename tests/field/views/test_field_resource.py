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


NEW_FIELD_DETAIL_DATA = {
    'value': 0.0,
    'area': 1.2,
    'shape': VALID_GEOJSON,
    'soilTypeId': 1,
}

NEW_FIELD_DATA = {
    'title': 'New Field',
    'fields': [
        NEW_FIELD_DETAIL_DATA,
    ],
}

def get_field_data(soil):
    data = NEW_FIELD_DATA.copy()
    field_details_data = NEW_FIELD_DETAIL_DATA.copy()
    field_details_data['soilTypeId'] = soil.id
    data['fields'] = [field_details_data]
    return data

def get_user_farm_field_soil(user):
    from backend.field.models import Field, SoilType
    from backend.permissions.services import UserService
    farm = UserService.resources_with_perms(user, ['edit', 'view', 'delete', 'create'],
                                             resource_types=['farm']).first()
    # TODO: Farm.fields is empty. Don't know why.
    field = Field.get_by(farm_id=farm.id)
    user.resources.append(field)
    # Add the soil type ID
    soil = SoilType.all()[0]

    return farm, field, soil


class TestFieldResource:

    def test_create(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        # Query one of the user's farm
        farm, field, soil = get_user_farm_field_soil(farm_owner)

        # Get the new filed data
        data = get_field_data(soil)

        r = api_client.post(url_for('api.fields_resource', farm_id=farm.id), data=data)
        assert r.status_code == 201
        assert 'title' in r.json
        assert 'fields' in r.json
        assert NEW_FIELD_DATA['title'] in r.json['title']
        for origi, resp in zip(data['fields'], r.json['fields']):
            assert origi['area'] == resp['area']
            assert origi['value'] == resp['value']
            assert 'soil' in resp
            assert 'id' in resp

    def test_create_missing_name(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        # Query one of the user's farm
        farm, field, soil = get_user_farm_field_soil(farm_owner)

        # Get the new filed data
        data = get_field_data(soil)
        data['title'] = None

        r = api_client.post(url_for('api.fields_resource', farm_id=farm.id), data=data)
        assert r.status_code == 400
        assert 'title' in r.errors

    def test_get(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        # Query one of the user's farm
        _, field, _ = get_user_farm_field_soil(farm_owner)

        r = api_client.get(url_for('api.field_resource', field_id=field.id))
        assert r.status_code == 200
        assert 'id' in r.json
        assert 'title' in r.json
        assert 'fields' in r.json
        assert len(r.json['fields'])

    def test_list(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        # Query one of the user's farm
        farm, _, _ = get_user_farm_field_soil(farm_owner)

        r = api_client.get(url_for('api.fields_resource', farm_id=farm.id))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'title' in e
            assert 'fields' in e
            assert len(e['fields']) == 1

    def test_patch(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        # Query one of the user's farm
        _, field, _ = get_user_farm_field_soil(farm_owner)

        new_name = "New Field Name"
        r = api_client.patch(url_for('api.field_resource', field_id=field.id), data=dict(title=new_name))

        assert r.status_code == 200
        assert r.json['title'] == new_name
        assert 'id' in r.json

    def test_put(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        # Query one of the user's farm
        _, field, _ = get_user_farm_field_soil(farm_owner)

        new_name = "New Field Name"
        r = api_client.put(url_for('api.field_resource', field_id=field.id), data=dict(title=new_name))

        assert r.status_code == 200
        assert r.json['title'] == new_name
        assert 'id' in r.json

    def test_delete(self, api_client, farm_owner):
        from backend.field.models import Field, FieldDetail
        api_client.login_as(farm_owner)

        # Query one of the user's farm
        _, field, _ = get_user_farm_field_soil(farm_owner)
        field_details_id = [ f.id for f in field.field_details ]

        r = api_client.delete(url_for('api.field_resource', field_id=field.id))

        assert r.status_code == 204
        assert not Field.get(field.id)
        for fd in field_details_id:
            assert not FieldDetail.get(fd)

    def test_invalid_patch(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        # Query one of the user's farm
        _, field, _ = get_user_farm_field_soil(farm_owner)

        new_id = 999
        r = api_client.patch(url_for('api.field_resource', field_id=field.id), data=dict(id=new_id))

        assert r.status_code == 400


class TestFieldResourceProtected:

    def test_create(self, api_client, farm_user1, farm_user2):
        # User 1
        api_client.login_as(farm_user1)
        farm, field, soil = get_user_farm_field_soil(farm_user1)

        # Get the new filed data
        data = get_field_data(soil)

        r = api_client.post(url_for('api.fields_resource', farm_id=farm.id), data=data)
        assert r.status_code == 201
        api_client.logout()

        # User 2
        api_client.login_as(farm_user2)

        # Try to create object in other user's protected resource
        r = api_client.post(url_for('api.fields_resource', farm_id=farm.id), data=data)
        assert r.status_code == 403

    def test_list(self, api_client, farm_user1, farm_user2):
        # User 1
        api_client.login_as(farm_user1)
        farm1, _, _ = get_user_farm_field_soil(farm_user1)

        user1_resp = api_client.get(url_for('api.fields_resource', farm_id=farm1.id))
        assert user1_resp.status_code == 200
        assert len(user1_resp.json)

        api_client.logout()
        # User 2
        api_client.login_as(farm_user2)
        # Get neccesry data from User 2
        farm2, _, _ = get_user_farm_field_soil(farm_user2)

        user2_resp = api_client.get(url_for('api.fields_resource', farm_id=farm2.id))
        assert user2_resp.status_code == 200
        assert len(user2_resp.json)

        # Make sure they don't see each other's farm
        for data1 in user1_resp.json:
            for data2 in user2_resp.json:
                # Compareing ID is enough, because of laziness probably the other fields are similar
                assert data1['id'] != data2['id']

    def test_get(self, api_client, farm_user1, farm_user2):
        # User 2
        api_client.login_as(farm_user2)

        # Get neccesry data from User 1
        farm, field, soil = get_user_farm_field_soil(farm_user1)

        r = api_client.get(url_for('api.field_resource', field_id=field.id))
        assert r.status_code == 403


    def test_patch(self, api_client, farm_user1, farm_user2):
        # User 2
        api_client.login_as(farm_user2)

        # Get neccesry data from User 1
        farm, field, soil = get_user_farm_field_soil(farm_user1)

        new_name = "New Field Name"
        r = api_client.patch(url_for('api.field_resource', field_id=field.id), data=dict(title=new_name))
        assert r.status_code == 403

    def test_put(self, api_client, farm_user1, farm_user2):
        # User 2
        api_client.login_as(farm_user2)

        # Get neccesry data from User 1
        farm, field, soil = get_user_farm_field_soil(farm_user1)

        new_name = "New Field Name"
        r = api_client.put(url_for('api.field_resource', field_id=field.id), data=dict(title=new_name))
        assert r.status_code == 403

    def test_delete(self, api_client, farm_user1, farm_user2):
        # User 2
        api_client.login_as(farm_user2)

        # Get neccesry data from User 1
        farm, field, soil = get_user_farm_field_soil(farm_user1)

        r = api_client.delete(url_for('api.field_resource', field_id=field.id))
        assert r.status_code == 403