#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from flask import url_for
from flask_security import AnonymousUser, current_user

# Internal package imports

NEW_SEASON_DATA = dict(
    title='Season 2019',
    startDate = '2019-1-1',
    endDate = '2019-12-31'
)

@pytest.mark.usefixtures('user')
class TestSeasonResource:

    def test_create_season(self, api_client, farm_owner):
        from backend.farm_management.models import Farm
        api_client.login_as(farm_owner)

        farm = Farm.all()[0]
        r = api_client.post(url_for('api.seasons_resource', farm_id=farm.id), data=NEW_SEASON_DATA)
        print("Response: ", r.json)
        assert r.status_code == 201
        assert 'name' in r.json
        assert NEW_FARM_DATA['name'] in r.json['name']