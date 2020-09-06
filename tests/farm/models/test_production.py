#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.farm.models import Production

PRODUCTION_DATA = {'title': 'corn 2017'}


@pytest.mark.usefixtures('db_session')
class TestPlanModels:
    def test_name_required(self):
        data = PRODUCTION_DATA.copy()
        data['title'] = None
        with pytest.raises(IntegrityError):
            Production.create(**data, commit=True)
