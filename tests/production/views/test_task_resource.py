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
    'startDate': '2020-07-21T20:00:00',
    'endDate': '2020-07-22T20:00:00',
    'predictedCost': 1,
    'actualCost': 2,
}

TASK_PRUNING_1 = {
    'title': 'task general',
    'taskType': 'TaskPruning',
    'description': 'some text',
    'startDate': '2020-07-21T20:00:00',
    'endDate': '2020-07-22T20:00:00',
    'predictedCost': 1,
    'actualCost': 2,
}

VALID_INPUT_DATA = [
    TASK_GENERAL_1, TASK_PRUNING_1
]

def get_production(user, field):
    user.resources.append(field)
    production = field.field_details[0].productions[-1]
    user.resources.append(production)
    return production

def get_task(production):
    return production.tasks[0]

def assign_productions(user, field_detail):
    ret = []
    for production in field_detail.productions:
        user.resources.append(production)
        ret.append(production)
    return ret

@pytest.mark.parametrize("models", ['Field(FIELD_FIELD_ONE)'], indirect=True)
class TestTaskResource:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_create(self, api_client, farm_owner, models, input):
        api_client.login_as(farm_owner)

        # Get the field detail for that field
        production = get_production(farm_owner, models.FIELD_FIELD_ONE)

        r = api_client.post(url_for('api.tasks_resource', production_id=production.id), data=input)
        assert r.status_code == 201
        assert 'id' in r.json
        assert 'title' in r.json
        assert 'description' in r.json
        assert 'taskType' in r.json
        assert 'startDate' in r.json
        assert 'endDate' in r.json
        assert 'predictedCost' in r.json
        assert 'actualCost' in r.json
        assert input['title'] == r.json['title']
        assert input['description'] == r.json['description']
        assert input['taskType'] == r.json['taskType']
        assert input['startDate'] in r.json['startDate']
        assert input['endDate'] in r.json['endDate']
        assert str(input['predictedCost']) == r.json['predictedCost']
        assert str(input['actualCost']) == r.json['actualCost']

    def test_get(self, api_client, farm_owner, models):
        api_client.login_as(farm_owner)

        # Get the field detail for that field
        production = get_production(farm_owner, models.FIELD_FIELD_ONE)
        task = get_task(production)

        r = api_client.get(url_for('api.task_resource', task_task_id=task.id))
        assert r.status_code == 200
        assert 'id' in r.json
        assert 'title' in r.json
        assert 'description' in r.json
        assert 'taskType' in r.json
        assert 'startDate' in r.json
        assert 'endDate' in r.json
        assert 'predictedCost' in r.json
        assert 'actualCost' in r.json

    def test_list(self, api_client, farm_owner, models):
        api_client.login_as(farm_owner)

        # Get the field detail for that field
        production = get_production(farm_owner, models.FIELD_FIELD_ONE)

        r = api_client.get(url_for('api.tasks_resource', production_id=production.id))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'title' in e
            assert 'description' in e
            assert 'taskType' in e
            assert 'startDate' in e
            assert 'endDate' in e
            assert 'predictedCost' in e
            assert 'actualCost' in e


    def test_patch(self, api_client, farm_owner, models):
        api_client.login_as(farm_owner)

        # Get the field detail for that field
        production = get_production(farm_owner, models.FIELD_FIELD_ONE)
        task = get_task(production)

        new_name = "Nw fancy title"
        r = api_client.patch(url_for('api.task_resource', task_task_id=task.id), data=dict(title=new_name))

        assert r.status_code == 200
        assert r.json['title'] == new_name
        assert 'id' in r.json

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_put(self, api_client, farm_owner, models, input):
        api_client.login_as(farm_owner)

        # Get the field detail for that field
        production = get_production(farm_owner, models.FIELD_FIELD_ONE)
        task = get_task(production)

        data = input.copy()
        data['title'] = "New Field Name"
        r = api_client.put(url_for('api.task_resource', task_task_id=task.id), data=data)

        assert r.status_code == 200
        assert data['title'] == r.json['title']
        assert data['title'] == r.json['title']
        assert data['description'] == r.json['description']
        # FIXME: Task type cannot be changed. Maybe the put and patch method has to be handled differently? Like delete old, create new
        #assert data['taskType'] == r.json['taskType']
        assert data['startDate'] in r.json['startDate']
        assert data['endDate'] in r.json['endDate']
        assert str(data['predictedCost']) == r.json['predictedCost']
        assert str(data['actualCost']) == r.json['actualCost']


    def test_delete(self, api_client, farm_owner, models):
        from backend.production.models import Task
        api_client.login_as(farm_owner)

        # Get the field detail for that field
        production = get_production(farm_owner, models.FIELD_FIELD_ONE)
        task = get_task(production)

        r = api_client.delete(url_for('api.task_resource', task_task_id=task.id))
        assert r.status_code == 204
        assert not Task.get_by(task_id=task.id)


