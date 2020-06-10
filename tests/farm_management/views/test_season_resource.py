#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from flask import url_for
from flask_security import AnonymousUser, current_user

# Internal package imports
from backend.farm_management.models import Farm

NEW_SEASON_DATA = dict(
    title='Season 2019',
    startDate='2019-1-1',
    endDate='2019-12-31'
)

@pytest.mark.usefixtures('user')
class TestSeasonResource:

    def test_create_season(self, api_client, farm_owner):
        api_client.login_as(farm_owner)

        farm = Farm.all()[0]
        r = api_client.post(url_for('api.seasons_resource', farm_id=farm.id), data=NEW_SEASON_DATA)
        assert r.status_code == 201
        assert 'title' in r.json and r.json['title'] == 'Season 2019'
        assert 'startDate' in r.json
        assert 'endDate' in r.json

    def test_create_season_missing_title(self, api_client, farm_owner):
        api_client.login_as(farm_owner)
        data = NEW_SEASON_DATA.copy()
        data['title'] = None
        farm = Farm.all()[0]
        r = api_client.post(url_for('api.seasons_resource', farm_id=farm.id), data=data)
        assert r.status_code == 400
        assert 'title' in r.errors

    def test_create_season_copy(self, api_client, farm_owner_with_fields):
        from backend.farm_management.models import Season
        api_client.login_as(farm_owner_with_fields)

        season = Season.all()[0]
        farm = Farm.all()[0]

        NEW_SEASON_DATA['copyFields'] = True
        NEW_SEASON_DATA['copyFromSeasonId'] = season.id
        r = api_client.post(url_for('api.seasons_resource', farm_id=farm.id), data=NEW_SEASON_DATA)
        assert r.status_code == 201
        assert 'id' in r.json
        assert 'title' in r.json and r.json['title'] == 'Season 2019'
        assert 'startDate' in r.json
        assert 'endDate' in r.json

        new_season = Season.get(r.json['id'])
        assert len(new_season.fields) == len(season.fields)
        for field1, field2 in zip(new_season.fields, season.fields):
            assert field1.name == field2.name
            #assert field1.field_data_id != field2.field_data_id