#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import os
import pytest


@pytest.fixture()
def farm(model_factory):
    yield model_factory.create('Farm', 'farm_one')

@pytest.fixture()
def farm_owner(user, farm):
    user.resources.append(farm)
    yield user

@pytest.fixture()
def farm_user1(model_factory):
    user = model_factory.create('User', 'farmer1')
    farm = model_factory.create('Farm', 'FARMER_USER_FARM1')
    user.resources.append(farm)
    yield user

@pytest.fixture()
def farm_user2(model_factory):
    user = model_factory.create('User', 'farmer2')
    farm = model_factory.create('Farm', 'FARMER_USER_FARM2')
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

