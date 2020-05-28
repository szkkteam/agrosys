#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
# Pip package imports
import pytest
from sqlalchemy.exc import IntegrityError

# Internal package imports
from backend.farm_management.models import Field

FIELD_DATA = {'name': 'test farm 1',
              'value': 5.0,
              'shape': 'SRID=900913;POLYGON((0 0,1 0,1 1,0 1,0 0))'}


@pytest.mark.usefixtures('db_session')
class TestFieldModels:
    def test_name_required(self):
        data = FIELD_DATA.copy()
        data['name'] = None
        with pytest.raises(IntegrityError):
            Field.create(**data, commit=True)

    def test_shape_required(self):
        data = FIELD_DATA.copy()
        data['shape'] = None
        with pytest.raises(IntegrityError):
            Field.create(**data, commit=True)