#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import datetime
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.farm_management .models import Season

SEASON_DATA = {'title': "Season 2020", 'start_date': datetime.date(year=2019, month=1, day=1), 'end_date': datetime.date(year=2019, month=12, day=31)}


@pytest.mark.usefixtures('db_session')
class TestFarmModels:
    def test_title_required(self):
        data = SEASON_DATA.copy()
        data['title'] = None
        with pytest.raises(IntegrityError):
            Season.create(**data, commit=True)

    def test_start_date_required(self):
        data = SEASON_DATA.copy()
        data['start_date'] = None
        with pytest.raises(IntegrityError):
            Season.create(**data, commit=True)

    def test_end_date_required(self):
        data = SEASON_DATA.copy()
        data['end_date'] = None
        with pytest.raises(IntegrityError):
            Season.create(**data, commit=True)
