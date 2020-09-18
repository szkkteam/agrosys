#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from flask import url_for
from flask_security import AnonymousUser, current_user

# Internal package imports
from backend.farm.models import Production, ReferenceParcel, ReferenceParcelProduction

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
    'tasks': VALID_INPUT_DATA,
}


def get_input_data(input):
    data = input.copy()
    return data

class TestProductionResource:

    def test_create(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        data = get_input_data(NEW_PRODUCTION_DATA)
        parcel = ReferenceParcel.all()[-1]

        r = api_client.post(url_for('api.productions_resource', parcel_id=parcel.id), data=data)
        assert r.status_code == 201
        assert 'id' in r.json
        assert 'title' in r.json
        assert 'tasks' in r.json
        assert len(r.json['tasks'])

    def test_get(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        production = Production.all()[0]

        r = api_client.get(url_for('api.production_resource', id=production.id))
        assert r.status_code == 200
        assert 'id' in r.json
        assert 'title' in r.json
        assert 'tasks' in r.json
        assert len(r.json['tasks'])

    def test_list(self, api_client, farm_owner):
        api_client.login_as(farm_owner)


        parcel = ReferenceParcel.join(ReferenceParcelProduction).all()[0]

        r = api_client.get(url_for('api.productions_resource', parcel_id=parcel.id))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'title' in e
            assert 'tasks' in e
            assert len(e['tasks'])

    def test_patch(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        production = Production.all()[0]
        new_name = "New production name"
        r = api_client.patch(url_for('api.production_resource', id=production.id), data=dict(title=new_name))

        assert r.status_code == 200
        assert r.json['title'] == new_name
        assert 'id' in r.json

    def test_put(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        production = Production.all()[0]
        data = get_input_data(NEW_PRODUCTION_DATA)
        data['title'] = "New template name"
        r = api_client.put(url_for('api.production_resource', id=production.id), data=data)

        assert r.status_code == 200
        assert r.json['title'] == data['title']
        assert 'id' in r.json

    @pytest.mark.skip(reason="Database cascades not be reworked, because related objects are not deleted.")
    def test_delete(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        production = Production.all()[0]
        r = api_client.delete(url_for('api.production_resource', id=production.id))

        assert r.status_code == 204
        assert not Production.get(production.id)

class TestReferenceParcelProductionResource:

    @pytest.mark.parametrize("models", ['Production(PRODUCTION_AS_TMP_TASKS_4)'], indirect=True)
    def test_put(self, api_client, farm_owner, models):
        api_client.login_as(farm_owner)

        parcel = ReferenceParcel.all()[0]
        production = models.PRODUCTION_AS_TMP_TASKS_4

        len_productions = len(parcel.productions)
        r = api_client.put(url_for('api.reference_parcel_production_resource', parcel_id=parcel.id, production_id=production.id))
        assert r.status_code == 200
        print("result: ", r.json)
        assert 'id' in r.json
        assert (len_productions + 1) == len(ReferenceParcel.get(parcel.id).productions)

    def test_delete(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        parcel = ReferenceParcel.join(ReferenceParcelProduction).all()[0]
        production = parcel.productions[0]

        len_productions = len(parcel.productions)
        r = api_client.delete(url_for('api.reference_parcel_production_resource', parcel_id=parcel.id, production_id=production.id))

        assert r.status_code == 204
        assert (len_productions - 1) == len(ReferenceParcel.get(parcel.id).productions)

