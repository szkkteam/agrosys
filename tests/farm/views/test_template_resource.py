#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from flask import url_for
from flask_security import AnonymousUser, current_user

# Internal package imports
from backend.farm.models import Production, Farm, Template

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


class TestTemplateResource:

    def test_create(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        data = get_input_data(NEW_PRODUCTION_DATA)
        farm = Farm.all()[0]

        r = api_client.post(url_for('api.templates_resource', farm_id=farm.id), data=data)
        assert r.status_code == 201
        assert 'id' in r.json
        assert 'title' in r.json
        assert 'tasks' in r.json
        assert len(r.json['tasks'])

    def test_get(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        template = Template.all()[0]

        r = api_client.get(url_for('api.template_resource', id=template.id))
        assert r.status_code == 200
        assert 'id' in r.json
        assert 'title' in r.json
        assert 'tasks' in r.json
        assert len(r.json['tasks'])

    def test_list(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        farm = Farm.all()[0]
        r = api_client.get(url_for('api.templates_resource', farm_id=farm.id))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'title' in e
            assert 'tasks' in e
            assert len(e['tasks'])

    @pytest.mark.parametrize("models", ['Template(TEMPLATE_3)'], indirect=True)
    def test_list_default(self, api_client, farm_owner, models):
        api_client.login_as(farm_owner)
        print("Templates: ", Template.all())
        r = api_client.get(url_for('api.farm_template_default_resource'))
        assert r.status_code == 200
        assert len(r.json)
        for e in r.json:
            assert 'id' in e
            assert 'title' in e
            assert 'tasks' in e

    def test_patch(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        template = Template.all()[0]
        new_name = "New template name"
        r = api_client.patch(url_for('api.template_resource', id=template.id), data=dict(title=new_name))

        assert r.status_code == 200
        assert r.json['title'] == new_name
        assert 'id' in r.json


    def test_put(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        template = Template.all()[0]
        data = get_input_data(NEW_PRODUCTION_DATA)
        data['title'] = "New template name"
        r = api_client.put(url_for('api.template_resource', id=template.id), data=data)

        assert r.status_code == 200
        assert r.json['title'] == data['title']
        assert 'id' in r.json

    
    def test_put_modify_task(self, api_client, farm_owner):
        from backend.farm.models import Task
        api_client.login_as(farm_owner)

        template = Template.all()[0]
        old_tasks = template.tasks
        data = get_input_data(NEW_PRODUCTION_DATA)
        data['title'] = "New template name"
        data['tasks'][0]['title'] = 'Updated task name'
        data['tasks'][1]['title'] = 'Updated task name'
        r = api_client.put(url_for('api.template_resource', id=template.id), data=data)

        assert r.status_code == 200
        assert r.json['title'] == data['title']
        assert 'id' in r.json
        for task in r.json['tasks']:
            assert 'Updated task name' == task['title']
            for ot in old_tasks:                
                assert ot.id != task['id']

    @pytest.mark.skip(reason="Database cascades not be reworked, because related objects are not deleted.")
    def test_delete(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        template = Template.all()[0]
        r = api_client.delete(url_for('api.template_resource', id=template.id))

        assert r.status_code == 204
        assert not Template.get(template.id)

class TestFarmTemplateResource:

    @pytest.mark.parametrize("models", ['Template(TEMPLATE_3)'], indirect=True)
    def test_put(self, api_client, farm_owner, models):
        api_client.login_as(farm_owner)

        farm = Farm.all()[0]
        template = models.TEMPLATE_3

        len_templates = len(farm.templates)
        r = api_client.put(url_for('api.farm_template_resource', farm_id=farm.id, template_id=template.id))
        assert r.status_code == 200
        assert 'id' in r.json
        assert (len_templates + 1) == len(Farm.get(farm.id).templates)

    def test_delete(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        farm = Farm.all()[0]
        template = Template.all()[0]

        len_templates = len(farm.templates)
        r = api_client.delete(url_for('api.farm_template_resource', farm_id=farm.id, template_id=template.id))

        assert r.status_code == 204
        assert (len_templates - 1) == len(Farm.get(farm.id).templates)

