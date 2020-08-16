#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from flask import url_for
from flask_security import AnonymousUser, current_user

# Internal package imports


TASK_GENERAL_1 = {
    'title': 'task general',
    'taskType': 'TaskGeneral',
    'description': 'some text',
    'dates': {
        'startDate': '2020-07-21T20:00:00',
        'endDate': '2020-07-22T20:00:00',
    },
    'predictedCost': 1,
    'actualCost': 2,
}

TASK_PRUNING_1 = {
    'title': 'task general',
    'taskType': 'TaskPruning',
    'description': 'some text',
    'dates': {
        'startDate': '2020-07-21T20:00:00',
        'endDate': '2020-07-22T20:00:00',
    },
    'predictedCost': 1,
    'actualCost': 2,
}

VALID_INPUT_DATA = [
    TASK_GENERAL_1, TASK_PRUNING_1
]


NEW_PRODUCTION_DATA = {
    'title': 'Production 1',
    'useAsTemplate': True,
    'cropTemplateId': 1,
    'tasks': VALID_INPUT_DATA,
}

def get_production_data():
    from backend.crop.models import CropTemplate
    data = NEW_PRODUCTION_DATA.copy()
    data['cropTemplateId'] = CropTemplate.all()[0].id
    return data


def get_field_details(user, field):
    user.resources.append(field)
    return field.field_details

def get_field_detail(user, field):
    return get_field_details(user, field)[0]

def get_production(user, field_detail):
    production = field_detail.productions[0]
    user.resources.append(production)
    return production

def assign_productions(user, field_detail):
    def assign(field_detail):
        ret = []
        for production in field_detail.productions:
            if 'owner' in production.title:
                user.resources.append(production)
                ret.append(production)
        return ret

    if isinstance(field_detail, (list, tuple)):
        ret = []
        for f in field_detail:
            ret.extend(assign(f))
        return ret
    else:
        return assign((field_detail))