@pytest.mark.parametrize("models", ['Field(FIELD_FIELD_TWO, FIELD_FIELD_THREE)'], indirect=True)
class TestTaskResourceProtected:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_create(self, api_client, farm_user1, farm_user2, models, input):
        # User 1
        api_client.login_as(farm_user1)
        # Get the field detail for that field
        production = get_production(farm_user1, models.FIELD_FIELD_TWO)

        r = api_client.post(url_for('api.tasks_resource', production_id=production.id), data=input)
        assert r.status_code == 201
        api_client.logout()

        # User 2
        api_client.login_as(farm_user2)

        # Try to create object in other user's protected resource
        r = api_client.post(url_for('api.tasks_resource', production_id=production.id), data=input)
        assert r.status_code == 403

    def test_list(self, api_client, farm_user1, farm_user2, models):
        # User 1
        api_client.login_as(farm_user1)
        # Get the field detail for that field
        production1 = get_production(farm_user1, models.FIELD_FIELD_TWO)

        user1_resp = api_client.get(url_for('api.tasks_resource', production_id=production1.id))
        assert user1_resp.status_code == 200
        assert len(user1_resp.json)

        api_client.logout()
        # User 2
        api_client.login_as(farm_user2)
        # Get neccesry data from User 2
        production2 = get_production(farm_user2, models.FIELD_FIELD_THREE)

        user2_resp = api_client.get(url_for('api.tasks_resource', production_id=production2.id))
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

        production = get_production(farm_user1, models.FIELD_FIELD_TWO)
        task = get_task(production)

        r = api_client.get(url_for('api.task_resource', task_task_id=task.id))
        assert r.status_code == 403

    def test_patch(self, api_client, farm_user1, farm_user2, models):
        # User 2
        api_client.login_as(farm_user2)

        # Get neccesry data from User 1
        production = get_production(farm_user1, models.FIELD_FIELD_TWO)
        task = get_task(production)

        new_name = "New Field Name"
        r = api_client.patch(url_for('api.task_resource', task_task_id=task.id), data=dict(title=new_name))
        assert r.status_code == 403

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_put(self, api_client, farm_user1, farm_user2, models, input):
        # User 2
        api_client.login_as(farm_user2)

        # Get neccesry data from User 1
        production = get_production(farm_user1, models.FIELD_FIELD_TWO)
        task = get_task(production)

        data = input.copy()
        data['title'] = "New Field Name"
        r = api_client.put(url_for('api.task_resource', task_task_id=task.id), data=data)
        assert r.status_code == 403

    def test_delete(self, api_client, farm_user1, farm_user2, models):
        # User 2
        api_client.login_as(farm_user2)

        # Get neccesry data from User 1
        production = get_production(farm_user1, models.FIELD_FIELD_TWO)
        task = get_task(production)

        r = api_client.delete(url_for('api.task_resource', task_task_id=task.id))
        assert r.status_code == 403