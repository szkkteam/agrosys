#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.farm_management .models import Season

SEASON_DATA = {'year': 2020}


@pytest.mark.usefixtures('db_session')
class TestFarmModels:
    def test_name_required(self):
        data = SEASON_DATA.copy()
        data['year'] = None
        with pytest.raises(IntegrityError):
            Season.create(**data, commit=True)
