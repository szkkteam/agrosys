#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.farm.models import Farm

FARM_DATA = {'title': 'test farm 1'}


@pytest.mark.usefixtures('db_session')
class TestFarmModels:
    def test_name_required(self):
        data = FARM_DATA.copy()
        data['title'] = None
        with pytest.raises(IntegrityError):
            Farm.create(**data, commit=True)
