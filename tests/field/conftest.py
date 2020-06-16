#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import os
import pytest

"""
@pytest.fixture()
def farm_owner_with_fields(user, farm, model_factory):
    from backend.farm_management.models import SeasonField
    # Add field and field data
    field1 = model_factory.create('Field', 'FIELD_FIELD_1')
    field2 = model_factory.create('Field', 'FIELD_FIELD_2')

    field_data1 = model_factory.create('FieldData', 'FIELD_DATA_FIELD_1')
    field_data2 = model_factory.create('FieldData', 'FIELD_DATA_FIELD_2')

    # Add season
    season = model_factory.create('Season', 'SEASON_SEASON_2017')

    s = SeasonField(season=season, field=field1, field_data=field_data1)
    s.save()

    farm.seasons.append(season)
    user.resources.append(farm)
    yield user



@pytest.fixture()
def farm_collaborator(model_factory):
    from backend.farm_management.models import UserFarm
    user = model_factory.create('User', 'farm_collaborator')
    # Ugly method, but we need to patch here
    table = UserFarm.filter_by(user_id=user.id)
    table.update(dict(is_owner=False))
    return user

@pytest.fixture()
def farm_mix(model_factory):
    from backend.farm_management.models import UserFarm, Farm
    user = model_factory.create('User', 'farm_mix')
    # Ugly method, but we need to patch here
    collab_farm = Farm.all()[-1]
    table = UserFarm.filter_by(farm_id=collab_farm.id)
    table.update(dict(is_owner=False))
    yield user

"""