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

def get_field_and_soil(user):
    from backend.field.models import Field, SoilType
    # Query one of the user's farm
    field = Field.all()[0]
    # Add the field as owner to the user
    user.resources.append(field)
    # Add the soil type ID
    soil = SoilType.all()[0]
    return field, soil

@pytest.mark.usefixtures('user')
class TestFieldDetailResource:

    def test_create(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        # Get neccesry data
        field, soil = get_field_and_soil(farm_owner)

        data = NEW_FIELD_DETAIL_DATA.copy()
        data['soilTypeId'] = soil.id

        r = api_client.post(url_for('api.field_details_resource', field_id=field.id), data=data)
        assert r.status_code == 201
        assert 'value' in r.json
        assert 'area' in r.json
        assert 'shape' in r.json
        assert 'soil' in r.json
        assert NEW_FIELD_DETAIL_DATA['value'] == r.json['value']
        assert NEW_FIELD_DETAIL_DATA['area'] == r.json['area']
        assert soil.title == r.json['soil']['title']


    def test_create_missing_shape(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        # Get neccesry data
        field, soil = get_field_and_soil(farm_owner)

        data = NEW_FIELD_DETAIL_DATA.copy()
        data['soilTypeId'] = soil.id
        data['shape'] = None

        r = api_client.post(url_for('api.field_details_resource', field_id=field.id), data=data)
        assert r.status_code == 400
        assert 'shape' in r.errors


    def test_get(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        # Get neccesry data
        field, _ = get_field_and_soil(farm_owner)
        field_detail = field.field_details[0]

        r = api_client.get(url_for('api.field_detail_resource', field_detail_id=field_detail.id))
        assert r.status_code == 200
        assert 'id' in r.json
        assert 'value' in r.json
        assert 'area' in r.json
        assert 'soil' in r.json

    def test_list(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        # Get neccesry data
        field, _ = get_field_and_soil(farm_owner)

        r = api_client.get(url_for('api.field_details_resource', field_id=field.id))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'value' in e
            assert 'area' in e
            assert 'soil' in e

    def test_patch(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        # Get neccesry data
        field, soil = get_field_and_soil(farm_owner)
        field_detail = field.field_details[0]

        new_soil = soil.id
        r = api_client.patch(url_for('api.field_detail_resource', field_detail_id=field_detail.id), data=dict(soilTypeId=new_soil))

        assert r.status_code == 200
        assert r.json['soil']['title'] == soil.title
        assert 'id' in r.json

    def test_put(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        # Get neccesry data
        field, soil = get_field_and_soil(farm_owner)
        field_detail = field.field_details[0]

        data = NEW_FIELD_DETAIL_DATA.copy()
        data['value'] = 2.0
        data['area'] = 11.6
        data['soilTypeId'] = soil.id
        r = api_client.put(url_for('api.field_detail_resource', field_detail_id=field_detail.id), data=data)

        assert r.status_code == 200
        assert r.json['value'] == pytest.approx(data['value'])
        assert r.json['area'] == pytest.approx(data['area'])
        assert r.json['soil']['title'] == soil.title
        assert 'id' in r.json

    def test_delete(self, api_client, farm_owner):
        from backend.field.models import FieldDetail
        api_client.login_as(farm_owner)

        # Get neccesry data
        field, soil = get_field_and_soil(farm_owner)
        field_detail = field.field_details[0]

        r = api_client.delete(url_for('api.field_detail_resource', field_detail_id=field_detail.id))

        assert r.status_code == 204
        assert not FieldDetail.get(field_detail.id)


    def test_invalid_patch(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        # Get neccesry data
        field, _ = get_field_and_soil(farm_owner)
        field_detail = field.field_details[0]

        r = api_client.patch(url_for('api.field_detail_resource', field_detail_id=field_detail.id), data=dict(soilTypeId=999))
        assert r.status_code == 400


    def test_anonymous_list(self, api_client, farm_owner):
        # Get neccesry data
        field, _ = get_field_and_soil(farm_owner)

        r = api_client.get(url_for('api.field_details_resource', field_id=field.id))
        assert r.status_code == 401


class TestFieldDetailResourceProtected:

    def test_create(self, api_client, farm_user1, farm_user2):
        # User 1
        api_client.login_as(farm_user1)
        field, soil = get_field_and_soil(farm_user1)

        data = NEW_FIELD_DETAIL_DATA.copy()
        data['soilTypeId'] = soil.id

        r = api_client.post(url_for('api.field_details_resource', field_id=field.id), data=data)
        assert r.status_code == 201
        api_client.logout()

        # User 2
        api_client.login_as(farm_user2)

        # Try to create object in other user's protected resource
        r = api_client.post(url_for('api.field_details_resource', field_id=field.id), data=data)
        assert r.status_code == 403

    def test_list(self, api_client, farm_user1, farm_user2):
        from backend.database import db
        from sqlalchemy.orm import with_polymorphic
        from backend.field.models import Field
        from backend.security.models import Resource
        # User 1
        api_client.login_as(farm_user1)

        # Get neccesry data from User 1
        field_name = with_polymorphic(Resource, Field, flat=True)
        field1 = db.session.query(field_name).filter(field_name.owner_user_id == farm_user1.id).all()[0]
        assert False

        user1_resp = api_client.get(url_for('api.field_details_resource', field_id=field1.id))
        assert user1_resp.status_code == 200
        assert len(user1_resp.json)

        api_client.logout()
        # User 2
        api_client.login_as(farm_user2)
        # Get neccesry data from User 2

        field2, _ = get_field_and_soil(farm_user2)

        user2_resp = api_client.get(url_for('api.field_details_resource', field_id=field2.id))
        assert user2_resp.status_code == 200
        assert len(user2_resp.json)

        # Make sure they don't see each other's farm
        for data1 in user1_resp.json:
            for data2 in user2_resp.json:
                # Compareing ID is enough, because of laziness probably the other fields are similar
                assert data1['id'] != data2['id']

    """
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