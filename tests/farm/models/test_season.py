#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.farm.models import Season

DATA = {'title': 'corn 2017'}


@pytest.mark.usefixtures('db_session')
class TestSeasonModels:
    def test_name_required(self):
        data = DATA.copy()
        data['title'] = None
        with pytest.raises(IntegrityError):
            Season.create(**data, commit=True)
