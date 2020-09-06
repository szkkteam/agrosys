#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.reference.models import Region

DATA = {'title': 'Some Region', 'so_code': 'HU10'}


@pytest.mark.usefixtures('db_session')
class TestRegionModels:
    def test_so_code_required(self, products):
        data = DATA.copy()
        data['so_code'] = None
        with pytest.raises(IntegrityError):
            Region.create(**data, commit=True)