@pytest.mark.parametrize("models", ['Field(FIELD_FIELD_ONE)'], indirect=True)
class TestProductionResource:

    def test_create(self, api_client, farm_owner, models):
        api_client.login_as(farm_owner)

        # Get the field detail for that field
        field_detail = get_field_detail(farm_owner, models.FIELD_FIELD_ONE)

        # Get the new filed data
        data = get_production_data()

        r = api_client.post(url_for('api.productions_resource'), data=data)
        #r = api_client.post(url_for('api.productions_resource', field_detail_id=field_detail.id), data=data)
        assert r.status_code == 201
        assert 'id' in r.json
        assert 'title' in r.json
        assert 'cropTemplateId' in r.json
        assert data['title'] == r.json['title']
        assert data['cropTemplateId'] == r.json['cropTemplateId']
        assert 'tasks' in r.json

    def test_assign(self, api_client, farm_owner, models):
        from backend.field.models import FieldDetail
        from backend.production.models import Production
        api_client.login_as(farm_owner)

        # Get the field detail for that field
        field_detail = get_field_detail(farm_owner, models.FIELD_FIELD_ONE)

        # Get the new filed data
        data = get_production_data()

        r = api_client.post(url_for('api.productions_resource'), data=data)
        field_detail = FieldDetail.get(field_detail.id)
        production = Production.get(r.json['id'])
        assert production not in field_detail.productions
        #r = api_client.post(url_for('api.productions_resource', field_detail_id=field_detail.id), data=data)
        assert r.status_code == 201
        production_id = r.json['id']
        # Assign resource
        r = api_client.put(url_for('api.assign_productions_resource', field_detail_id=field_detail.id, production_id=production_id))
        assert r.status_code == 200
        field_detail = FieldDetail.get(field_detail.id)
        production = Production.get(r.json['id'])
        assert production in field_detail.productions


    def test_create_missing_crop_template_id(self, api_client, farm_owner, models):
        api_client.login_as(farm_owner)

        # Get the field detail for that field
        field_detail = get_field_detail(farm_owner, models.FIELD_FIELD_ONE)

        # Get the new filed data
        data = get_production_data()
        data['cropTemplateId'] = None

        r = api_client.post(url_for('api.productions_resource', field_detail_id=field_detail.id), data=data)
        assert r.status_code == 400
        assert 'cropTemplateId' in r.errors

    def test_get(self, api_client, farm_owner, models):
        api_client.login_as(farm_owner)

        # Get the field detail for that field
        field_detail = get_field_detail(farm_owner, models.FIELD_FIELD_ONE)
        production = get_production(farm_owner, field_detail)

        r = api_client.get(url_for('api.production_resource', production_id=production.id))
        assert r.status_code == 200
        assert 'id' in r.json
        assert 'title' in r.json
        assert 'cropTemplateId' in r.json
        assert 'tasks' in r.json

    def test_list_filter(self, api_client, farm_owner, models):
        api_client.login_as(farm_owner)

        # Get the field detail for that field
        field_detail = get_field_details(farm_owner, models.FIELD_FIELD_ONE)[0]
        _ = assign_productions(farm_owner, field_detail)

        r = api_client.get(url_for('api.productions_resource', field_detail_id=field_detail.id))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'title' in e
            assert 'cropTemplateId' in e
            assert 'useAsTemplate' in e

    def test_list(self, api_client, farm_owner, models):
        api_client.login_as(farm_owner)

        # Get the field detail for that field
        field_detail = get_field_details(farm_owner, models.FIELD_FIELD_ONE)
        assign_productions(farm_owner, field_detail)

        r = api_client.get(url_for('api.productions_resource'))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'title' in e
            assert 'cropTemplateId' in e
            assert 'useAsTemplate' in e
            assert 'fieldDetails' in e
            for i in e['fieldDetails']:
                assert 'field' in i

    def test_patch(self, api_client, farm_owner, models):
        api_client.login_as(farm_owner)

        # Get the field detail for that field
        field_detail = get_field_detail(farm_owner, models.FIELD_FIELD_ONE)
        production = get_production(farm_owner, field_detail)

        new_name = "New Field Name"
        r = api_client.patch(url_for('api.production_resource', production_id=production.id), data=dict(title=new_name))

        assert r.status_code == 200
        assert r.json['title'] == new_name
        assert 'id' in r.json

    def test_put(self, api_client, farm_owner, models):
        api_client.login_as(farm_owner)

        # Get the field detail for that field
        field_detail = get_field_detail(farm_owner, models.FIELD_FIELD_ONE)
        production = get_production(farm_owner, field_detail)

        data = get_production_data().copy()
        data['title'] = "New Field Name"
        r = api_client.put(url_for('api.production_resource', production_id=production.id), data=data)

        assert r.status_code == 200
        assert r.json['title'] == data['title']
        assert 'id' in r.json

    def test_delete(self, api_client, farm_owner, models):
        from backend.production.models import Production
        api_client.login_as(farm_owner)

        # Get the field detail for that field
        field_detail = get_field_detail(farm_owner, models.FIELD_FIELD_ONE)
        production = get_production(farm_owner, field_detail)

        r = api_client.delete(url_for('api.production_resource', production_id=production.id))

        assert r.status_code == 204
        assert not Production.get(production.id)

    def test_remove(self, api_client, farm_owner, models):
        from backend.production.models import Production
        from backend.field.models import FieldDetail
        api_client.login_as(farm_owner)

        # Get the field detail for that field
        field_detail = get_field_detail(farm_owner, models.FIELD_FIELD_ONE)
        production = get_production(farm_owner, field_detail)

        r = api_client.delete(url_for('api.assign_productions_resource', field_detail_id=field_detail.id, production_id=production.id))
        assert r.status_code == 204
        production = Production.get(production.id)
        assert production

        field_detail = FieldDetail.get(field_detail.id)
        production = Production.get(production.id)
        assert production not in field_detail.productions


    def test_invalid_patch(self, api_client, farm_owner, models):
        api_client.login_as(farm_owner)

        # Get the field detail for that field
        field_detail = get_field_detail(farm_owner, models.FIELD_FIELD_ONE)
        production = get_production(farm_owner, field_detail)

        new_id = 999
        r = api_client.patch(url_for('api.production_resource', production_id=production.id), data=dict(id=new_id))

        assert r.status_code == 400


@pytest.mark.parametrize("models", ['Field(FIELD_FIELD_TWO, FIELD_FIELD_THREE)'], indirect=True)
class TestProductionResourceProtected:

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